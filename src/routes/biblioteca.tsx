import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PlayCircle, Captions, Languages, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface Video {
  titulo: string;
  duracao: string;
  desc: string;
  transcricao: string;
}

const videos: Video[] = [
  {
    titulo: "Como fazer um inventário físico",
    duracao: "4 min",
    desc: "Passo a passo da contagem de bolas e cones no almoxarifado.",
    transcricao:
      "Neste vídeo, o professor explica como organizar a contagem antes da aula, separar materiais por categoria, registrar quantidades em uma ficha simples e identificar itens que precisam de reposição.",
  },
  {
    titulo: "Etiquetando prateleiras",
    duracao: "3 min",
    desc: "Modelo de etiqueta com alto contraste e fonte legível.",
    transcricao:
      "Apresentação de modelos de etiqueta usando fonte sem serifa, tamanho mínimo recomendado e contraste preto sobre branco. Inclui dicas de posicionamento na altura dos olhos.",
  },
  {
    titulo: "Levantando caixas com segurança",
    duracao: "2 min",
    desc: "Demonstração prática da postura correta.",
    transcricao:
      "Demonstração ergonômica: aproximar-se da caixa, dobrar os joelhos com a coluna reta, segurar firme próximo ao corpo e subir usando as pernas, sem torcer a cintura.",
  },
  {
    titulo: "Manutenção de bolas",
    duracao: "5 min",
    desc: "Calibragem, limpeza e armazenamento.",
    transcricao:
      "Como medir a pressão correta de cada modalidade, limpar com pano úmido e sabão neutro, e armazenar em local seco longe da luz direta para preservar o material.",
  },
];

function Biblioteca() {
  const [aberto, setAberto] = useState<Video | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <Breadcrumbs items={[{ label: "Biblioteca" }]} />
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
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded bg-background/90 px-2 py-1 text-xs font-semibold text-foreground">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  {v.duracao}
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold text-foreground">{v.titulo}</h2>
                <p className="mt-2 text-base text-muted-foreground">{v.desc}</p>
                <button
                  type="button"
                  onClick={() => setAberto(v)}
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

      <Dialog open={!!aberto} onOpenChange={(o) => !o && setAberto(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{aberto?.titulo}</DialogTitle>
            <DialogDescription>{aberto?.desc}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full rounded-lg border-2 border-border bg-secondary p-6 text-center">
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <PlayCircle className="h-16 w-16 text-primary" aria-hidden="true" />
              <p className="text-lg font-bold text-foreground">Vídeo em produção</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Estamos finalizando a gravação com legendas e janela de Libras. Enquanto isso, leia a transcrição abaixo.
              </p>
            </div>
          </div>
          <section aria-labelledby="transcricao-titulo" className="mt-2">
            <h3 id="transcricao-titulo" className="text-base font-bold text-foreground">
              Transcrição
            </h3>
            <p className="mt-2 text-sm text-foreground">{aberto?.transcricao}</p>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
}
