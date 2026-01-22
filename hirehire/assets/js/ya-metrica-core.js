

const YM_COUNTER_ID = 88891643;
const WORKER_TRACK_URL = "https://metrics.eugenedurov.works/track";
const READY_EVENT_TIMEOUT_MS = 3000;

// Expose a single global state for other files
window.__ym = {
  isReady: false,
  isBlocked: false,
  // Safe goal call (will no-op if blocked; optionally you can implement event fallback via Worker)
  reachGoal(goalId, params) {
    if (!window.__ym.isReady || typeof window.ym !== "function") return;
    window.ym(YM_COUNTER_ID, "reachGoal", goalId, params); // reachGoal signature [web:416]
  },
};

const YM_INIT_OPTIONS = {
  webvisor: true,
  clickmap: true,
  accurateTrackBounce: true,
  trackLinks: true,
  triggerEvent: true, // enables yacounter<ID>inited event [web:310]
};

// Minimal tag loader
(function (m, e, t, r, i, k, a) {
  m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
  m[i].l = 1 * new Date();
  k = e.createElement(t);
  a = e.getElementsByTagName(t)[0];
  k.async = 1;
  k.src = r;
  a.parentNode.insertBefore(k, a);
})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

// Init + wait for "ready" event
(function initAndWait() {
  const eventName = `yacounter${YM_COUNTER_ID}inited`; // fired when tag is ready [web:310]

  const onReady = () => {
    window.__ym.isReady = true;
    document.removeEventListener(eventName, onReady);
  };

  document.addEventListener(eventName, onReady);

  // Try to init (if tag.js is blocked, ym may never become functional)
  try {
    window.ym(YM_COUNTER_ID, "init", YM_INIT_OPTIONS); // init supports triggerEvent [web:310]
  } catch (e) {}

  // If ready event didn't fire -> treat as blocked/not ready and use fallback pageview via Worker
  setTimeout(() => {
    if (window.__ym.isReady) return;

    window.__ym.isBlocked = true;

    // Fallback pageview to Worker (same idea as before; keep minimal here)
    fetch(WORKER_TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        client_id: String(Date.now()), // replace with your stable cookie id if you want
        page_url: location.href,
        referrer: document.referrer || "",
        title: document.title || "",
        source: "fallback",
      }),
    }).catch(() => {});
  }, READY_EVENT_TIMEOUT_MS);
})();
