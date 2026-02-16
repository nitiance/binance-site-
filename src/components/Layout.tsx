import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grain min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
