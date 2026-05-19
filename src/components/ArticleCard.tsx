import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

interface Props {
  to: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  tag?: string;
}

export function ArticleCard({ to, title, description, image, imageAlt, icon: Icon, tag }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border-2 border-border bg-card transition-colors hover:border-primary focus-within:border-primary">
      <div className="aspect-video w-full overflow-hidden bg-secondary">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          {tag && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-accent-foreground">
              {tag}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-base text-muted-foreground">{description}</p>
        <Link
          to={to}
          className="mt-auto inline-flex min-h-11 w-fit items-center rounded-md border-2 border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          aria-label={`Ler artigo: ${title}`}
        >
          Ler artigo →
        </Link>
      </div>
    </article>
  );
}
