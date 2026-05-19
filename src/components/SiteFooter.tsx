export function SiteFooter() {
  return (
    <footer className="mt-16 border-t-2 border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <div className="text-lg font-bold text-foreground">EstoqueAtivo</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Material Didático Digital sobre gestão de estoques esportivos, com foco em acessibilidade e formação integral.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">Recursos</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Tradução automática em Libras</li>
            <li>Alto contraste e zoom de fonte</li>
            <li>Tag alt em todas as imagens</li>
            <li>Tipografia sem serifa (Verdana)</li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-foreground">Princípio EPT</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Integra Administração e Educação Física para formar técnicos capazes de gerir ambientes de trabalho de forma eficiente, segura e socialmente responsável.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EstoqueAtivo. Conteúdo educacional acessível.
      </div>
    </footer>
  );
}
