import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Contrast, Type, Minus, Plus } from "lucide-react";

export function SiteHeader() {
  const [hc, setHc] = useState(false);
  const [scale, setScale] = useState(100);

  useEffect(() => {
    const stored = localStorage.getItem("a11y");
    if (stored) {
      const v = JSON.parse(stored);
      setHc(!!v.hc);
      setScale(v.scale ?? 100);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", hc);
    document.documentElement.style.setProperty("--user-font-scale", `${scale}%`);
    localStorage.setItem("a11y", JSON.stringify({ hc, scale }));
  }, [hc, scale]);

  const nav = [
    { to: "/", label: "Início" },
    { to: "/modulo-1", label: "Módulo 1" },
    { to: "/modulo-2", label: "Módulo 2" },
    { to: "/biblioteca", label: "Biblioteca" },
    { to: "/sobre", label: "Sobre" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="EstoqueAtivo - Página inicial">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
            EA
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold text-foreground">EstoqueAtivo</div>
            <div className="text-xs text-muted-foreground">Educação Física Inclusiva</div>
          </div>
        </Link>

        <nav aria-label="Navegação principal" className="order-3 w-full md:order-2 md:w-auto">
          <ul className="flex flex-wrap items-center gap-1">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
                  activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-2 flex items-center gap-2 md:order-3" role="group" aria-label="Ferramentas de acessibilidade">
          <button
            type="button"
            onClick={() => setHc((v) => !v)}
            aria-pressed={hc}
            aria-label="Alternar alto contraste"
            className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-md border-2 border-primary bg-background px-3 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Contrast className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">Contraste</span>
          </button>
          <div className="flex items-center gap-1 rounded-md border-2 border-primary p-1">
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(85, s - 10))}
              aria-label="Diminuir tamanho da fonte"
              className="grid h-9 w-9 place-items-center rounded text-primary hover:bg-secondary"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>
            <Type className="h-5 w-5 text-primary" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(150, s + 10))}
              aria-label="Aumentar tamanho da fonte"
              className="grid h-9 w-9 place-items-center rounded text-primary hover:bg-secondary"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
