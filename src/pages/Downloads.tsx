import { useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { downloads } from "@/config/downloads";
import { trackEvent } from "@/lib/analytics";

const Downloads = () => {
  useEffect(() => {
    trackEvent("downloads_page_viewed");
  }, []);

  const publishedDownloads = downloads.filter((app) => app.platforms.length > 0);
  const hasDownloads = publishedDownloads.length > 0;

  return (
    <div>
      <section className="bg-[#0B0F14] text-[#F7F3EE] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">Downloads</p>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight">
              Public builds, when they are ready.
            </h1>
            <p className="mt-5 text-sm md:text-base text-[#F7F3EE]/75 max-w-2xl leading-relaxed">
              Until releases are published, use Early Access to get notified and to receive test builds.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                to="/early-access"
                className="inline-flex items-center justify-center rounded-lg bg-[#F7F3EE] text-[#0B1F3B] text-sm font-semibold px-4 py-2.5 hover:bg-white transition-colors"
              >
                Join Early Access
              </Link>
              <Link
                to="/request-system"
                className="text-sm font-medium border-b border-[#F7F3EE]/60 pb-0.5 hover:border-[#F7F3EE] transition-colors"
              >
                Request a system
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-4">Status</p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-[#0B0F14]">
              No public downloads yet.
            </h2>
            <p className="mt-5 text-sm text-[#2B3440]/75 leading-relaxed max-w-md">
              When builds are ready, they will be published as versioned assets with checksums and release notes.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/early-access"
                className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-sm font-semibold px-4 py-2.5 hover:bg-[#0B1F3B]/90 transition-colors"
              >
                Get notified
              </Link>
              <Link
                to="/systems"
                className="inline-flex items-center justify-center rounded-lg border border-[#D8CEC2] bg-white/70 text-[#0B0F14] text-sm font-semibold px-4 py-2.5 hover:bg-white transition-colors"
              >
                View systems
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              {[
                {
                  title: "Android APK",
                  desc: "Without Play Store publishing, installs may warn about unknown sources. We'll provide checksums so you can verify files.",
                },
                {
                  title: "iOS",
                  desc: "Without App Store/TestFlight, public iOS installs are limited. Early Access is required for any iOS testing path.",
                },
                {
                  title: "Windows",
                  desc: "Unsigned apps may trigger SmartScreen warnings. Code signing is planned for official releases.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[#D8CEC2] bg-white/70 p-5 shadow-[0_8px_24px_rgba(11,31,59,0.06)]"
                >
                  <p className="text-sm font-semibold text-[#0B0F14]">{item.title}</p>
                  <p className="mt-2 text-sm text-[#2B3440]/75 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {hasDownloads && (
        <section className="bg-[#F7F3EE] border-t border-[#D8CEC2]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-wide text-[#2B3440]/60 mb-6">Releases</p>
              <div className="grid md:grid-cols-2 gap-4">
                {publishedDownloads.map((app) => (
                  <div
                    key={app.id}
                    className="rounded-xl border border-[#D8CEC2] bg-white/70 p-6 shadow-[0_8px_24px_rgba(11,31,59,0.06)]"
                  >
                    <p className="text-sm font-semibold text-[#0B0F14]">{app.name}</p>
                    <p className="mt-2 text-sm text-[#2B3440]/75 leading-relaxed">{app.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {app.platforms.map((platform) => (
                        <a
                          key={`${app.id}-${platform.platform}`}
                          href={platform.githubReleaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-xs font-semibold px-3 py-2 hover:bg-[#0B1F3B]/90 transition-colors"
                        >
                          {platform.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  );
};

export default Downloads;
