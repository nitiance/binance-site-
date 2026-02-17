import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

const Index = lazy(() => import("./pages/Index"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Downloads = lazy(() => import("./pages/Downloads"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const POSDemoPage = lazy(() => import("./pages/POSDemoPage"));

const queryClient = new QueryClient();

const RouteLoading = () => (
  <div className="min-h-[40vh] flex items-center justify-center px-6 text-sm text-muted-foreground">
    Loading...
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/demo/pos" element={<POSDemoPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Backward-compatible redirects */}
              <Route path="/systems" element={<Navigate to="/portfolio#systems" replace />} />
              <Route path="/systems/:systemId" element={<Navigate to="/demo/pos" replace />} />
              <Route path="/early-access" element={<Navigate to="/downloads#early-access" replace />} />
              <Route path="/request-system" element={<Navigate to="/contact?tab=request-system" replace />} />
              <Route path="/about" element={<Navigate to="/portfolio" replace />} />
              <Route path="/labs" element={<Navigate to="/portfolio#labs" replace />} />
              <Route path="/community" element={<Navigate to="/portfolio" replace />} />
              <Route path="/media" element={<Navigate to="/portfolio" replace />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
