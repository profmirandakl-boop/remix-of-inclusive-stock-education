import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, Activity, ShieldCheck } from "lucide-react";
import ergonomiaImg from "@/assets/ergonomia.jpg";
import { Breadcrumbs, PrevNext } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/modulo-2")({
  head: () => ({
    meta: [
      { title: "Módulo 2 — Ergonomia e Movimentação | EstoqueAtivo" },
      { name: "description", content: "Saúde do professor ao manipular cargas, com infográficos multimodais e ilustrações dinâmicas." },
      { property: "og:title", content: "Módulo 2 — Ergonomia e Movimentação" },
      { property: "og:description", content: "Ergonomia, postura e segurança no almoxarifado esportivo." },
    ],
  }),
  component: Modulo2,
});

function Modulo2() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <Breadcrumbs items={[{ label: "Módulo 2" }]} />
      <header>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
          Módulo 2
        </span>
        <h1 className="mt-3 text-4xl font-bold text-foreground">Ergonomia e Movimentação</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Cuide da saúde do trabalhador ao manipular caixas e aparelhos pesados.
        </p>
      </header>

      <figure className="mt-8 overflow-hidden rounded-2xl border-4 border-primary">
        <img
          src={ergonomiaImg}
          alt="Desenho técnico mostra pessoa erguendo caixa com a coluna reta. Setas laranja indicam o movimento correto: dobre os joelhos, mantenha a caixa próxima ao corpo e suba com as pernas."
          width={1024}
          height={768}
          className="w-full"
        />
        <figcaption className="bg-secondary p-3 text-sm text-foreground">
          Vetores de direcionalidade explicam o movimento sem depender apenas do texto.
        </figcaption>
      </figure>

      <article className="mt-10 space-y-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <HeartPulse className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-foreground">Postura correta ao levantar peso</h2>
        </div>
        <ol className="ml-5 list-decimal space-y-2 text-base text-foreground">
          <li>Aproxime-se da caixa. Mantenha os pés afastados na largura dos ombros.</li>
          <li>Dobre os joelhos. Mantenha a coluna reta.</li>
          <li>Segure a caixa firme, próxima ao corpo.</li>
          <li>Levante usando a força das pernas. Não use a coluna.</li>
          <li>Gire o corpo inteiro. Não torça a cintura.</li>
        </ol>
      </article>

      <article className="mt-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-foreground">Organização física do almoxarifado</h2>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          Coloque os materiais pesados nas prateleiras do meio, na altura da cintura. Materiais leves ficam acima.
          Mantenha corredores livres com pelo menos 90 cm para permitir a passagem de cadeira de rodas.
          Use etiquetas grandes e contrastantes em todas as caixas.
        </p>
      </article>

      <article className="mt-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-foreground">Equipamentos de proteção</h2>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          Use luvas para movimentar caixas com bordas ásperas. Use calçado fechado e antiderrapante.
          Solicite ajuda para cargas acima de 20 kg. Trabalhe em dupla sempre que possível.
        </p>
      </article>

      <PrevNext
        prev={{ to: "/modulo-1", label: "Módulo 1 — Fundamentos do Estoque" }}
        next={{ to: "/biblioteca", label: "Biblioteca de Mídias" }}
      />
    </div>
  );
}
