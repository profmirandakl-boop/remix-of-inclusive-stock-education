import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const Route = createFileRoute("/glossario")({
  head: () => ({
    meta: [
      { title: "Glossário | EstoqueAtivo" },
      {
        name: "description",
        content:
          "Definições simples dos termos técnicos usados no material: giro de estoque, almoxarifado, EPT, ergonomia e mais.",
      },
      { property: "og:title", content: "Glossário — EstoqueAtivo" },
      {
        property: "og:description",
        content: "Dicionário em linguagem simples dos termos do material didático.",
      },
    ],
  }),
  component: Glossario,
});

const termos: { termo: string; definicao: string }[] = [
  {
    termo: "Almoxarifado",
    definicao:
      "Sala ou armário onde os materiais esportivos ficam guardados. É o estoque físico da escola.",
  },
  {
    termo: "Giro de estoque",
    definicao:
      "Mede quantas vezes um material sai e volta ao almoxarifado em um período. Giro alto significa muito uso.",
  },
  {
    termo: "EPT",
    definicao:
      "Educação Profissional e Tecnológica. Forma estudantes para o trabalho técnico, unindo teoria e prática.",
  },
  {
    termo: "Ergonomia",
    definicao:
      "Ciência que estuda como adaptar o trabalho ao corpo humano para evitar dores e lesões.",
  },
  {
    termo: "Inventário",
    definicao:
      "Contagem completa de todos os materiais do almoxarifado em uma data específica.",
  },
  {
    termo: "MDD",
    definicao:
      "Material Didático Digital. Conteúdo educativo feito para ser usado em telas, com recursos de acessibilidade.",
  },
  {
    termo: "Libras",
    definicao:
      "Língua Brasileira de Sinais. Idioma oficial da comunidade surda no Brasil.",
  },
  {
    termo: "EPI",
    definicao:
      "Equipamento de Proteção Individual. Itens como luvas e calçado fechado que protegem o corpo no trabalho.",
  },
  {
    termo: "Manutenção preventiva",
    definicao:
      "Cuidado feito antes de o material quebrar. Aumenta a vida útil dos equipamentos.",
  },
  {
    termo: "Linguagem simples",
    definicao:
      "Forma de escrever clara e direta, recomendada pelo MEC. Usa frases curtas em ordem direta.",
  },
];

function Glossario() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Breadcrumbs items={[{ label: "Glossário" }]} />
      <h1 className="text-4xl font-bold text-foreground">Glossário</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Definições simples dos termos técnicos usados no portal. Organizados em ordem alfabética.
      </p>

      <dl className="mt-10 space-y-6">
        {termos
          .slice()
          .sort((a, b) => a.termo.localeCompare(b.termo, "pt-BR"))
          .map((t) => (
            <div
              key={t.termo}
              className="rounded-lg border-2 border-border bg-card p-5"
            >
              <dt className="text-xl font-bold text-foreground">{t.termo}</dt>
              <dd className="mt-2 text-base text-foreground">{t.definicao}</dd>
            </div>
          ))}
      </dl>
    </div>
  );
}
