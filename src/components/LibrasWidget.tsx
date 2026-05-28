import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown };
    __vlibrasInstance?: unknown;
    __vlibrasInitializing?: boolean;
  }
}

const VLIBRAS_SCRIPT_ID = "vlibras-script";
const VLIBRAS_SCRIPT_URL = "https://vlibras.gov.br/app/vlibras-plugin.js";
const VLIBRAS_WIDGET_URL = "https://vlibras.gov.br/app";

const VLIBRAS_MARKUP =
  '<div vw="true" class="enabled">' +
  '<div vw-access-button="true" class="active"></div>' +
  '<div vw-plugin-wrapper="true"><div class="vw-plugin-top-wrapper"></div></div>' +
  "</div>";

function hasVisibleButton() {
  const btn = document.querySelector('[vw-access-button]');
  if (!btn) return false;
  // The VLibras script injects child content into the access button when ready
  return btn.children.length > 0 || btn.innerHTML.trim().length > 0;
}

function ensureVlibrasMarkup() {
  let wrapper = document.getElementById("vlibras-root");
  let rebuilt = false;

  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "vlibras-root";
    wrapper.innerHTML = VLIBRAS_MARKUP;
    document.body.appendChild(wrapper);
    rebuilt = true;
  } else if (
    !wrapper.querySelector("[vw-access-button]") ||
    !wrapper.querySelector("[vw-plugin-wrapper]")
  ) {
    wrapper.innerHTML = VLIBRAS_MARKUP;
    rebuilt = true;
  }

  if (rebuilt) window.__vlibrasInstance = undefined;
  return wrapper;
}

export function LibrasWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    ensureVlibrasMarkup();

    const init = (force = false) => {
      ensureVlibrasMarkup();
      if (!window.VLibras?.Widget) return false;
      if (window.__vlibrasInstance && !force && hasVisibleButton()) return true;
      try {
        window.__vlibrasInstance = new window.VLibras.Widget(VLIBRAS_WIDGET_URL);
        return true;
      } catch (e) {
        console.error("VLibras init error", e);
        return false;
      }
    };

    const tryInit = () => init(false);
    tryInit();

    // Poll for up to ~30s to handle slow CDN, cached-script races, and
    // cases where the widget script loaded but didn't render the button.
    let attempts = 0;
    const maxAttempts = 60;
    const retryTimer = window.setInterval(() => {
      attempts += 1;
      ensureVlibrasMarkup();
      if (window.VLibras?.Widget && !hasVisibleButton()) {
        init(true);
      } else if (hasVisibleButton()) {
        window.clearInterval(retryTimer);
        window.__vlibrasInitializing = false;
      }
      if (attempts >= maxAttempts) {
        window.clearInterval(retryTimer);
        window.__vlibrasInitializing = false;
      }
    }, 500);

    window.__vlibrasInitializing = true;

    // Re-check when tab becomes visible again
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        ensureVlibrasMarkup();
        if (!hasVisibleButton()) init(true);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const existing = document.getElementById(VLIBRAS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      const onLoad = () => init(true);
      existing.addEventListener("load", onLoad, { once: true });
      // Script tag exists but VLibras global may already be ready
      if (window.VLibras?.Widget) init(true);
      return () => {
        window.clearInterval(retryTimer);
        existing.removeEventListener("load", onLoad);
        document.removeEventListener("visibilitychange", onVisibility);
        window.__vlibrasInitializing = false;
      };
    }

    const script = document.createElement("script");
    script.id = VLIBRAS_SCRIPT_ID;
    script.src = VLIBRAS_SCRIPT_URL;
    script.async = true;
    script.onload = () => init(true);
    script.onerror = () => {
      window.clearInterval(retryTimer);
      window.__vlibrasInitializing = false;
      console.error("Falha ao carregar o VLibras");
    };
    document.body.appendChild(script);

    return () => {
      window.clearInterval(retryTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      script.onload = null;
      script.onerror = null;
      window.__vlibrasInitializing = false;
    };
  }, []);

  return null;
}
