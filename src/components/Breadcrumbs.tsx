import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Trilha de navegação" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <li className="flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded px-2 py-1 hover:bg-secondary hover:text-foreground"
            aria-label="Início"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Início</span>
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            {c.to ? (
              <Link
                to={c.to}
                className="rounded px-2 py-1 hover:bg-secondary hover:text-foreground"
              >
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="px-2 py-1 font-semibold text-foreground">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PrevNext({
  prev,
  next,
}: {
  prev?: { to: string; label: string };
  next?: { to: string; label: string };
}) {
  return (
    <nav
      aria-label="Navegação entre artigos"
      className="mt-12 grid gap-3 border-t-2 border-border pt-6 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          to={prev.to}
          className="rounded-lg border-2 border-border p-4 hover:border-primary hover:bg-secondary"
        >
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            ← Anterior
          </div>
          <div className="mt-1 text-base font-bold text-foreground">{prev.label}</div>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.to}
          className="rounded-lg border-2 border-border p-4 text-right hover:border-primary hover:bg-secondary"
        >
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Próximo →
          </div>
          <div className="mt-1 text-base font-bold text-foreground">{next.label}</div>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
