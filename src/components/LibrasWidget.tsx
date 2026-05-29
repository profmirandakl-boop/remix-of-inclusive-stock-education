import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown };
    __vlibrasInstance?: unknown;
  }
}

const VLIBRAS_SCRIPT_ID = "vlibras-script";
const VLIBRAS_SCRIPT_URL = "https://vlibras.gov.br/app/vlibras-plugin.js";
const VLIBRAS_WIDGET_URL = "https://vlibras.gov.br/app";

function ensureVlibrasMarkup() {
  if (document.getElementById("vlibras-root")) return;

  const root = document.createElement("div");
  root.id = "vlibras-root";
  root.innerHTML =
    '<div vw="true" class="enabled">' +
    '<div vw-access-button="true" class="active"></div>' +
    '<div vw-plugin-wrapper="true"><div class="vw-plugin-top-wrapper"></div></div>' +
    "</div>";
  document.body.appendChild(root);
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

    const existing = document.getElementById(VLIBRAS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      const onLoad = () => init();
      existing.addEventListener("load", onLoad);
      init();
      return () => {
        existing.removeEventListener("load", onLoad);
      };
    }

    const script = document.createElement("script");
    script.id = VLIBRAS_SCRIPT_ID;
    script.src = VLIBRAS_SCRIPT_URL;
    script.async = true;
    script.onload = () => init();
    script.onerror = () => {
      console.error("Falha ao carregar o VLibras");
    };
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  return null;
}
