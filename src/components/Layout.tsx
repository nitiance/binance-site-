import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { updateAttribution } from "@/lib/attribution";

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    updateAttribution();
  }, [location.pathname, location.search]);

  return (
    <div className="grain min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
