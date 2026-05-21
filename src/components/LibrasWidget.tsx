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

    const init = () => {
      ensureVlibrasMarkup();
      if (!window.VLibras?.Widget) return false;
      if (window.__vlibrasInstance) return true;
      try {
        window.__vlibrasInstance = new window.VLibras.Widget(VLIBRAS_WIDGET_URL);
        return true;
      } catch (e) {
        console.error("VLibras init error", e);
        return false;
      }
    };

    if (init()) {
      return;
    }

    if (window.__vlibrasInitializing) {
      return;
    }

    window.__vlibrasInitializing = true;
    let attempts = 0;
    const retryTimer = window.setInterval(() => {
      attempts += 1;
      if (init() || attempts >= 20) {
        window.clearInterval(retryTimer);
        window.__vlibrasInitializing = false;
      }
    }, 500);

    const existing = document.getElementById(VLIBRAS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", init, { once: true });
      return () => {
        window.clearInterval(retryTimer);
        existing.removeEventListener("load", init);
        window.__vlibrasInitializing = false;
      };
    }

    const script = document.createElement("script");
    script.id = VLIBRAS_SCRIPT_ID;
    script.src = VLIBRAS_SCRIPT_URL;
    script.async = true;
    script.onload = init;
    script.onerror = () => {
      window.clearInterval(retryTimer);
      window.__vlibrasInitializing = false;
      console.error("Falha ao carregar o VLibras");
    };
    document.body.appendChild(script);

    return () => {
      window.clearInterval(retryTimer);
      script.onload = null;
      script.onerror = null;
      window.__vlibrasInitializing = false;
    };
  }, []);

  return null;
}
