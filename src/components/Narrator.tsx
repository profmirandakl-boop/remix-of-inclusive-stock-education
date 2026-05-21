import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Play, Square } from "lucide-react";

type Status = "idle" | "playing" | "paused";

export function Narrator() {
  const [status, setStatus] = useState<Status>("idle");
  const [supported, setSupported] = useState(true);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const pt =
        voices.find((v) => v.lang?.toLowerCase().startsWith("pt-br")) ||
        voices.find((v) => v.lang?.toLowerCase().startsWith("pt")) ||
        voices[0] ||
        null;
      setVoice(pt);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const getPageText = () => {
    const main = document.getElementById("conteudo-principal");
    if (!main) return "";
    // Clone and strip non-content nodes
    const clone = main.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("script, style, [aria-hidden='true']").forEach((n) => n.remove());
    // Use alt text for images
    clone.querySelectorAll("img").forEach((img) => {
      const alt = img.getAttribute("alt");
      if (alt) {
        const span = document.createElement("span");
        span.textContent = ` Imagem: ${alt}. `;
        img.replaceWith(span);
      } else {
        img.remove();
      }
    });
    return (clone.innerText || "").replace(/\s+/g, " ").trim();
  };

  const play = () => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const text = getPageText();
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    if (voice) utter.voice = voice;
    utter.lang = voice?.lang || "pt-BR";
    utter.rate = 1;
    utter.pitch = 1;
    utter.onend = () => setStatus("idle");
    utter.onerror = () => setStatus("idle");
    utteranceRef.current = utter;
    synth.speak(utter);
    setStatus("playing");
  };

  const pauseResume = () => {
    const synth = window.speechSynthesis;
    if (status === "playing") {
      synth.pause();
      setStatus("paused");
    } else if (status === "paused") {
      synth.resume();
      setStatus("playing");
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setStatus("idle");
  };

  if (!supported) return null;

  return (
    <div
      role="region"
      aria-label="Narrador da página para deficientes visuais"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full border-2 border-primary bg-background p-2 shadow-lg"
    >
      {status === "idle" ? (
        <button
          type="button"
          onClick={play}
          aria-label="Iniciar leitura da página em voz alta"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Volume2 className="h-5 w-5" aria-hidden="true" />
          <span>Ouvir página</span>
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={pauseResume}
            aria-label={status === "playing" ? "Pausar leitura" : "Retomar leitura"}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {status === "playing" ? (
              <Pause className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5" aria-hidden="true" />
            )}
            <span>{status === "playing" ? "Pausar" : "Continuar"}</span>
          </button>
          <button
            type="button"
            onClick={stop}
            aria-label="Parar leitura"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-primary bg-background text-primary hover:bg-secondary"
          >
            <Square className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
