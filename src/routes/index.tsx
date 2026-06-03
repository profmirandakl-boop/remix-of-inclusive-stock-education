import { createFileRoute } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { Search, ArrowRight, ExternalLink, BookCopy } from "lucide-react";
import { AccessibilityBar } from "@/components/educaadmin/AccessibilityBar";
import { BrandEmblem, AxisLegend } from "@/components/educaadmin/BrandEmblem";
import { PostureIllustrations } from "@/components/educaadmin/PostureIllustrations";

const ACTIVE_BREAK_URL =
  "https://www.youtube.com/results?search_query=ginastica+laboral+pausa+ativa+celular";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EducaAdmin — Gestão Integral: Administração, Saúde & Acessibilidade" },
      {
        name: "description",
        content:
          "Objeto de aprendizagem acessível para o Ensino Médio Técnico: gestão de estoque (Curva ABC, FIFO, LIFO), ergonomia e saúde postural, com Libras, narrador e alto contraste.",
      },
    ],
  }),
  component: EducaAdmin,
});

function EducaAdmin() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* ====================== HEADER ====================== */}
      <header className="bg-navy text-navy-foreground shadow-lg">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:text-teal-foreground"
        >
          Pular para o conteúdo
        </a>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Branding */}
            <div className="flex items-center gap-4">
              <BrandEmblem />
              <div className="leading-tight">
                <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">EducaAdmin</p>
                <p className="mt-1 max-w-xs text-[11px] font-semibold uppercase tracking-wide text-teal sm:text-xs">
                  Gestão Integral: Administração, Saúde &amp; Acessibilidade
                </p>
                <div className="mt-2 hidden md:block">
                  <AxisLegend />
                </div>
              </div>
            </div>

            {/* Search */}
            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              className="order-3 w-full md:order-2 md:w-auto md:flex-1 md:max-w-md"
            >
              <label htmlFor="busca" className="sr-only">
                O que você quer aprender hoje?
              </label>
              <div className="flex items-center gap-2 rounded-full border-2 border-navy-foreground/30 bg-navy-foreground px-4 py-2 text-foreground focus-within:border-teal">
                <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                <input
                  id="busca"
                  type="search"
                  placeholder="O que você quer aprender hoje?"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </form>

            {/* Accessibility panel */}
            <div className="order-2 md:order-3">
              <AccessibilityBar />
            </div>
          </div>

          <div className="md:hidden">
            <AxisLegend />
          </div>
        </div>
      </header>

      {/* ====================== MAIN ====================== */}
      <main id="conteudo-principal" className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
          {/* Video */}
          <section aria-labelledby="video-titulo" className="mb-10">
            <h1 id="video-titulo" className="mb-4 text-2xl font-bold sm:text-3xl">
              Introdução à Gestão de Estoque Didático
            </h1>
            <div className="overflow-hidden rounded-2xl border-4 border-navy shadow-xl">
              <div className="aspect-video w-full bg-navy-deep">
                <iframe
                  src="https://www.youtube.com/embed/H5O-BHmkUh4"
                  title="Vídeo: Controle de Estoque — introdução à gestão de estoque didático"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Vídeo: <em>“Controle de Estoque”</em>. Fonte: Canal Blog Abri Minha Empresa / YouTube.
              URL:{" "}
              <a
                href="http://www.youtube.com/watch?v=H5O-BHmkUh4"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-navy underline underline-offset-2 hover:text-teal"
              >
                http://www.youtube.com/watch?v=H5O-BHmkUh4
              </a>
            </p>
          </section>

          {/* Content + QR */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Two text columns */}
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
              {/* Column 1 */}
              <section
                aria-labelledby="col-admin"
                className="rounded-2xl border-2 border-border bg-card p-5"
              >
                <h2 id="col-admin" className="flex items-center gap-2 text-xl font-bold text-navy">
                  <ArrowRight className="h-5 w-5 text-teal" aria-hidden="true" /> Admin/Estoque
                </h2>
                <p className="mt-3 text-base leading-relaxed">
                  A gestão eficiente começa pela classificação dos itens. A{" "}
                  <strong>Curva ABC</strong> separa os materiais por relevância: a classe A reúne os
                  poucos itens de maior valor, enquanto C concentra os de menor impacto financeiro.
                </p>
                <p className="mt-3 text-base leading-relaxed">
                  Para a movimentação dos materiais, dois métodos guiam a saída do estoque. No{" "}
                  <strong>FIFO</strong> (primeiro a entrar, primeiro a sair), os itens mais antigos
                  saem primeiro — ideal para produtos perecíveis. Já o <strong>LIFO</strong> (último
                  a entrar, primeiro a sair) prioriza os itens mais recentes.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Aprofunde-se nos conceitos:{" "}
                  <a
                    href="http://www.youtube.com/watch?v=H5O-BHmkUh4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-navy underline underline-offset-2 hover:text-teal"
                  >
                    controle de estoque na prática
                  </a>
                  .
                </p>
              </section>

              {/* Column 2 */}
              <section
                aria-labelledby="col-saude"
                className="rounded-2xl border-2 border-border bg-card p-5"
              >
                <h2 id="col-saude" className="flex items-center gap-2 text-xl font-bold text-navy">
                  <ArrowRight className="h-5 w-5 text-brand-green" aria-hidden="true" /> Saúde/Ed.
                  Física
                </h2>
                <p className="mt-3 text-base leading-relaxed">
                  Organizar o almoxarifado também é cuidar do corpo. A <strong>Ergonomia</strong>{" "}
                  adapta o posto de trabalho à pessoa, reduzindo esforços ao levantar caixas e ao
                  permanecer sentado por longos períodos.
                </p>
                <p className="mt-3 text-base leading-relaxed">
                  A <strong>Saúde Postural</strong> previne dores e lesões. Manter a coluna ereta,
                  os pés apoiados e fazer pausas ativas combate os efeitos do sedentarismo no dia a
                  dia técnico.
                </p>
                <div className="mt-4">
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    Postura e alongamentos na cadeira
                  </h3>
                  <PostureIllustrations />
                </div>
              </section>
            </div>

            {/* QR Code */}
            <section
              aria-labelledby="qr-titulo"
              className="flex flex-col items-center justify-start gap-4 rounded-2xl border-2 border-navy bg-navy p-6 text-center text-navy-foreground"
            >
              <h2 id="qr-titulo" className="text-lg font-bold uppercase tracking-wide text-teal">
                Leve para o celular
              </h2>
              <a
                href={ACTIVE_BREAK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir rotinas de pausas ativas no celular"
                className="rounded-xl bg-navy-foreground p-4 shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal"
              >
                <QRCodeSVG
                  value={ACTIVE_BREAK_URL}
                  size={168}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#15243f"
                  className="hc-dim h-auto w-full max-w-[168px]"
                />
              </a>
              <p className="text-base font-bold leading-snug">
                ROTINAS DE PAUSAS ATIVAS NO CELULAR
              </p>
              <p className="text-sm text-navy-foreground/80">
                Escaneie com a câmera do celular e leve os exercícios de pausa ativa para qualquer
                lugar.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* ====================== FOOTER ====================== */}
      <footer className="bg-navy-deep text-navy-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center md:flex-row md:px-6 md:text-left">
          <p className="max-w-md text-xs leading-relaxed text-navy-foreground/85">
            © 2026 — Desenvolvido por: <strong>Matheus Miranda de Oliveira</strong> | Material
            Didático Digital: Gestão de Estoque Inclusiva e Saúde Postural
          </p>

          <div className="flex items-center gap-2 text-xs">
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1 rounded border-2 border-navy-foreground/50 px-2 py-1 font-bold tracking-wider"
            >
              CC BY 4.0
            </span>
            <a
              href="https://creativecommons.org/licenses/by/4.0/deed.pt-br"
              target="_blank"
              rel="noopener noreferrer license"
              className="underline underline-offset-2 hover:text-teal"
            >
              Este material é licenciado sob CC BY 4.0
            </a>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal underline underline-offset-2 hover:text-navy-foreground"
          >
            <BookCopy className="h-4 w-4" aria-hidden="true" />
            Catalogação Oficial no PROEDU
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
