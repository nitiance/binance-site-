import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Work", path: "/portfolio" },
  { label: "Systems", path: "/systems" },
  { label: "Downloads", path: "/downloads" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActivePath = (path: string) =>
    location.pathname === path ||
    (path === "/systems" && location.pathname.startsWith("/systems"));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F14]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-base font-semibold tracking-tight text-white">
          BinanceXI
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm tracking-tight transition-colors ${
                isActivePath(item.path)
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/request-system"
            className="inline-flex items-center justify-center rounded-lg bg-[#F7F3EE] text-[#0B1F3B] text-xs font-semibold px-3 py-2 hover:bg-white transition-colors"
          >
            Request System
          </Link>
        </div>

        {/* Mobile toggle - larger touch target */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-sm text-white/70 py-2 px-3 -mr-3 active:text-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile nav - fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-14 bg-[#0B0F14] z-40"
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              <Link
                to="/request-system"
                onClick={() => setMenuOpen(false)}
                className="mb-4 inline-flex items-center justify-center rounded-lg bg-[#F7F3EE] text-[#0B1F3B] text-sm font-semibold px-4 py-3"
              >
                Request System
              </Link>

              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-4 text-2xl font-bold tracking-tight border-b border-white/10 ${
                      isActivePath(item.path)
                        ? "text-white"
                        : "text-white/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Home link at bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-white/30 hover:text-white/50"
                >
                  ← Back to Home
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
