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

const Footer = () => {
  return (
    <footer className="section-dark border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="text-lg font-serif font-semibold tracking-tighter">BinanceXI</p>
            <p className="text-xs text-white/40 mt-2 leading-relaxed">
              Building systems, software, and people.
              <br />
              Based in Zimbabwe.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-12 text-xs text-white/50">
            <div className="flex flex-col gap-3">
              <Link to="/portfolio" className="hover:text-white transition-colors">
                Work
              </Link>
              <Link to="/systems" className="hover:text-white transition-colors">
                Systems
              </Link>
              <Link to="/downloads" className="hover:text-white transition-colors">
                Downloads
              </Link>
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/request-system" className="hover:text-white transition-colors">
                Request System
              </Link>
              <Link to="/early-access" className="hover:text-white transition-colors">
                Early Access
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/labs" className="hover:text-white transition-colors">
                Labs
              </Link>
              <Link to="/community" className="hover:text-white transition-colors">
                Community
              </Link>
              <Link to="/media" className="hover:text-white transition-colors">
                Media
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3 text-xs text-white/50 md:items-end">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} BinanceXI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
