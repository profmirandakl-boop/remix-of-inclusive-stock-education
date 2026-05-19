import { createFileRoute } from "@tanstack/react-router";
import { PlayCircle, Captions, Languages } from "lucide-react";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca de Mídias | EstoqueAtivo" },
      { name: "description", content: "Vídeos tutoriais curtos sobre inventário físico, com legendas e janela de intérprete de Libras." },
      { property: "og:title", content: "Biblioteca de Mídias — EstoqueAtivo" },
      { property: "og:description", content: "Vídeos acessíveis com legenda sincronizada e Libras." },
    ],
  }),
  component: Biblioteca,
});

const videos = [
  { titulo: "Como fazer um inventário físico", duracao: "4 min", desc: "Passo a passo da contagem de bolas e cones no almoxarifado." },
  { titulo: "Etiquetando prateleiras", duracao: "3 min", desc: "Modelo de etiqueta com alto contraste e fonte legível." },
  { titulo: "Levantando caixas com segurança", duracao: "2 min", desc: "Demonstração prática da postura correta." },
  { titulo: "Manutenção de bolas", duracao: "5 min", desc: "Calibragem, limpeza e armazenamento." },
];

function Biblioteca() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground">Biblioteca de Mídias</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Vídeos curtos mostrando, na prática, como realizar inventários e organizar o almoxarifado esportivo.
        </p>
        <ul className="mt-4 flex flex-wrap gap-4 text-sm">
          <li className="inline-flex items-center gap-2"><Captions className="h-5 w-5 text-accent" aria-hidden="true" /> Legendas sincronizadas</li>
          <li className="inline-flex items-center gap-2"><Languages className="h-5 w-5 text-accent" aria-hidden="true" /> Janela de Libras (mín. 1/8 da tela)</li>
        </ul>
      </header>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {videos.map((v) => (
          <li key={v.titulo}>
            <article className="overflow-hidden rounded-xl border-2 border-border bg-card">
              <div className="relative aspect-video bg-primary">
                <div className="absolute inset-0 grid place-items-center">
                  <PlayCircle className="h-16 w-16 text-primary-foreground" aria-hidden="true" />
                </div>
                <div className="absolute bottom-3 right-3 grid h-16 w-16 place-items-center rounded-md border-2 border-accent bg-background/90 text-xs font-semibold text-foreground">
                  Libras
                </div>
                <div className="absolute bottom-3 left-3 rounded bg-background/90 px-2 py-1 text-xs font-semibold text-foreground">
                  {v.duracao}
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-foreground">{v.titulo}</h2>
                <p className="mt-2 text-base text-muted-foreground">{v.desc}</p>
                <button
                  type="button"
                  className="mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  aria-label={`Assistir vídeo: ${v.titulo}`}
                >
                  Assistir
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
