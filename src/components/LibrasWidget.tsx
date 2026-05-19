import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: { Widget: new (url: string) => unknown };
  }
}

export function LibrasWidget() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = () => {
      if (window.VLibras) {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }
    };

    if (document.getElementById("vlibras-script")) {
      init();
      return;
    }

    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="enabled"
      dangerouslySetInnerHTML={{
        __html:
          '<div vw="true" class="enabled"><div vw-access-button="true" class="active"></div><div vw-plugin-wrapper="true"><div class="vw-plugin-top-wrapper"></div></div></div>',
      }}
    />
  );
}
