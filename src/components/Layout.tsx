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
