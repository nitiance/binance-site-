import fs from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const publicDir = path.join(workspaceRoot, "public");

const baseUrlRaw = process.env.VITE_SITE_URL || "https://example.com";
const baseUrl = baseUrlRaw.replace(/\/+$/, "");

const routes = [
  "/",
  "/about",
  "/portfolio",
  "/systems",
  "/systems/pos",
  "/systems/inventory",
  "/systems/analytics",
  "/systems/offline-sync",
  "/downloads",
  "/early-access",
  "/contact",
  "/request-system",
  "/privacy",
  "/terms",
  "/labs",
  "/community",
  "/media",
];

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes
    .map((route) => {
      const loc = `${baseUrl}${route}`;
      return `  <url><loc>${escapeXml(loc)}</loc></url>`;
    })
    .join("\n") +
  `\n</urlset>\n`;

const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");

console.log(`Generated sitemap.xml and robots.txt for ${baseUrl}`);

