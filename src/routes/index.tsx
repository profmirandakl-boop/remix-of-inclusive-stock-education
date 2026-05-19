import { createFileRoute, Link } from "@tanstack/react-router";
import { Boxes, Layers, HeartPulse, PlayCircle, Accessibility, Languages, Eye } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import heroImg from "@/assets/hero-inclusive.jpg";
import inventarioImg from "@/assets/inventario.jpg";
import classificacaoImg from "@/assets/classificacao.jpg";
import ergonomiaImg from "@/assets/ergonomia.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EstoqueAtivo — Portal de gestão de estoques esportivos acessível" },
      { name: "description", content: "Estude gestão de estoques esportivos com linguagem simples, alto contraste, Libras e infográficos acessíveis." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="border-b-2 border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
              <Accessibility className="h-4 w-4" aria-hidden="true" /> Material Didático Digital
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Gestão de estoques esportivos, acessível para todos.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Artigos, infográficos e vídeos sobre giro de estoque, classificação de materiais e ergonomia no almoxarifado.
              Conteúdo em linguagem simples, com alto contraste, ajuste de fonte e tradução em Libras.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/modulo-1"
                className="inline-flex min-h-12 items-center rounded-md bg-primary px-5 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Começar pelo Módulo 1
              </Link>
              <Link
                to="/biblioteca"
                className="inline-flex min-h-12 items-center rounded-md border-2 border-primary px-5 py-3 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Ver biblioteca de vídeos
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-4 text-sm text-foreground">
              <li className="inline-flex items-center gap-2"><Eye className="h-4 w-4 text-accent" aria-hidden="true" /> Alto contraste</li>
              <li className="inline-flex items-center gap-2"><Languages className="h-4 w-4 text-accent" aria-hidden="true" /> Tradução em Libras</li>
              <li className="inline-flex items-center gap-2"><Accessibility className="h-4 w-4 text-accent" aria-hidden="true" /> Leitor de tela</li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl border-4 border-primary">
            <img
              src={heroImg}
              alt="Duas pessoas organizam um estoque de materiais esportivos: uma em pé e outra em cadeira de rodas, ambas olhando para frente."
              width={1536}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="modulos-titulo" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="modulos-titulo" className="text-3xl font-bold text-foreground">
              Conteúdo organizado em blocos
            </h2>
            <p className="mt-2 text-muted-foreground">
              Diagramação linear, sem tabelas complexas. Leitores de tela percorrem de cima para baixo.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ArticleCard
            to="/modulo-1"
            tag="Módulo 1"
            title="Giro de estoque esportivo"
            description="Entenda como medir o giro de bolas, coletes e aparelhos e por que ele importa na escola."
            image={inventarioImg}
            imageAlt="Almoxarifado esportivo organizado com prateleiras etiquetadas contendo bolas coloridas, cones e cordas."
            icon={Boxes}
          />
          <ArticleCard
            to="/modulo-1"
            tag="Módulo 1"
            title="Classificação de materiais"
            description="Critérios para separar bolas, coletes e aparelhos de ginástica em categorias claras."
            image={classificacaoImg}
            imageAlt="Diagrama com ícones agrupando categorias de materiais esportivos: bolas, coletes e aparelhos."
            icon={Layers}
          />
          <ArticleCard
            to="/modulo-2"
            tag="Módulo 2"
            title="Organização física do almoxarifado"
            description="Setas e linhas de força indicam a postura correta ao levantar caixas pesadas de equipamentos."
            image={ergonomiaImg}
            imageAlt="Ilustração técnica de pessoa erguendo uma caixa, com setas laranja indicando a direção correta do movimento da coluna."
            icon={HeartPulse}
          />
          <ArticleCard
            to="/modulo-2"
            tag="Módulo 2"
            title="Ergonomia e saúde do trabalhador"
            description="Como prevenir lesões na manipulação de cargas no dia a dia do professor."
            image={ergonomiaImg}
            imageAlt="Infográfico mostrando postura correta da coluna ao levantar peso, com setas direcionais."
            icon={HeartPulse}
          />
          <ArticleCard
            to="/biblioteca"
            tag="Biblioteca"
            title="Tutoriais em vídeo"
            description="Vídeos curtos com legenda sincronizada e janela de intérprete de Libras."
            image={inventarioImg}
            imageAlt="Prateleiras de almoxarifado com materiais esportivos organizados por categoria."
            icon={PlayCircle}
          />
          <ArticleCard
            to="/sobre"
            tag="Sobre"
            title="Princípio da EPT"
            description="Como o portal integra Administração e Educação Física na formação técnica."
            image={classificacaoImg}
            imageAlt="Composição de ícones representando integração entre administração e educação física."
            icon={Accessibility}
          />
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-3 md:px-6">
          <div>
            <Eye className="h-8 w-8 text-accent" aria-hidden="true" />
            <h3 className="mt-3 text-xl font-bold">Para estudantes cegos</h3>
            <p className="mt-2 text-base opacity-90">
              Todas as imagens possuem texto alternativo descritivo. Tipografia sem serifa (Verdana) e ordem direta de leitura.
            </p>
          </div>
          <div>
            <Languages className="h-8 w-8 text-accent" aria-hidden="true" />
            <h3 className="mt-3 text-xl font-bold">Para estudantes surdos</h3>
            <p className="mt-2 text-base opacity-90">
              Linguagem simples (Plain Language) facilita tradução automática em Libras. Vídeos com legenda sincronizada.
            </p>
          </div>
          <div>
            <Accessibility className="h-8 w-8 text-accent" aria-hidden="true" />
            <h3 className="mt-3 text-xl font-bold">Formação integral (EPT)</h3>
            <p className="mt-2 text-base opacity-90">
              Une gestão administrativa, cultura corporal e ergonomia em um único material didático digital.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
