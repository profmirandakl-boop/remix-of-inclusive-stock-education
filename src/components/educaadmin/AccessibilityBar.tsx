import { useEffect, useState } from "react";
import { Hand, Volume2, Square, Plus, Minus, Contrast } from "lucide-react";

const STORAGE_KEY = "educaadmin-a11y";

export function AccessibilityBar() {
  const [scale, setScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [librasOn, setLibrasOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Load persisted preferences
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const v = JSON.parse(raw);
        setScale(typeof v.scale === "number" ? v.scale : 100);
        setHighContrast(!!v.highContrast);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Apply font scale + contrast to the document and persist
  useEffect(() => {
    document.documentElement.style.setProperty("--user-font-scale", `${scale}%`);
    document.documentElement.classList.toggle("high-contrast", highContrast);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ scale, highContrast }));
    } catch {
      /* ignore */
    }
  }, [scale, highContrast]);

  // Stop narration on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleLibras = () => {
    const btn = document.querySelector<HTMLElement>("[vw-access-button]");
    if (btn) {
      btn.click();
      setLibrasOn((v) => !v);
    } else {
      setLibrasOn((v) => !v);
    }
  };

  const toggleNarrator = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const main = document.getElementById("conteudo-principal");
    const text = (main?.innerText || document.body.innerText || "").trim();
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text.slice(0, 6000));
    utter.lang = "pt-BR";
    utter.rate = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    synth.cancel();
    synth.speak(utter);
    setSpeaking(true);
  };

  const btnBase =
    "inline-flex min-h-11 items-center gap-2 rounded-md border-2 px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-none";

  return (
    <div
      role="group"
      aria-label="Painel de controle de acessibilidade"
      className="flex flex-wrap items-center justify-end gap-2"
    >
      {/* Libras */}
      <button
        type="button"
        onClick={toggleLibras}
        aria-pressed={librasOn}
        className={`${btnBase} ${
          librasOn
            ? "border-teal bg-teal text-teal-foreground"
            : "border-navy-foreground/40 bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20"
        }`}
        title="Ativar tradução em Libras"
      >
        <Hand className="h-5 w-5" aria-hidden="true" />
        <span className="hidden lg:inline">Ativar Libras</span>
      </button>

      {/* Narrador */}
      <button
        type="button"
        onClick={toggleNarrator}
        aria-pressed={speaking}
        className={`${btnBase} ${
          speaking
            ? "border-brand-green bg-brand-green text-navy-foreground"
            : "border-navy-foreground/40 bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20"
        }`}
        title="Ouvir conteúdo (narrador)"
      >
        {speaking ? (
          <Square className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Volume2 className="h-5 w-5" aria-hidden="true" />
        )}
        <span className="hidden lg:inline">{speaking ? "Parar narração" : "Ouvir conteúdo"}</span>
      </button>

      {/* Fonte */}
      <div
        className="flex items-center gap-1 rounded-md border-2 border-navy-foreground/40 bg-navy-foreground/10 p-1"
        role="group"
        aria-label="Tamanho da fonte"
      >
        <button
          type="button"
          onClick={() => setScale((s) => Math.max(85, s - 10))}
          aria-label="Diminuir fonte"
          className="grid h-9 w-9 place-items-center rounded text-navy-foreground hover:bg-navy-foreground/20"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <span aria-hidden="true" className="px-1 text-sm font-bold text-navy-foreground">
          A
        </span>
        <button
          type="button"
          onClick={() => setScale((s) => Math.min(160, s + 10))}
          aria-label="Aumentar fonte"
          className="grid h-9 w-9 place-items-center rounded text-navy-foreground hover:bg-navy-foreground/20"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Alto contraste */}
      <button
        type="button"
        onClick={() => setHighContrast((v) => !v)}
        aria-pressed={highContrast}
        className={`${btnBase} ${
          highContrast
            ? "border-foreground bg-foreground text-background"
            : "border-navy-foreground/40 bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20"
        }`}
        title="Alto contraste (amarelo neon)"
      >
        <Contrast className="h-5 w-5" aria-hidden="true" />
        <span className="hidden lg:inline">Alto contraste</span>
      </button>
    </div>
  );
}
