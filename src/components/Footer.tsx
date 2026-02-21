import { Link } from "react-router-dom";

const socialLinks = [
  {
    platform: "YouTube",
    url: "https://youtube.com/@nitiance?si=XK80Oy_RPHqVYqkw",
  },
  {
    platform: "TikTok",
    url: "https://www.tiktok.com/@nitiance?_r=1&_t=ZS-93jPukGw4X9",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/_nitiance?igsh=MWQ1dWlhYjk4ZnJmaA%3D%3D&utm_source=qr",
  },
];

const contactLinks = [
  {
    label: "Email",
    url: "mailto:nitiance@gmail.com",
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/263782750867?text=Hi%20Nitiance%2C%20I%20want%20to%20discuss%20a%20project.",
  },
] as const;

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-[#86868B] pt-20 pb-12 font-sans overflow-hidden">
      <div className="max-w-[1024px] mx-auto px-6 md:px-8">

        {/* Top brand header */}
        <div className="mb-16 pb-12 border-b border-white/10">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-[#F5F5F7] mb-4">
            BinanceXI
          </h2>
          <p className="text-sm text-[#86868B] max-w-md leading-relaxed">
            Building systems, software, and people. <br className="hidden sm:block" />
            Based in Zimbabwe. Ready for the world.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Links Column 1 */}
          <div>
            <h4 className="text-[#F5F5F7] font-semibold text-[11px] mb-4 tracking-[0.05em] uppercase">Products</h4>
            <ul className="space-y-3.5 text-xs">
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors duration-300">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-white transition-colors duration-300">
                  Downloads
                </Link>
              </li>
              <li>
                <Link to="/downloads#early-access" className="hover:text-white transition-colors duration-300">
                  Early Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-[#F5F5F7] font-semibold text-[11px] mb-4 tracking-[0.05em] uppercase">Connect</h4>
            <ul className="space-y-3.5 text-xs">
              <li>
                <Link to="/contact?tab=request-system" className="hover:text-white transition-colors duration-300">
                  Request System
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-[#F5F5F7] font-semibold text-[11px] mb-4 tracking-[0.05em] uppercase">Social</h4>
            <ul className="space-y-3.5 text-xs">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-300"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px]">
          <p>Copyright © {new Date().getFullYear()} BinanceXI Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/privacy" className="hover:text-white transition-colors duration-300 border-r border-[#86868B]/40 pr-4">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
