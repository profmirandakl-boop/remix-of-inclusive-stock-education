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

function hasVisibleVlibrasButton() {
  const button = document.querySelector("[vw-access-button]") as HTMLElement | null;
  if (!button) return false;
  const rect = button.getBoundingClientRect();
  const style = window.getComputedStyle(button);
  return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
}

function ensureVlibrasMarkup() {
  let root = document.getElementById("vlibras-root");

  if (!root) {
    root = document.createElement("div");
    root.id = "vlibras-root";
    document.body.appendChild(root);
  }

  if (root.querySelector("[vw]") && root.querySelector("[vw-access-button]") && root.querySelector("[vw-plugin-wrapper]")) {
    return;
  }

  root.innerHTML =
    '<div vw="true" class="enabled">' +
    '<div vw-access-button="true" class="active"></div>' +
    '<div vw-plugin-wrapper="true"><div class="vw-plugin-top-wrapper"></div></div>' +
    "</div>";
  window.__vlibrasInstance = undefined;
}

export function LibrasWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    ensureVlibrasMarkup();

    const init = () => {
      ensureVlibrasMarkup();
      if (!window.VLibras?.Widget) return false;
      if (window.__vlibrasInstance && hasVisibleVlibrasButton()) return true;
      try {
        window.__vlibrasInstance = undefined;
        window.__vlibrasInstance = new window.VLibras.Widget(VLIBRAS_WIDGET_URL);
        return true;
      } catch (e) {
        console.error("VLibras init error", e);
        return false;
      }
    };

    let attempts = 0;
    const retryTimer = window.setInterval(() => {
      attempts += 1;
      const ok = init();
      if ((ok && hasVisibleVlibrasButton()) || attempts >= 50) {
        window.clearInterval(retryTimer);
      }
    }, 500);

    const onPageShow = () => {
      if (!hasVisibleVlibrasButton()) init();
    };
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onPageShow);

    const existing = document.getElementById(VLIBRAS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      const onLoad = () => init();
      existing.addEventListener("load", onLoad);
      init();
      return () => {
        window.clearInterval(retryTimer);
        window.removeEventListener("pageshow", onPageShow);
        document.removeEventListener("visibilitychange", onPageShow);
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
      window.clearInterval(retryTimer);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onPageShow);
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  return null;
}
