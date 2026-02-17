import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { updateAttribution } from "@/lib/attribution";

const Layout = () => {
  const location = useLocation();
  const hasTrackedInitialPageview = useRef(false);

  useEffect(() => {
    updateAttribution();

    // Plausible only auto-tracks the initial load. For SPA route changes, we trigger pageview manually.
    if (typeof window !== "undefined" && typeof window.plausible === "function") {
      if (hasTrackedInitialPageview.current) {
        window.plausible("pageview", { u: window.location.href });
      } else {
        hasTrackedInitialPageview.current = true;
      }
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rawHash = location.hash;
    if (!rawHash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    let id = rawHash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // Keep the raw id if decoding fails.
    }

    const scrollToId = () => {
      const node = document.getElementById(id);
      if (!node) return false;
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToId()) return;

    // Retry once in case the element renders a tick later.
    const timer = window.setTimeout(scrollToId, 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <div className="grain min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
