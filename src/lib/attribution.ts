type TrackingMap = Record<string, string>;

type TouchPoint = {
  timestamp: string;
  path: string;
  referrer: string | null;
  referrerHost: string | null;
  channel: string;
  tracking: TrackingMap;
};

export type AttributionContext = {
  firstTouch: TouchPoint | null;
  lastTouch: TouchPoint | null;
  currentPath: string;
  currentReferrer: string | null;
};

const FIRST_TOUCH_KEY = "binancexi:first-touch";
const LAST_TOUCH_KEY = "binancexi:last-touch";

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ref",
] as const;

const safeStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const readTouch = (key: string): TouchPoint | null => {
  const storage = safeStorage();
  if (!storage) {
    return null;
  }

  const raw = storage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as TouchPoint;
  } catch {
    return null;
  }
};

const writeTouch = (key: string, value: TouchPoint) => {
  const storage = safeStorage();
  if (!storage) {
    return;
  }

  storage.setItem(key, JSON.stringify(value));
};

const extractTracking = (search: string): TrackingMap => {
  const params = new URLSearchParams(search);
  const tracking: TrackingMap = {};

  for (const key of TRACKING_KEYS) {
    const value = params.get(key);
    if (value) {
      tracking[key] = value;
    }
  }

  return tracking;
};

const toHost = (input: string): string | null => {
  if (!input) {
    return null;
  }

  try {
    return new URL(input).host || null;
  } catch {
    return null;
  }
};

const inferChannel = (tracking: TrackingMap, referrerHost: string | null) => {
  if (tracking.utm_source) {
    return tracking.utm_source;
  }

  if (tracking.gclid) {
    return "google-ads";
  }

  if (tracking.fbclid) {
    return "meta-ads";
  }

  if (referrerHost) {
    return referrerHost;
  }

  return "direct";
};

const buildTouchPoint = () => {
  const tracking = extractTracking(window.location.search);
  const referrer = document.referrer || null;
  const referrerHost = toHost(document.referrer);

  return {
    timestamp: new Date().toISOString(),
    path: `${window.location.pathname}${window.location.search}`,
    referrer,
    referrerHost,
    channel: inferChannel(tracking, referrerHost),
    tracking,
  } satisfies TouchPoint;
};

export const updateAttribution = () => {
  if (typeof window === "undefined") {
    return;
  }

  const touchPoint = buildTouchPoint();
  const hasTracking = Object.keys(touchPoint.tracking).length > 0;
  const firstTouch = readTouch(FIRST_TOUCH_KEY);
  const lastTouch = readTouch(LAST_TOUCH_KEY);

  if (!firstTouch) {
    writeTouch(FIRST_TOUCH_KEY, touchPoint);
  }

  if (!lastTouch || hasTracking) {
    writeTouch(LAST_TOUCH_KEY, touchPoint);
  }
};

export const getAttributionContext = (): AttributionContext => {
  if (typeof window === "undefined") {
    return {
      firstTouch: null,
      lastTouch: null,
      currentPath: "",
      currentReferrer: null,
    };
  }

  return {
    firstTouch: readTouch(FIRST_TOUCH_KEY),
    lastTouch: readTouch(LAST_TOUCH_KEY),
    currentPath: `${window.location.pathname}${window.location.search}`,
    currentReferrer: document.referrer || null,
  };
};
