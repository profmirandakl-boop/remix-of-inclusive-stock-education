import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Play, Square, X } from "lucide-react";

type Status = "idle" | "playing" | "paused";

const getPreferredPortugueseVoice = (voices: SpeechSynthesisVoice[]) => {
  if (!voices || voices.length === 0) return null;
  const normalized = voices.map((voice) => ({
    voice,
    lang: (voice.lang || "").toLowerCase().replace("_", "-"),
    name: (voice.name || "").toLowerCase(),
  }));

  const ptBr = normalized.filter(({ lang }) => lang === "pt-br" || lang.startsWith("pt-br"));
  const pt = normalized.filter(({ lang }) => lang.startsWith("pt"));

  // Order of preference: known good natural Brazilian Portuguese voices
  const preferredNames = [
    "google português do brasil",
    "google portugues do brasil",
    "google português (brasil)",
    "microsoft francisca",
    "microsoft antonio",
    "microsoft daniel",
    "microsoft maria",
    "luciana",
    "felipe",
    "joana",
    "fernanda",
    "ricardo",
    "vitoria",
    "vitória",
    "google",
    "microsoft",
  ];

  const pick = (list: typeof normalized) => {
    for (const key of preferredNames) {
      const found = list.find(({ name }) => name.includes(key));
      if (found) return found.voice;
    }
    return list[0]?.voice || null;
  };

  return pick(ptBr) || pick(pt) || null;
};


export function Narrator() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [supported, setSupported] = useState(true);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const selected = getPreferredPortugueseVoice(voices);
      if (selected) {
        setVoice(selected);
        console.log("[Narrator] Voz selecionada:", selected.name, selected.lang);
      } else if (voices.length > 0) {
        setVoice(voices[0]);
        console.log("[Narrator] Fallback voz:", voices[0].name, voices[0].lang);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    const t1 = window.setTimeout(loadVoices, 700);
    const t2 = window.setTimeout(loadVoices, 1500);
    const t3 = window.setTimeout(loadVoices, 3000);
    const dismissed = sessionStorage.getItem("narrator-prompt-dismissed");
    if (!dismissed) setShowPrompt(true);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.speechSynthesis.cancel();
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const resolveVoice = () => {
    if (voice) return voice;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const v = getPreferredPortugueseVoice(window.speechSynthesis.getVoices());
    if (v) setVoice(v);
    return v;
  };

  // Speak helper for arbitrary text (used for the countdown announcement)
  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    const v = resolveVoice();
    if (v) utter.voice = v;
    utter.lang = "pt-BR";
    utter.rate = 0.95;
    utter.pitch = 1;
    synth.speak(utter);
  };


  // Countdown effect + narrate the warning message
  useEffect(() => {
    if (!showPrompt) return;
    setCountdown(10);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setTimeout(() => {
        speak(
          "Atenção. O narrador automático irá iniciar após a contagem de 10 segundos. " +
            "Toque em 'Ouvir agora' para começar imediatamente, ou em 'Continuar navegando sem narrador' para dispensar.",
        );
      }, 250);
    }

    timerRef.current = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setShowPrompt(false);
          sessionStorage.setItem("narrator-prompt-dismissed", "1");
          const startWhenFree = () => {
            if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
              setTimeout(startWhenFree, 300);
            } else {
              play();
            }
          };
          setTimeout(startWhenFree, 200);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPrompt, voice]);

  const getPageText = () => {
    const main = document.getElementById("conteudo-principal");
    if (!main) return "";
    const clone = main.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("script, style, [aria-hidden='true']").forEach((n) => n.remove());
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
    if (!supported || typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const text = getPageText();
    if (!text) return;
    const utter = new SpeechSynthesisUtterance(text);
    if (voice) utter.voice = voice;
    utter.lang = "pt-BR";
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

  const listenNow = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setShowPrompt(false);
    sessionStorage.setItem("narrator-prompt-dismissed", "1");
    play();
  };

  const dismissPrompt = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setShowPrompt(false);
    sessionStorage.setItem("narrator-prompt-dismissed", "1");
  };

  if (!mounted || !supported) return null;

  return (
    <>
      {showPrompt && (
        <div
          role="alertdialog"
          aria-labelledby="narrator-prompt-title"
          aria-describedby="narrator-prompt-desc"
          className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-xl rounded-2xl border-4 border-primary bg-background p-5 shadow-2xl md:inset-x-auto md:right-6 md:left-auto"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Volume2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2
                id="narrator-prompt-title"
                className="text-lg font-bold uppercase text-foreground"
              >
                O narrador automático irá iniciar após a contagem de{" "}
                <span aria-live="polite" className="text-accent">
                  {countdown}
                </span>{" "}
                segundos
              </h2>
              <p id="narrator-prompt-desc" className="mt-1 text-sm text-muted-foreground">
                Voltado para pessoas com deficiência visual. Você pode iniciar agora ou continuar
                sem narração.
              </p>
            </div>
            <button
              type="button"
              onClick={dismissPrompt}
              aria-label="Fechar aviso do narrador"
              className="grid h-9 w-9 place-items-center rounded-md text-foreground hover:bg-secondary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={listenNow}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-base font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              Ouvir agora
            </button>
            <button
              type="button"
              onClick={dismissPrompt}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-md border-2 border-primary px-4 py-2 text-base font-bold text-primary hover:bg-secondary"
            >
              Continuar navegando sem narrador
            </button>
          </div>
        </div>
      )}

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
    </>
  );
}
