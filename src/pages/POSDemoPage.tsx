import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Plus,
  Minus,
  Trash2,
  User,
  ScanLine,
  ShoppingCart,
  Zap,
  Box,
  Boxes,
  ReceiptText,
  BarChart3,
  Menu,
  CloudOff,
  Percent,
  BadgeDollarSign,
  ArrowLeft,
  Check,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  seedDemoIfEmpty,
  getDemoProducts,
  getDemoOrders,
  getDemoOrderItems,
  getLowStockProducts,
  setDemoStock,
  archiveDemoProduct,
  addDemoOrder,
  addDemoOrderItems,
  decrementStockForSale,
  makeReceiptId,
  makeReceiptNumber,
  resetDemoData,
  type DemoProduct,
  type DemoOrder,
  type DemoOrderItem,
} from "@/demo/store";

// ---- TYPES ----
type DiscountType = "percentage" | "fixed";
type POSMode = "retail" | "service";
type DemoView = "terminal" | "inventory" | "orders" | "reports";

function isDemoView(value: string | null): value is DemoView {
  return value === "terminal" || value === "inventory" || value === "orders" || value === "reports";
}

interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
  type: "good" | "service";
  stock_quantity: number;
  lowStockThreshold: number;
  sku: string;
  barcode: string;
  shortcutCode: string;
  image?: string;
}

interface CartItem {
  lineId: string;
  product: Product;
  quantity: number;
  discount: number;
  discountType: DiscountType;
  customPrice?: number;
}

interface ActiveDiscount {
  id: string;
  name: string;
  type: DiscountType;
  value: number;
}

// Convert DemoProduct to local Product format
function toProduct(p: DemoProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    cost: p.cost,
    category: p.category,
    type: p.type,
    stock_quantity: p.stock_quantity,
    lowStockThreshold: p.low_stock_threshold,
    sku: p.sku,
    barcode: p.barcode,
    shortcutCode: p.shortcut_code,
    image: p.image_url,
  };
}

// ---- HELPERS ----
function makeLineId() {
  return `line-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

// ---- MAIN COMPONENT ----
export const POSDemoPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const view: DemoView = isDemoView(viewParam) ? viewParam : "terminal";
  const setView = (nextView: DemoView) => {
    const next = new URLSearchParams(searchParams);
    next.set("view", nextView);
    setSearchParams(next, { replace: true });
  };

  const [showNav, setShowNav] = useState(false);
  const [demoVersion, setDemoVersion] = useState(0);

  // Products from demo store
  const [products, setProducts] = useState<Product[]>([]);
  
  // Initialize demo data on mount
  useEffect(() => {
    seedDemoIfEmpty();
    const demoProducts = getDemoProducts()
      .filter(p => !p.is_archived)
      .map(toProduct);
    setProducts(demoProducts);
    setDemoVersion((v) => v + 1);
  }, []);
  
  // Refresh products after a sale
  const refreshProducts = useCallback(() => {
    const demoProducts = getDemoProducts()
      .filter(p => !p.is_archived)
      .map(toProduct);
    setProducts(demoProducts);
  }, []);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [activeDiscount, setActiveDiscount] = useState<ActiveDiscount | null>(null);
  const [posMode, setPosMode] = useState<POSMode>("retail");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // UI state
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [showItemDiscountDialog, setShowItemDiscountDialog] = useState(false);
  const [discountLineId, setDiscountLineId] = useState<string | null>(null);
  const [discountMode, setDiscountMode] = useState<"amount" | "percent">("amount");
  const [discountValueRaw, setDiscountValueRaw] = useState("");
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [scanInput, setScanInput] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [saleComplete, setSaleComplete] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Demo user
  const currentUser = { name: "Demo Staff" };
  
  // Categories derived from products
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return cats.map(c => ({ id: c, name: c }));
  }, [products]);
  
  // Filtered products
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    return products.filter(product => {
      const matchesSearch = !query ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.barcode.includes(searchQuery.trim()) ||
        product.shortcutCode.toLowerCase() === query;
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesMode = posMode === "retail" ? product.type !== "service" : product.type === "service";
      
      return matchesSearch && matchesCategory && matchesMode;
    });
  }, [products, searchQuery, selectedCategory, posMode]);
  
  // Cart operations
  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        lineId: makeLineId(),
        product,
        quantity: 1,
        discount: 0,
        discountType: "percentage" as DiscountType,
      }];
    });
  }, []);
  
  const removeFromCart = useCallback((lineId: string) => {
    setCart(prev => prev.filter(item => item.lineId !== lineId));
  }, []);
  
  const updateCartItemQuantity = useCallback((lineId: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(item => item.lineId !== lineId));
      return;
    }
    setCart(prev => prev.map(item =>
      item.lineId === lineId ? { ...item, quantity: qty } : item
    ));
  }, []);
  
  const updateCartItemDiscount = useCallback((lineId: string, value: number, type: DiscountType) => {
    setCart(prev => prev.map(item =>
      item.lineId === lineId ? { ...item, discount: value, discountType: type } : item
    ));
  }, []);
  
  const clearCart = useCallback(() => {
    setCart([]);
    setActiveDiscount(null);
    setCustomerName("");
  }, []);
  
  // Totals
  const cartItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = item.customPrice ?? item.product.price;
      const itemTotal = price * item.quantity;
      const itemDiscount = item.discountType === "percentage"
        ? itemTotal * (item.discount / 100)
        : item.discount;
      return sum + itemTotal - itemDiscount;
    }, 0);
  }, [cart]);
  
  const globalDiscount = useMemo(() => {
    if (!activeDiscount) return 0;
    return activeDiscount.type === "percentage"
      ? subtotal * (activeDiscount.value / 100)
      : activeDiscount.value;
  }, [activeDiscount, subtotal]);
  
  const total = round2(subtotal - globalDiscount);
  
  // Quick entry (barcode/sku/shortcut)
  const handleQuickEntry = useCallback((code: string) => {
    const trimmed = code.trim();
    if (!trimmed) return false;
    
    const product = products.find(p =>
      p.barcode === trimmed ||
      p.sku === trimmed ||
      p.shortcutCode.toLowerCase() === trimmed.toLowerCase()
    );
    
    if (!product) return false;
    
    if (product.type === "good" && product.stock_quantity <= 0) {
      toast.error("Out of stock");
      return true; // Found but out of stock
    }
    
    addToCart(product);
    setSearchQuery("");
    toast.success(`${product.name} added`);
    return true;
  }, [products, addToCart]);
  
  // Mode switch
  const setPosModeSafe = useCallback((next: POSMode) => {
    if (cart.length > 0) return;
    setPosMode(next);
    setSelectedCategory(null);
  }, [cart.length]);
  
  // Global discount
  const handleApplyDiscount = useCallback(() => {
    if (discountCode.trim().toUpperCase() === "VIP10") {
      setActiveDiscount({ id: "VIP10", name: "VIP", type: "percentage", value: 10 });
      setShowDiscountDialog(false);
      setDiscountCode("");
    }
  }, [discountCode]);
  
  // Item discount
  const openItemDiscount = useCallback((lineId: string) => {
    const item = cart.find(x => x.lineId === lineId);
    if (!item) return;
    
    setDiscountLineId(lineId);
    setDiscountMode(item.discountType === "percentage" ? "percent" : "amount");
    setDiscountValueRaw(String(item.discount || 0));
    setShowItemDiscountDialog(true);
  }, [cart]);
  
  const applyItemDiscount = useCallback(() => {
    if (!discountLineId) return;
    
    const raw = Number(discountValueRaw.trim());
    if (!Number.isFinite(raw) || raw < 0) return;
    
    const item = cart.find(x => x.lineId === discountLineId);
    if (!item) return;
    
    const lineTotal = item.product.price * item.quantity;
    const type: DiscountType = discountMode === "percent" ? "percentage" : "fixed";
    const value = type === "fixed" 
      ? round2(clamp(raw, 0, lineTotal))
      : round2(clamp(raw, 0, 100));
    
    updateCartItemDiscount(discountLineId, value, type);
    setShowItemDiscountDialog(false);
  }, [discountLineId, discountMode, discountValueRaw, cart, updateCartItemDiscount]);
  
  // Payment - creates order in demo store
  const handlePaymentComplete = useCallback((method: string) => {
    if (cart.length === 0) return;
    
    const orderId = `order-${Date.now()}`;
    const receiptId = makeReceiptId();
    const receiptNumber = makeReceiptNumber();
    const now = new Date().toISOString();
    
    // Create order
    addDemoOrder({
      id: orderId,
      created_at: now,
      total_amount: total,
      payment_method: method,
      customer_name: customerName || null,
      cashier_name: currentUser.name,
      receipt_id: receiptId,
      receipt_number: receiptNumber,
    });
    
    // Create order items
    const orderItems = cart.map(item => ({
      id: `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      order_id: orderId,
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      price_at_sale: item.customPrice ?? item.product.price,
      cost_at_sale: item.product.cost,
      created_at: now,
      category: item.product.category,
    }));
    addDemoOrderItems(orderItems);
    
    // Decrement stock for goods
    const stockUpdates = cart
      .filter(item => item.product.type === "good")
      .map(item => ({ product_id: item.product.id, quantity: item.quantity }));
    decrementStockForSale(stockUpdates);

    // Bump version so other demo screens can refresh instantly.
    setDemoVersion((v) => v + 1);
    
    // Show success
    setSaleComplete(true);
    setShowPaymentDialog(false);
    toast.success(`Sale completed: ${receiptNumber}`);
    
    setTimeout(() => {
      clearCart();
      refreshProducts(); // Refresh to show updated stock
      setSaleComplete(false);
    }, 2000);
  }, [cart, total, customerName, currentUser.name, clearCart, refreshProducts]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDiscountDialog(false);
        setShowItemDiscountDialog(false);
        setShowScanDialog(false);
        setShowPaymentDialog(false);
      }
      
      if (document.activeElement === searchInputRef.current && e.key === "Enter") {
        if (!searchQuery.trim()) return;
        e.preventDefault();
        const found = handleQuickEntry(searchQuery);
        if (!found && filteredProducts.length > 0) {
          const first = filteredProducts[0];
          if (first.type === "good" && first.stock_quantity <= 0) return;
          addToCart(first);
          setSearchQuery("");
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery, handleQuickEntry, filteredProducts, addToCart]);

  useEffect(() => {
    if (view === "terminal") return;
    setShowMobileCart(false);
    setShowDiscountDialog(false);
    setShowItemDiscountDialog(false);
    setShowScanDialog(false);
    setShowPaymentDialog(false);
  }, [view]);

  // Reset demo handler
  const handleResetDemo = useCallback(() => {
    resetDemoData();
    refreshProducts();
    clearCart();
    setDemoVersion((v) => v + 1);
    toast.success("Demo data reset");
  }, [refreshProducts, clearCart]);

  const orders = useMemo(() => {
    const raw = getDemoOrders();
    return [...raw].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [demoVersion]);

  const orderItems = useMemo(() => getDemoOrderItems(), [demoVersion]);
  const lowStockProducts = useMemo(() => getLowStockProducts(), [demoVersion]);

  const demoNavItems: Array<{ id: DemoView; label: string; icon: typeof ShoppingCart }> = [
    { id: "terminal", label: "Terminal", icon: ShoppingCart },
    { id: "inventory", label: "Inventory", icon: Boxes },
    { id: "orders", label: "Orders", icon: ReceiptText },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/portfolio" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Work
            </Link>
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full font-medium">Demo Mode</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNav(true)}
              className="h-8 text-xs gap-1.5 lg:hidden"
            >
              <Menu className="w-3.5 h-3.5" />
              Screens
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetDemo}
              className="h-8 text-xs gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo
            </Button>
            <span className="text-xs text-muted-foreground hidden sm:inline">{new Date().toLocaleString()}</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CloudOff className="w-3.5 h-3.5" /> Offline
            </span>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar (Desktop) */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <p className="text-sm font-semibold">Demo screens</p>
            <p className="text-xs text-muted-foreground">Navigate the app</p>
          </div>
          <nav className="p-2 space-y-1">
            {demoNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = view === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setView(item.id)}
                  className={cn(
                    "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto p-4 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Low stock</span>
              <span className={lowStockProducts.length > 0 ? "text-destructive font-semibold" : ""}>
                {lowStockProducts.length}
              </span>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          {view === "terminal" ? (
            <>
              <div className="flex flex-col lg:flex-row h-full">
                {/* LEFT: Products */}
                <div className="flex-1 flex flex-col p-4 lg:p-6 overflow-hidden">
                  {/* Controls */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    {/* Mode Toggle */}
                    <div className="flex bg-muted rounded-lg p-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPosModeSafe("retail")}
                        className={cn(
                          "h-8 text-xs rounded-md",
                          posMode === "retail" && "bg-background shadow-sm",
                        )}
                      >
                        <Box className="w-3.5 h-3.5 mr-1.5" /> Retail
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPosModeSafe("service")}
                        className={cn(
                          "h-8 text-xs rounded-md",
                          posMode === "service" && "bg-background shadow-sm",
                        )}
                      >
                        <Zap className="w-3.5 h-3.5 mr-1.5" /> Service
                      </Button>
                    </div>

                    {/* Search */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        ref={searchInputRef}
                        placeholder="Search products, scan barcode..."
                        className="pl-9 h-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setShowDiscountDialog(true)}>
                        <Percent className="w-4 h-4 mr-1.5" /> Discount
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => setShowScanDialog(true)}>
                        <ScanLine className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
                    <Button
                      variant={!selectedCategory ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className="shrink-0 h-8 text-xs rounded-full"
                    >
                      All Items
                    </Button>
                    {categories
                      .filter((c) => (posMode === "service" ? c.id === "Services" : c.id !== "Services"))
                      .map((c) => (
                        <Button
                          key={c.id}
                          variant={selectedCategory === c.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(selectedCategory === c.id ? null : c.id)}
                          className="shrink-0 h-8 text-xs rounded-full"
                        >
                          {c.name}
                        </Button>
                      ))}
                  </div>

                  {/* Products Grid */}
                  <div className="flex-1 overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                        <Box className="w-12 h-12 mb-3 opacity-30" />
                        <p className="text-sm">No products found</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {filteredProducts.map((product, i) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={() => addToCart(product)}
                            isSelected={i === selectedProductIndex}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT: Cart (Desktop) */}
                <div className="hidden lg:flex flex-col w-[380px] border-l border-border bg-card">
                  <CartPanel
                    cart={cart}
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    activeDiscount={activeDiscount}
                    setActiveDiscount={setActiveDiscount}
                    cartItemCount={cartItemCount}
                    subtotal={subtotal}
                    globalDiscount={globalDiscount}
                    total={total}
                    currentUser={currentUser}
                    onClearCart={clearCart}
                    onUpdateQty={updateCartItemQuantity}
                    onRemove={removeFromCart}
                    onDiscount={openItemDiscount}
                    onPayment={() => setShowPaymentDialog(true)}
                  />
                </div>
              </div>

              {/* Mobile Cart Button */}
              <div className="lg:hidden fixed bottom-4 right-4 z-40">
                <Button onClick={() => setShowMobileCart(true)} className="rounded-full shadow-xl h-14 px-5 gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Cart ({cartItemCount})
                  {total > 0 && <span className="ml-1">${total.toFixed(2)}</span>}
                </Button>
              </div>

              {/* Mobile Cart Dialog */}
              <Dialog open={showMobileCart} onOpenChange={setShowMobileCart}>
                <DialogContent className="h-[90vh] max-w-lg flex flex-col p-0">
                  <CartPanel
                    cart={cart}
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    activeDiscount={activeDiscount}
                    setActiveDiscount={setActiveDiscount}
                    cartItemCount={cartItemCount}
                    subtotal={subtotal}
                    globalDiscount={globalDiscount}
                    total={total}
                    currentUser={currentUser}
                    onClearCart={clearCart}
                    onUpdateQty={updateCartItemQuantity}
                    onRemove={removeFromCart}
                    onDiscount={openItemDiscount}
                    onPayment={() => {
                      setShowMobileCart(false);
                      setShowPaymentDialog(true);
                    }}
                    isMobile
                  />
                </DialogContent>
              </Dialog>

              {/* Scan Dialog */}
              <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Enter Code</DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="Barcode, SKU, or shortcut..."
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const found = handleQuickEntry(scanInput);
                        if (found) {
                          setScanInput("");
                          setShowScanDialog(false);
                        }
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      const found = handleQuickEntry(scanInput);
                      if (found) {
                        setScanInput("");
                        setShowScanDialog(false);
                      }
                    }}
                  >
                    Add Item
                  </Button>
                </DialogContent>
              </Dialog>

              {/* Global Discount Dialog */}
              <Dialog open={showDiscountDialog} onOpenChange={setShowDiscountDialog}>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Enter Discount Code</DialogTitle>
                  </DialogHeader>
                  <Input
                    placeholder="Code... (try VIP10)"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    autoFocus
                  />
                  <Button onClick={handleApplyDiscount}>Apply</Button>
                </DialogContent>
              </Dialog>

              {/* Item Discount Dialog */}
              <Dialog open={showItemDiscountDialog} onOpenChange={setShowItemDiscountDialog}>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Item Discount</DialogTitle>
                  </DialogHeader>
                  <div className="flex gap-2 mb-3">
                    <Button
                      variant={discountMode === "amount" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDiscountMode("amount")}
                    >
                      <BadgeDollarSign className="w-4 h-4 mr-1" /> Amount ($)
                    </Button>
                    <Button
                      variant={discountMode === "percent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDiscountMode("percent")}
                    >
                      <Percent className="w-4 h-4 mr-1" /> Percent (%)
                    </Button>
                  </div>
                  <Input
                    placeholder={discountMode === "amount" ? "e.g. 5" : "e.g. 10"}
                    value={discountValueRaw}
                    onChange={(e) => setDiscountValueRaw(e.target.value)}
                    type="number"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button onClick={applyItemDiscount} className="flex-1">
                      Apply
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (discountLineId) updateCartItemDiscount(discountLineId, 0, "fixed");
                        setShowItemDiscountDialog(false);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Payment Dialog */}
              <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Payment</DialogTitle>
                  </DialogHeader>
                  <div className="text-center py-4">
                    <p className="text-3xl font-bold">${total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mt-1">{cartItemCount} items</p>
                  </div>
                  <div className="grid gap-2">
                    <Button size="lg" onClick={() => handlePaymentComplete("Cash")}>
                      Pay with Cash
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => handlePaymentComplete("Card")}>
                      Pay with Card
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => handlePaymentComplete("Mobile")}>
                      Pay with Mobile
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Sale Complete Toast */}
              <AnimatePresence>
                {saleComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                  >
                    <div className="bg-card p-8 rounded-2xl shadow-2xl text-center">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h2 className="text-2xl font-bold">Sale Completed</h2>
                      <p className="text-muted-foreground mt-1">Thank you!</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : view === "inventory" ? (
            <InventoryView
              products={products}
              onRefreshProducts={refreshProducts}
              onBumpVersion={() => setDemoVersion((v) => v + 1)}
            />
          ) : view === "orders" ? (
            <OrdersView orders={orders} items={orderItems} />
          ) : (
            <ReportsView
              orders={orders}
              items={orderItems}
              lowStockCount={lowStockProducts.length}
            />
          )}
        </main>
      </div>

      {/* Mobile navigation */}
      <Dialog open={showNav} onOpenChange={setShowNav}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Demo screens</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2">
            {demoNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = view === item.id;

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => {
                    setView(item.id);
                    setShowNav(false);
                  }}
                  className="justify-start gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ---- DEMO SCREENS ----

const InventoryView = ({
  products,
  onRefreshProducts,
  onBumpVersion,
}: {
  products: Product[];
  onRefreshProducts: () => void;
  onBumpVersion: () => void;
}) => {
  const [query, setQuery] = useState("");
  const [draftStock, setDraftStock] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.barcode.includes(query.trim())
      );
    });
  }, [products, query]);

  const onSaveStock = (productId: string, current: number) => {
    const raw = draftStock[productId];
    const next = raw === undefined ? current : Number.parseInt(raw, 10);

    if (!Number.isFinite(next) || next < 0) {
      toast.error("Invalid stock value.");
      return;
    }

    setDemoStock(productId, next);
    onRefreshProducts();
    onBumpVersion();
    toast.success("Stock updated.");
  };

  const onArchive = (productId: string) => {
    archiveDemoProduct(productId);
    onRefreshProducts();
    onBumpVersion();
    toast.success("Product archived.");
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-tight">Inventory</p>
          <h2 className="text-2xl font-bold tracking-tight mt-1">Products and stock</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Adjust stock levels and archive products. Changes are stored locally for the demo.
          </p>
        </div>
        <div className="w-full sm:w-[320px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, SKU, barcode..."
              className="pl-9 h-10"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
          <Boxes className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No products match your search.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-[1.2fr_0.9fr_0.6fr_0.9fr] gap-3 px-4 py-3 border-b border-border text-xs uppercase tracking-tight text-muted-foreground">
            <span>Product</span>
            <span className="hidden md:block">SKU</span>
            <span>Stock</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-border">
            {filtered.map((p) => {
              const isGood = p.type === "good";
              const isOut = isGood && p.stock_quantity <= 0;
              const isLow = isGood && !isOut && p.stock_quantity <= p.lowStockThreshold;
              const draft = draftStock[p.id] ?? String(p.stock_quantity);

              return (
                <div key={p.id} className="grid grid-cols-[1.2fr_0.9fr_0.6fr_0.9fr] gap-3 px-4 py-3 items-center">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {p.category} · {p.type === "service" ? "Service" : "Good"}
                    </p>
                  </div>
                  <p className="hidden md:block text-xs text-muted-foreground truncate">{p.sku}</p>

                  <div>
                    {isGood ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={draft}
                          onChange={(e) => setDraftStock((prev) => ({ ...prev, [p.id]: e.target.value }))}
                          type="number"
                          min={0}
                          className={cn(
                            "h-9 w-[96px]",
                            (isLow || isOut) && "border-destructive/40 focus-visible:ring-destructive",
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs",
                            isOut && "text-destructive font-semibold",
                            isLow && "text-destructive",
                            !isLow && !isOut && "text-muted-foreground",
                          )}
                        >
                          {isOut ? "Out" : isLow ? "Low" : "OK"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">n/a</span>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9"
                      onClick={() => onSaveStock(p.id, p.stock_quantity)}
                      disabled={!isGood}
                    >
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" className="h-9 text-destructive" onClick={() => onArchive(p.id)}>
                      Archive
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const OrdersView = ({ orders, items }: { orders: DemoOrder[]; items: DemoOrderItem[] }) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(() => orders[0]?.id ?? null);

  useEffect(() => {
    if (orders.length === 0) {
      if (selectedOrderId !== null) {
        setSelectedOrderId(null);
      }
      return;
    }

    const selectionExists = selectedOrderId ? orders.some((o) => o.id === selectedOrderId) : false;
    if (!selectionExists) {
      setSelectedOrderId(orders[0].id);
    }
  }, [orders, selectedOrderId]);

  const selectedOrder = useMemo(
    () => (selectedOrderId ? orders.find((o) => o.id === selectedOrderId) ?? null : null),
    [orders, selectedOrderId],
  );

  const selectedItems = useMemo(() => {
    if (!selectedOrder) return [];
    return items.filter((item) => item.order_id === selectedOrder.id);
  }, [items, selectedOrder]);

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-tight">Orders</p>
        <h2 className="text-2xl font-bold tracking-tight mt-1">Order history</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Orders are stored locally in this demo. New sales from Terminal appear here immediately.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
          <ReceiptText className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No orders yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[340px_1fr] gap-6">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border text-xs uppercase tracking-tight text-muted-foreground">
              Recent
            </div>
            <div className="max-h-[60vh] lg:max-h-[calc(100vh-12rem)] overflow-y-auto">
              {orders.map((o) => {
                const active = o.id === selectedOrderId;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setSelectedOrderId(o.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 border-b border-border hover:bg-muted/40 transition-colors",
                      active && "bg-muted/60",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{o.receipt_number}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {new Date(o.created_at).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">${Number(o.total_amount).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {o.payment_method} · {o.cashier_name}
                      {o.customer_name ? ` · ${o.customer_name}` : ""}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            {!selectedOrder ? (
              <p className="text-sm text-muted-foreground">Select an order to view details.</p>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-tight text-muted-foreground">Receipt</p>
                    <h3 className="text-xl font-bold tracking-tight mt-1">{selectedOrder.receipt_number}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {new Date(selectedOrder.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedOrder.payment_method} · Cashier: {selectedOrder.cashier_name}
                      {selectedOrder.customer_name ? ` · Customer: ${selectedOrder.customer_name}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-tight text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold mt-1">${Number(selectedOrder.total_amount).toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-border overflow-hidden">
                  <div className="grid grid-cols-[1fr_80px_120px] gap-3 px-4 py-2 text-xs uppercase tracking-tight text-muted-foreground border-b border-border">
                    <span>Item</span>
                    <span className="text-right">Qty</span>
                    <span className="text-right">Line</span>
                  </div>
                  <div className="divide-y divide-border">
                    {selectedItems.length === 0 ? (
                      <p className="px-4 py-4 text-sm text-muted-foreground">No items recorded.</p>
                    ) : (
                      selectedItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-[1fr_80px_120px] gap-3 px-4 py-3">
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{item.product_name}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.category || "Uncategorized"}</p>
                          </div>
                          <p className="text-sm text-right">{item.quantity}</p>
                          <p className="text-sm text-right font-medium">
                            ${(item.price_at_sale * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ReportsView = ({
  orders,
  items,
  lowStockCount,
}: {
  orders: DemoOrder[];
  items: DemoOrderItem[];
  lowStockCount: number;
}) => {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const todayOrders = useMemo(() => {
    return orders.filter((order) => {
      const d = new Date(order.created_at);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });
  }, [orders, today]);

  const todayRevenue = useMemo(
    () => todayOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0),
    [todayOrders],
  );

  const avgTicket = todayOrders.length > 0 ? todayRevenue / todayOrders.length : 0;

  const topCategories = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - 7);
    const byCategory = new Map<string, number>();

    items.forEach((item) => {
      const created = new Date(item.created_at);
      if (created < start) return;
      const category = item.category || "Uncategorized";
      const revenue = Number(item.price_at_sale || 0) * Number(item.quantity || 0);
      byCategory.set(category, (byCategory.get(category) || 0) + revenue);
    });

    return Array.from(byCategory.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
  }, [items]);

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-tight">Reports</p>
        <h2 className="text-2xl font-bold tracking-tight mt-1">Quick signals</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Simple metrics computed from the demo data. This is not a placeholder screen.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today revenue", value: `$${todayRevenue.toFixed(2)}` },
          { label: "Today orders", value: String(todayOrders.length) },
          { label: "Avg ticket", value: `$${avgTicket.toFixed(2)}` },
          { label: "Low stock items", value: String(lowStockCount) },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-tight text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl font-bold tracking-tight mt-2">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <p className="text-sm font-semibold">Top categories (last 7 days)</p>
          <p className="text-xs text-muted-foreground mt-1">Revenue by category from recorded order items.</p>
        </div>
        {topCategories.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No order items available for reporting yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {topCategories.map(([category, revenue]) => (
              <div key={category} className="flex items-center justify-between px-4 py-3">
                <p className="text-sm font-medium">{category}</p>
                <p className="text-sm font-semibold">${revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ---- SUB COMPONENTS ----

const ProductCard = ({
  product,
  onAdd,
  isSelected,
}: {
  product: Product;
  onAdd: () => void;
  isSelected: boolean;
}) => {
  const isOutOfStock = product.type === "good" && product.stock_quantity <= 0;
  const isLowStock = product.type === "good" && !isOutOfStock && product.stock_quantity <= product.lowStockThreshold;

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => !isOutOfStock && onAdd()}
      disabled={isOutOfStock}
      className={cn(
        "flex flex-col p-3 rounded-xl border text-left transition-all relative overflow-hidden bg-card hover:shadow-md hover:border-primary/50",
        isSelected && "ring-2 ring-primary border-primary",
        isOutOfStock && "opacity-50 grayscale cursor-not-allowed"
      )}
    >
      {isLowStock && (
        <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">
          Low Stock
        </span>
      )}
      
      <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center mb-3">
        <span className="text-2xl font-bold text-muted-foreground">
          {product.name.charAt(0)}
        </span>
      </div>
      
      <p className="font-medium text-sm line-clamp-2">{product.name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
      
      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="font-bold">${product.price.toFixed(2)}</span>
        {product.type === "good" && (
          <span className="text-xs text-muted-foreground">
            Stock: {product.stock_quantity}
          </span>
        )}
      </div>
    </motion.button>
  );
};

const CartPanel = ({
  cart,
  customerName,
  setCustomerName,
  activeDiscount,
  setActiveDiscount,
  cartItemCount,
  subtotal,
  globalDiscount,
  total,
  currentUser,
  onClearCart,
  onUpdateQty,
  onRemove,
  onDiscount,
  onPayment,
  isMobile = false,
}: {
  cart: CartItem[];
  customerName: string;
  setCustomerName: (v: string) => void;
  activeDiscount: ActiveDiscount | null;
  setActiveDiscount: (v: ActiveDiscount | null) => void;
  cartItemCount: number;
  subtotal: number;
  globalDiscount: number;
  total: number;
  currentUser: { name: string };
  onClearCart: () => void;
  onUpdateQty: (lineId: string, qty: number) => void;
  onRemove: (lineId: string) => void;
  onDiscount: (lineId: string) => void;
  onPayment: () => void;
  isMobile?: boolean;
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">Current Sale</span>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {cartItemCount}
            </span>
          </div>
          {cart.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearCart} className="text-destructive h-8 text-xs">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear
            </Button>
          )}
        </div>
        
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Customer name (optional)"
            className="pl-9 h-9 text-sm"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        
        {activeDiscount && (
          <div className="mt-3 flex items-center justify-between bg-primary/10 text-primary px-3 py-2 rounded-lg text-xs">
            <span>
              {activeDiscount.name}: {activeDiscount.type === "percentage" ? `${activeDiscount.value}%` : `$${activeDiscount.value}`} off
            </span>
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setActiveDiscount(null)}>
              Remove
            </Button>
          </div>
        )}
      </div>
      
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ShoppingCart className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">Cart is empty</p>
            <p className="text-xs mt-1">Click items to add</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <CartItemRow
                key={item.lineId}
                item={item}
                onDec={() => onUpdateQty(item.lineId, item.quantity - 1)}
                onInc={() => onUpdateQty(item.lineId, item.quantity + 1)}
                onRemove={() => onRemove(item.lineId)}
                onDiscount={() => onDiscount(item.lineId)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Totals & Payment */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="space-y-1 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {globalDiscount > 0 && (
            <div className="flex justify-between text-primary">
              <span>Discount</span>
              <span>-${globalDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <Button
          className="w-full h-12 text-base font-semibold"
          disabled={cart.length === 0}
          onClick={onPayment}
        >
          Pay ${total.toFixed(2)}
        </Button>
        
        <p className="text-center text-xs text-muted-foreground mt-3">
          Cashier: {currentUser.name}
        </p>
      </div>
    </div>
  );
};

const CartItemRow = ({
  item,
  onDec,
  onInc,
  onRemove,
  onDiscount,
}: {
  item: CartItem;
  onDec: () => void;
  onInc: () => void;
  onRemove: () => void;
  onDiscount: () => void;
}) => {
  const unitPrice = item.customPrice ?? item.product.price;
  const lineTotal = unitPrice * item.quantity;
  const discountAmount = item.discountType === "percentage"
    ? lineTotal * (item.discount / 100)
    : item.discount;
  const finalPrice = lineTotal - discountAmount;

  return (
    <div className="bg-background rounded-lg p-3 border border-border">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{item.product.name}</p>
          {item.discount > 0 && (
            <span className="text-xs text-primary">
              {item.discountType === "percentage" ? `${item.discount}% off` : `-$${item.discount}`}
            </span>
          )}
        </div>
        <div className="text-right">
          <p className="font-semibold">${finalPrice.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">
            ${unitPrice.toFixed(2)} × {item.quantity}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onDiscount} className="h-7 text-xs">
          <Percent className="w-3 h-3 mr-1" /> Discount
        </Button>
        
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={onDec}>
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
          <Button variant="outline" size="icon" className="h-7 w-7" onClick={onInc}>
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onRemove}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default POSDemoPage;
