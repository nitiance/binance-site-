// Demo Data Store - localStorage-based data layer for offline demo mode

// ---- TYPES ----
export interface DemoProduct {
  id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
  type: "good" | "service";
  stock_quantity: number;
  low_stock_threshold: number;
  sku: string;
  barcode: string;
  shortcut_code: string;
  image_url?: string;
  is_archived: boolean;
  created_at: string;
}

export interface DemoOrder {
  id: string;
  created_at: string;
  total_amount: number;
  payment_method: string;
  customer_name: string | null;
  cashier_name: string;
  receipt_id: string;
  receipt_number: string;
}

export interface DemoOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price_at_sale: number;
  cost_at_sale: number;
  created_at: string;
  category: string | null;
}

// ---- STORAGE KEYS ----
const KEYS = {
  products: "binancexi_demo_products_v1",
  orders: "binancexi_demo_orders_v1",
  orderItems: "binancexi_demo_order_items_v1",
  seeded: "binancexi_demo_seeded_v1",
};

// ---- HELPERS ----
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function makeReceiptId(): string {
  return `rcpt-${generateId()}`;
}

export function makeReceiptNumber(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 999999)).padStart(6, "0");
  return `BXI-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${seq}`;
}

function getRandomDate(daysAgo: number): string {
  const now = new Date();
  const past = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime).toISOString();
}

// ---- SEED DATA ----
const SEED_PRODUCTS: Omit<DemoProduct, "created_at">[] = [
  // General
  { id: "p1", name: "USB Flash Drive 32GB", price: 12.99, cost: 6.50, category: "General", type: "good", stock_quantity: 45, low_stock_threshold: 10, sku: "USB-32", barcode: "1000000000001", shortcut_code: "USB32", is_archived: false },
  { id: "p2", name: "HDMI Cable 2m", price: 15.99, cost: 7.00, category: "General", type: "good", stock_quantity: 38, low_stock_threshold: 10, sku: "HDMI-2M", barcode: "1000000000002", shortcut_code: "HDMI2", is_archived: false },
  { id: "p3", name: "Power Strip 6-Outlet", price: 24.99, cost: 12.00, category: "General", type: "good", stock_quantity: 22, low_stock_threshold: 5, sku: "PWR-6", barcode: "1000000000003", shortcut_code: "PWR6", is_archived: false },
  
  // Repairs
  { id: "p4", name: "Screen Protector", price: 9.99, cost: 2.50, category: "Repairs", type: "good", stock_quantity: 100, low_stock_threshold: 20, sku: "SP-001", barcode: "2000000000001", shortcut_code: "SP1", is_archived: false },
  { id: "p5", name: "Phone Case Universal", price: 14.99, cost: 5.00, category: "Repairs", type: "good", stock_quantity: 65, low_stock_threshold: 15, sku: "PC-UNI", barcode: "2000000000002", shortcut_code: "PCU", is_archived: false },
  { id: "p6", name: "Screen Replacement", price: 89.99, cost: 45.00, category: "Repairs", type: "service", stock_quantity: 999, low_stock_threshold: 0, sku: "SRV-SCR", barcode: "2000000000003", shortcut_code: "SSCR", is_archived: false },
  { id: "p7", name: "Battery Replacement", price: 49.99, cost: 20.00, category: "Repairs", type: "service", stock_quantity: 999, low_stock_threshold: 0, sku: "SRV-BAT", barcode: "2000000000004", shortcut_code: "SBAT", is_archived: false },
  
  // Accessories
  { id: "p8", name: "Wireless Earbuds", price: 34.99, cost: 15.00, category: "Accessories", type: "good", stock_quantity: 28, low_stock_threshold: 8, sku: "WE-001", barcode: "3000000000001", shortcut_code: "WE1", is_archived: false },
  { id: "p9", name: "Laptop Stand", price: 39.99, cost: 18.00, category: "Accessories", type: "good", stock_quantity: 15, low_stock_threshold: 5, sku: "LS-001", barcode: "3000000000002", shortcut_code: "LS1", is_archived: false },
  { id: "p10", name: "Webcam 1080p", price: 59.99, cost: 28.00, category: "Accessories", type: "good", stock_quantity: 3, low_stock_threshold: 5, sku: "WC-1080", barcode: "3000000000003", shortcut_code: "WC1080", is_archived: false },
  { id: "p11", name: "USB-C Charger 65W", price: 44.99, cost: 22.00, category: "Accessories", type: "good", stock_quantity: 0, low_stock_threshold: 5, sku: "CHG-65", barcode: "3000000000004", shortcut_code: "CHG65", is_archived: false },
  
  // Networking
  { id: "p12", name: "Ethernet Cable 5m", price: 8.99, cost: 3.00, category: "Networking", type: "good", stock_quantity: 75, low_stock_threshold: 20, sku: "ETH-5M", barcode: "4000000000001", shortcut_code: "ETH5", is_archived: false },
  { id: "p13", name: "WiFi Range Extender", price: 49.99, cost: 25.00, category: "Networking", type: "good", stock_quantity: 12, low_stock_threshold: 5, sku: "WFE-001", barcode: "4000000000002", shortcut_code: "WFE1", is_archived: false },
  { id: "p14", name: "Network Switch 8-Port", price: 34.99, cost: 18.00, category: "Networking", type: "good", stock_quantity: 8, low_stock_threshold: 3, sku: "NSW-8", barcode: "4000000000003", shortcut_code: "NSW8", is_archived: false },
  { id: "p15", name: "Network Setup", price: 79.99, cost: 0, category: "Networking", type: "service", stock_quantity: 999, low_stock_threshold: 0, sku: "SRV-NET", barcode: "4000000000004", shortcut_code: "SNET", is_archived: false },
  
  // Services
  { id: "p16", name: "Tech Consultation (1hr)", price: 75.00, cost: 0, category: "Services", type: "service", stock_quantity: 999, low_stock_threshold: 0, sku: "SRV-CON", barcode: "5000000000001", shortcut_code: "SCON", is_archived: false },
  { id: "p17", name: "Data Recovery", price: 149.99, cost: 0, category: "Services", type: "service", stock_quantity: 999, low_stock_threshold: 0, sku: "SRV-DAT", barcode: "5000000000002", shortcut_code: "SDAT", is_archived: false },
  { id: "p18", name: "Virus Removal", price: 59.99, cost: 0, category: "Services", type: "service", stock_quantity: 999, low_stock_threshold: 0, sku: "SRV-VIR", barcode: "5000000000003", shortcut_code: "SVIR", is_archived: false },
];

function generateSeedOrders(): { orders: DemoOrder[]; items: DemoOrderItem[] } {
  const orders: DemoOrder[] = [];
  const items: DemoOrderItem[] = [];
  const products = SEED_PRODUCTS;
  const paymentMethods = ["Cash", "Card", "Mobile"];
  const cashiers = ["Admin", "John", "Sarah"];
  const customers = [null, "Walk-in", "Mike Johnson", "Sarah Williams", "Tech Corp", null, "Jane Doe"];

  // Generate 15-25 orders over last 7 days
  const orderCount = 15 + Math.floor(Math.random() * 10);
  
  for (let i = 0; i < orderCount; i++) {
    const orderId = generateId();
    const orderDate = getRandomDate(7);
    const itemCount = 1 + Math.floor(Math.random() * 4);
    
    let orderTotal = 0;
    const orderItems: DemoOrderItem[] = [];
    
    for (let j = 0; j < itemCount; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const qty = 1 + Math.floor(Math.random() * 3);
      const lineTotal = product.price * qty;
      orderTotal += lineTotal;
      
      orderItems.push({
        id: generateId(),
        order_id: orderId,
        product_id: product.id,
        product_name: product.name,
        quantity: qty,
        price_at_sale: product.price,
        cost_at_sale: product.cost,
        created_at: orderDate,
        category: product.category,
      });
    }
    
    orders.push({
      id: orderId,
      created_at: orderDate,
      total_amount: Math.round(orderTotal * 100) / 100,
      payment_method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      customer_name: customers[Math.floor(Math.random() * customers.length)],
      cashier_name: cashiers[Math.floor(Math.random() * cashiers.length)],
      receipt_id: makeReceiptId(),
      receipt_number: makeReceiptNumber(),
    });
    
    items.push(...orderItems);
  }
  
  return { orders, items };
}

// ---- STORAGE FUNCTIONS ----
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

// ---- PUBLIC API ----

export function seedDemoIfEmpty(): void {
  const seeded = localStorage.getItem(KEYS.seeded);
  if (seeded) return;
  
  // Seed products
  const products: DemoProduct[] = SEED_PRODUCTS.map(p => ({
    ...p,
    created_at: new Date().toISOString(),
  }));
  setToStorage(KEYS.products, products);
  
  // Seed orders and items
  const { orders, items } = generateSeedOrders();
  setToStorage(KEYS.orders, orders);
  setToStorage(KEYS.orderItems, items);
  
  localStorage.setItem(KEYS.seeded, "true");
}

export function resetDemoData(): void {
  localStorage.removeItem(KEYS.products);
  localStorage.removeItem(KEYS.orders);
  localStorage.removeItem(KEYS.orderItems);
  localStorage.removeItem(KEYS.seeded);
  seedDemoIfEmpty();
}

// Products
export function getDemoProducts(): DemoProduct[] {
  return getFromStorage<DemoProduct[]>(KEYS.products, []);
}

export function setDemoProducts(products: DemoProduct[]): void {
  setToStorage(KEYS.products, products);
}

export function upsertDemoProduct(product: Partial<DemoProduct> & { id?: string }): DemoProduct {
  const products = getDemoProducts();
  const now = new Date().toISOString();
  
  if (product.id) {
    const idx = products.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      products[idx] = { ...products[idx], ...product };
      setDemoProducts(products);
      return products[idx];
    }
  }
  
  const newProduct: DemoProduct = {
    id: generateId(),
    name: product.name || "New Product",
    price: product.price || 0,
    cost: product.cost || 0,
    category: product.category || "General",
    type: product.type || "good",
    stock_quantity: product.stock_quantity || 0,
    low_stock_threshold: product.low_stock_threshold || 5,
    sku: product.sku || `SKU-${Date.now()}`,
    barcode: product.barcode || `${Date.now()}`,
    shortcut_code: product.shortcut_code || "",
    image_url: product.image_url,
    is_archived: product.is_archived || false,
    created_at: now,
  };
  
  products.push(newProduct);
  setDemoProducts(products);
  return newProduct;
}

export function archiveDemoProduct(id: string): void {
  const products = getDemoProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx >= 0) {
    products[idx].is_archived = true;
    setDemoProducts(products);
  }
}

export function setDemoStock(id: string, stock_quantity: number): void {
  const products = getDemoProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx >= 0) {
    products[idx].stock_quantity = stock_quantity;
    setDemoProducts(products);
  }
}

// Orders
export function getDemoOrders(): DemoOrder[] {
  return getFromStorage<DemoOrder[]>(KEYS.orders, []);
}

export function addDemoOrder(order: DemoOrder): void {
  const orders = getDemoOrders();
  orders.push(order);
  setToStorage(KEYS.orders, orders);
}

// Order Items
export function getDemoOrderItems(): DemoOrderItem[] {
  return getFromStorage<DemoOrderItem[]>(KEYS.orderItems, []);
}

export function addDemoOrderItems(items: DemoOrderItem[]): void {
  const existing = getDemoOrderItems();
  setToStorage(KEYS.orderItems, [...existing, ...items]);
}

// Stock decrement
export function decrementStockForSale(items: { product_id: string; quantity: number }[]): void {
  const products = getDemoProducts();
  
  items.forEach(item => {
    const idx = products.findIndex(p => p.id === item.product_id);
    if (idx >= 0 && products[idx].type === "good") {
      products[idx].stock_quantity = Math.max(0, products[idx].stock_quantity - item.quantity);
    }
  });
  
  setDemoProducts(products);
}

// Get orders for today
export function getTodayDemoOrders(): DemoOrder[] {
  const orders = getDemoOrders();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return orders.filter(order => {
    const orderDate = new Date(order.created_at);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  });
}

// Get low stock products
export function getLowStockProducts(): DemoProduct[] {
  const products = getDemoProducts();
  return products.filter(p => 
    !p.is_archived && 
    p.type === "good" && 
    p.stock_quantity <= p.low_stock_threshold
  );
}
