import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o EstoqueAtivo | Educação Física Inclusiva" },
      { name: "description", content: "Critérios de acessibilidade, usabilidade e linguagem do MDD EstoqueAtivo, alinhados ao MEC e à EPT." },
      { property: "og:title", content: "Sobre o EstoqueAtivo" },
      { property: "og:description", content: "Defesa teórica do material didático digital acessível." },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="text-4xl font-bold text-foreground">Sobre o portal</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        EstoqueAtivo é um Material Didático Digital (MDD) sobre gestão de estoques esportivos, desenhado para ser hiper-acessível.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-2xl font-bold text-foreground">Para estudantes cegos</h2>
        <p className="text-base text-foreground">
          Diagramação linear e limpa, sem tabelas complexas. Todas as imagens possuem Tag alt descritiva.
          Leitores de tela percorrem o conteúdo de cima para baixo na ordem direta. Tipografia inteiramente sem serifa (Verdana/Arial).
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-foreground">Para estudantes surdos</h2>
        <p className="text-base text-foreground">
          Textos em Linguagem Simples (Plain Language) recomendada pelo MEC, com frases curtas em ordem direta (Sujeito + Verbo + Objeto).
          Isso facilita a tradução automática feita pelo avatar de Libras. Vídeos da biblioteca trazem legendas sincronizadas
          e janela de intérprete humano de Libras ocupando no mínimo 1/8 da tela.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-bold text-foreground">Princípio da EPT</h2>
        <p className="text-base text-foreground">
          O MDD cumpre as diretrizes da Educação Profissional e Tecnológica ao integrar a ciência da Administração
          (gestão, processos, organização de recursos) com a prática da Educação Física (cultura corporal, ergonomia e saúde do trabalhador).
          O estudante técnico aprende a gerir um ambiente de trabalho de forma eficiente, segura e socialmente responsável.
        </p>
      </section>

      <section className="mt-8 rounded-xl border-2 border-primary bg-secondary p-5">
        <h2 className="text-xl font-bold text-foreground">Recursos de acessibilidade ativos</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-foreground">
          <li>Modo de alto contraste (texto amarelo sobre fundo preto).</li>
          <li>Ajuste de tamanho de fonte (de 85% a 150%).</li>
          <li>Atalho "Pular para o conteúdo" para leitores de tela.</li>
          <li>Tradutor de Libras flutuante no canto inferior direito (VLibras).</li>
          <li>Narrador automático com aviso de 10 segundos antes de iniciar.</li>
          <li>Glossário em linguagem simples com termos do material.</li>
        </ul>
      </section>
    </div>
  );
}
