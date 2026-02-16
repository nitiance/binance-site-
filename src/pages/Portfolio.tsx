import ScrollReveal from "@/components/animations/ScrollReveal";
import GradientBanner from "@/components/GradientBanner";
import { Link } from "react-router-dom";
import { Monitor, Smartphone, ShoppingCart, Pill, Shirt, Wrench, Palette } from "lucide-react";
import SystemCardGrid from "@/components/systems/SystemCardGrid";
import { systemCards } from "@/config/systems";

const projects = [
  {
    title: "Hwedza Medical Lab",
    type: "Client Project",
    description: "Medical laboratory website. Professional healthcare presence built with precision and care.",
    status: "Completed",
    link: "https://hwedza.com",
  },
  {
    title: "SuezBay",
    type: "Marketplace",
    description: "Zimbabwe's community marketplace. Cross-border commerce infrastructure for emerging markets.",
    status: "In Production",
    link: null,
  },
  {
    title: "Internal Tooling",
    type: "Developer Tools",
    description: "Custom CLI and workflow tools built for internal use.",
    status: "Active",
    link: null,
  },
  {
    title: "Experiments",
    type: "R&D",
    description: "Prototypes and proof-of-concepts from Binance Labs.",
    status: "Various",
    link: null,
  },
];

const systems = [
  {
    title: "Point of Sale System",
    type: "Retail / Service",
    description: "Offline-capable POS with real-time cart, discounts, inventory tracking, and mobile-first design. Built for speed.",
    status: "Live Demo",
    demoLink: "/demo/pos",
  },
];

const industryOptions = [
  { icon: ShoppingCart, name: "Retail", description: "Supermarkets, convenience stores, general retail" },
  { icon: Wrench, name: "Hardware", description: "Tool shops, building materials, equipment" },
  { icon: Shirt, name: "Clothing", description: "Fashion boutiques, apparel stores, footwear" },
  { icon: Pill, name: "Pharmacy", description: "Drugstores, medical supplies, healthcare retail" },
  { icon: Monitor, name: "Electronics", description: "Tech shops, repairs, computer stores" },
];

const Portfolio = () => {
  return (
    <div>
      {/* Hero - Gradient Banner */}
      <GradientBanner 
        height="h-[50vh] sm:h-[60vh]" 
        title="Work that speaks for itself."
        subtitle="Portfolio"
        showLogo={false}
      />

      {/* Systems Section - Dark */}
      <section className="section-dark noise-texture">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <ScrollReveal>
            <p className="text-xs tracking-tight uppercase mb-8 opacity-50">
              Systems
            </p>
          </ScrollReveal>
          
          {systems.map((system, i) => (
            <ScrollReveal key={system.title} delay={0.05 * i}>
              <div className="border-b border-white/10 py-8 md:py-10 grid md:grid-cols-[1fr_2fr_auto] gap-6 md:gap-8 items-start">
                <div>
                  <p className="text-sm font-bold tracking-tight">{system.title}</p>
                  <p className="text-xs text-white/50 mt-1">{system.type}</p>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  {system.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">{system.status}</span>
                  {system.demoLink && (
                    <Link
                      to={system.demoLink}
                      className="text-xs font-medium text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors"
                    >
                      Try Demo →
                    </Link>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* System Widgets */}
          <div className="mt-12">
            <ScrollReveal>
              <p className="text-xs tracking-tight uppercase mb-6 opacity-50">
                System Directory
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <SystemCardGrid cards={systemCards} />
            </ScrollReveal>
          </div>

          {/* Industry Customization */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-3">
                <Palette className="w-5 h-5 text-white/60" />
                <p className="text-xs tracking-tight uppercase opacity-50">
                  Fully Customizable
                </p>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold tracking-tight mb-4">
                Built for your industry
              </h3>
              <p className="text-sm text-white/60 max-w-xl mb-8">
                The entire system can be customized to your preferences - industry-specific workflows,
                custom categories, branded colors, and tailored reporting. One system, infinite possibilities.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {industryOptions.map((industry, i) => (
                <ScrollReveal key={industry.name} delay={0.05 * i}>
                  <div className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20">
                    <industry.icon className="w-6 h-6 text-white/70 mb-3 group-hover:text-white transition-colors" />
                    <p className="text-sm font-medium text-white">{industry.name}</p>
                    <p className="text-xs text-white/40 mt-1 line-clamp-2">{industry.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="w-4 h-4 rounded-full bg-primary" />
                  <span>Theme colors</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="w-4 h-4 rounded-full bg-accent" />
                  <span>Custom workflows</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span className="w-4 h-4 rounded-full bg-secondary" />
                  <span>Industry reports</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile-first</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects List - White */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <ScrollReveal>
            <p className="text-xs tracking-tight uppercase mb-8 opacity-50">
              Projects
            </p>
          </ScrollReveal>
          
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={0.05 * i}>
              <div className="border-b border-border py-8 md:py-10 grid md:grid-cols-[1fr_2fr_auto] gap-6 md:gap-8 items-start">
                <div>
                  <p className="text-sm font-bold tracking-tight">{project.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{project.type}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  <p className="text-xs text-muted-foreground">{project.status}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-foreground border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity"
                    >
                      View →
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Client Work CTA - Mid */}
      <section className="section-mid noise-texture">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="max-w-[640px]">
            <ScrollReveal>
              <p className="text-xs tracking-tight uppercase mb-4 opacity-50">
                Client Work
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tighter leading-tight">
                I build apps and business systems.
                <br />
                Web work is only for selected clients.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-sm opacity-60 leading-relaxed max-w-[480px]">
                If you need POS, inventory, analytics, or custom workflows, send your requirements.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-8">
                <Link
                  to="/request-system"
                  className="text-sm font-medium border-b border-white/50 pb-0.5 hover:border-white transition-colors"
                >
                  Request a system →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
