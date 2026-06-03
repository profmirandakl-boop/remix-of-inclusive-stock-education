import emblem from "@/assets/educaadmin-emblem.png";

const AXES = [
  { label: "Administração", className: "left-0 top-2" },
  { label: "Educação Física", className: "right-0 top-2" },
  { label: "Inclusão & Acessibilidade", className: "left-0 bottom-2" },
  { label: "Gestão de Estoque", className: "right-0 bottom-2" },
] as const;

export function BrandEmblem() {
  return (
    <div className="relative shrink-0">
      <div className="grid h-24 w-24 place-items-center rounded-full bg-navy-foreground p-1 sm:h-28 sm:w-28">
        <img
          src={emblem}
          alt="Emblema EducaAdmin: círculo com três figuras humanas saindo de caixas de estoque e um coração com linha de pulso vital, representando os eixos Administração, Educação Física, Inclusão e Gestão de Estoque."
          width={1024}
          height={1024}
          className="hc-dim h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

export function AxisLegend() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-semibold uppercase tracking-wide text-navy-foreground/85">
      {AXES.map((a) => (
        <li key={a.label} className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
          {a.label}
        </li>
      ))}
    </ul>
  );
}
