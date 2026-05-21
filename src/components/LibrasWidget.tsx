import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown };
    __vlibrasInstance?: unknown;
  }
}

export function LibrasWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Ensure the VLibras wrapper exists on <body> (once, globally).
    // Rendering it via React can lose the markup on route changes, so we
    // attach it directly to <body> and never remove it.
    let wrapper = document.getElementById("vlibras-root");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "vlibras-root";
      wrapper.innerHTML =
        '<div vw="true" class="enabled">' +
          '<div vw-access-button="true" class="active"></div>' +
          '<div vw-plugin-wrapper="true"><div class="vw-plugin-top-wrapper"></div></div>' +
        '</div>';
      document.body.appendChild(wrapper);
    }

    const init = () => {
      if (!window.VLibras) return;
      if (window.__vlibrasInstance) return; // already initialized
      try {
        window.__vlibrasInstance = new window.VLibras.Widget("https://vlibras.gov.br/app");
      } catch (e) {
        console.error("VLibras init error", e);
      }
    };

    if (window.VLibras) {
      init();
      return;
    }

    const existing = document.getElementById("vlibras-script") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", init);
      return;
    }

    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = init;
    script.onerror = () => console.error("Falha ao carregar o VLibras");
    document.body.appendChild(script);
  }, []);

  return null;
}
