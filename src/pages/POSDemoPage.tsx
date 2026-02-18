import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// IMPORTANT: This is intentionally same-origin.
// On Vercel, `/pos/*` is reverse-proxied to the real POS app deployment.
const FALLBACK_POS_URL = "/pos/";

function normalizeBaseUrl(raw: string) {
  const v = String(raw || "").trim();
  if (!v) return "";
  // The POS demo build uses relative asset URLs; keep a trailing slash for correct resolution.
  return v.replace(/\/+$/, "") + "/";
}

export const POSDemoPage = () => {
  const posUrl = useMemo(() => {
    const fromEnv = normalizeBaseUrl(import.meta.env.VITE_POS_APP_URL);
    return fromEnv || FALLBACK_POS_URL;
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F7F3EE]">
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0B0F14]/85 backdrop-blur">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
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
                Real app. Per-visitor demo account. Data resets after expiry.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 shadow-[0_18px_50px_rgba(0,0,0,0.45)] overflow-hidden">
          <iframe
            title="BinanceXI POS Live Demo"
            src={posUrl}
            className="w-full h-[calc(100vh-110px)]"
            allow="camera; microphone; clipboard-read; clipboard-write; fullscreen"
          />
        </div>

        <p className="mt-3 text-xs text-white/50">
          If this doesn&apos;t load, open the demo app directly:{" "}
          <a
            href={posUrl}
            className="underline underline-offset-4 hover:text-white/80"
          >
            {posUrl}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default POSDemoPage;
