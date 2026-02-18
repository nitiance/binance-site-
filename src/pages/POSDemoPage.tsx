import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

const FALLBACK_POS_ORIGIN = "https://binacepos.vercel.app";

function normalizeOrigin(raw: string) {
  const v = String(raw || "").trim();
  if (!v) return "";

  try {
    const u = new URL(v);
    return u.origin;
  } catch {
    // Convenience: allow setting just a hostname like "binacepos.vercel.app".
    try {
      const u = new URL(`https://${v.replace(/^\/+/, "")}`);
      return u.origin;
    } catch {
      return "";
    }
  }
}

function buildDemoUrl(origin: string) {
  try {
    const u = new URL(origin);
    u.searchParams.set("demo", "1");
    u.hash = "";
    return u.toString();
  } catch {
    return `${FALLBACK_POS_ORIGIN}/?demo=1`;
  }
}

export const POSDemoPage = () => {
  const demoUrl = useMemo(() => {
    const fromEnv = normalizeOrigin(import.meta.env.VITE_POS_APP_URL);
    const origin = fromEnv || FALLBACK_POS_ORIGIN;
    return buildDemoUrl(origin);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F7F3EE]">
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0B0F14]/85 backdrop-blur">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#F7F3EE] hover:text-white/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="hidden sm:block h-5 w-px bg-white/10" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">Live POS Demo</p>
              <p className="text-xs text-white/60 leading-tight truncate">
                Opens the real POS app in demo mode.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 py-10">
        <div className="rounded-2xl border border-white/10 bg-black/20 shadow-[0_18px_50px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="p-6 sm:p-10">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Try the Live Demo</h1>
            <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
              This opens the actual BinanceXI POS web app at <span className="text-white/90">binacepos.vercel.app</span>.
              If you arrive with the demo link, the login screen shows a <span className="text-white/90">Try Live Demo</span> button.
              Clicking it provisions a temporary demo business and signs you in.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black font-semibold px-5 py-3 hover:bg-white/90 transition"
              >
                Launch Demo
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href={demoUrl}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-semibold px-5 py-3 hover:bg-white/5 transition"
              >
                Open Here
              </a>
            </div>

            <div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              <div className="font-semibold text-white/85">Notes</div>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>The demo account is created only when you click the demo button inside the POS app.</li>
                <li>Provisioning requires an internet connection.</li>
                <li>Demo data expires and is cleaned up automatically.</li>
              </ul>
            </div>

            <p className="mt-6 text-xs text-white/50">
              Demo URL: {" "}
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-white/80"
              >
                {demoUrl}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSDemoPage;
