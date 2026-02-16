declare global {
  interface Window {
    Sentry?: {
      init: (options: Record<string, unknown>) => void;
      captureException?: (error: unknown) => void;
      setTag?: (key: string, value: string) => void;
      setUser?: (user: Record<string, unknown> | null) => void;
    };
  }
}

const sentryScriptId = "binancexi-sentry-loader";

const loadSentryBrowserSdk = async (publicKey: string) => {
  if (typeof window === "undefined") return;
  if (window.Sentry) return;
  if (document.getElementById(sentryScriptId)) return;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = sentryScriptId;
    script.async = true;
    script.defer = true;
    script.src = `https://js.sentry-cdn.com/${publicKey}.min.js`;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Sentry browser SDK."));
    document.head.appendChild(script);
  });
};

export const initSentry = async () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
  if (!dsn) return;
  if (typeof window === "undefined") return;

  let publicKey = "";
  try {
    const url = new URL(dsn);
    publicKey = url.username;
  } catch {
    return;
  }

  if (!publicKey) return;

  try {
    await loadSentryBrowserSdk(publicKey);
  } catch {
    return;
  }

  if (!window.Sentry) return;

  window.Sentry.init({
    dsn,
    // Keep sampling low by default; tune later.
    tracesSampleRate: 0.05,
  });

  window.Sentry.setTag?.("app", "binancexi-site");
};

