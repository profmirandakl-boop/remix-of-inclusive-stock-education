import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Layers, Wrench } from "lucide-react";
import inventarioImg from "@/assets/inventario.jpg";
import classificacaoImg from "@/assets/classificacao.jpg";
import { Breadcrumbs, PrevNext } from "@/components/Breadcrumbs";
import { Quiz } from "@/components/Quiz";

export const Route = createFileRoute("/modulo-1")({
  head: () => ({
    meta: [
      { title: "Módulo 1 — Fundamentos do Estoque Esportivo | EstoqueAtivo" },
      { name: "description", content: "Aprenda giro de estoque, classificação de materiais e manutenção em educação física." },
      { property: "og:title", content: "Módulo 1 — Fundamentos do Estoque Esportivo" },
      { property: "og:description", content: "Artigos em blocos curtos sobre gestão de estoque esportivo." },
    ],
  }),
  component: Modulo1,
});

function Modulo1() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <Breadcrumbs items={[{ label: "Módulo 1" }]} />
      <header>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
          Módulo 1
        </span>
        <h1 className="mt-3 text-4xl font-bold text-foreground">Fundamentos do Estoque Esportivo</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Conceitos essenciais para começar. Cada bloco é curto e direto, na ordem Sujeito + Verbo + Objeto.
        </p>
      </header>

      <article className="mt-10 space-y-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <Boxes className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-foreground">O que é giro de estoque</h2>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          O giro de estoque mede quantas vezes um material sai e volta ao almoxarifado em um período.
          Bolas de futebol usadas todas as aulas têm giro alto. Aparelhos de ginástica artística usados em projetos têm giro baixo.
          Saber o giro ajuda o professor a comprar na hora certa e evitar falta de material.
        </p>
        <img
          src={inventarioImg}
          alt="Almoxarifado esportivo com prateleiras etiquetadas e materiais organizados por frequência de uso."
          width={1024}
          height={768}
          loading="lazy"
          className="w-full rounded-xl border-2 border-border"
        />
      </article>

      <article className="mt-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <Layers className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-foreground">Classificação de materiais</h2>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          Separe os materiais em três grupos principais: bolas, coletes e aparelhos de ginástica.
          Use etiquetas grandes, com fonte sem serifa e símbolos visuais.
          Essa classificação acelera a busca durante a aula e facilita o inventário.
        </p>
        <img
          src={classificacaoImg}
          alt="Diagrama de classificação de materiais: bolas, coletes e aparelhos representados por ícones."
          width={1024}
          height={768}
          loading="lazy"
          className="w-full rounded-xl border-2 border-border"
        />
      </article>

      <article className="mt-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <Wrench className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-foreground">Importância da manutenção</h2>
        </div>
        <p className="text-base leading-relaxed text-foreground">
          A manutenção preventiva aumenta a vida útil dos materiais.
          Verifique a calibragem das bolas toda semana. Lave os coletes com regularidade. Confira parafusos dos aparelhos antes de cada uso.
          Anote tudo em uma ficha simples de controle.
        </p>
      </article>

      <Quiz
        titulo="Exercício: Fixe os conceitos do Módulo 1"
        questoes={[
          {
            pergunta: "O que mede o giro de estoque?",
            opcoes: [
              "O preço pago em cada material novo.",
              "Quantas vezes um material sai e volta ao almoxarifado em um período.",
              "O peso total do almoxarifado.",
              "O número de alunos por turma.",
            ],
            correta: 1,
            explicacao:
              "Giro de estoque mede a frequência de uso. Materiais com giro alto são usados em quase todas as aulas.",
          },
          {
            pergunta: "Qual é a melhor prática ao etiquetar prateleiras?",
            opcoes: [
              "Letra cursiva pequena para caber mais texto.",
              "Cores claras sobre fundo claro.",
              "Fonte sem serifa, grande e com bom contraste.",
              "Apenas códigos numéricos, sem palavras.",
            ],
            correta: 2,
            explicacao:
              "Etiquetas legíveis usam fonte sem serifa, tamanho grande e contraste forte para ajudar pessoas com baixa visão.",
          },
          {
            pergunta: "Por que a manutenção preventiva é importante?",
            opcoes: [
              "Substitui o inventário anual.",
              "Aumenta a vida útil dos materiais e evita acidentes.",
              "Diminui o número de aulas.",
              "Serve apenas para bolas de futebol.",
            ],
            correta: 1,
            explicacao:
              "Manutenção preventiva como calibrar bolas e checar parafusos prolonga o uso e mantém o ambiente seguro.",
          },
        ]}
      />

      <PrevNext
        next={{ to: "/modulo-2", label: "Módulo 2 — Ergonomia e Movimentação" }}
      />
    </div>
  );
}
