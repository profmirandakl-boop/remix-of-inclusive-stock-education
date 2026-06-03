/**
 * Minimalist line illustrations for ergonomic guidance:
 * correct seated posture and chair-bound stretching.
 */

function Figure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure className="flex flex-col items-center gap-2 rounded-lg border-2 border-border bg-secondary/60 p-3">
      <svg
        viewBox="0 0 120 120"
        role="img"
        aria-label={title}
        className="h-24 w-24 text-navy"
        fill="none"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
      <figcaption className="text-center text-xs font-semibold text-foreground">{title}</figcaption>
    </figure>
  );
}

export function PostureIllustrations() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <Figure title="Postura sentada correta">
        {/* chair */}
        <path d="M30 110 V70 H70 M70 110 V70 M70 70 V40" />
        <path d="M30 88 H70" />
        {/* back + head, upright */}
        <circle cx="70" cy="30" r="8" fill="currentColor" stroke="none" />
        <path d="M70 40 V70" />
        {/* thigh + lower leg at 90deg */}
        <path d="M70 70 H92 M92 70 V110" />
      </Figure>

      <Figure title="Tela na altura dos olhos">
        <circle cx="45" cy="28" r="8" fill="currentColor" stroke="none" />
        <path d="M45 38 V72 M45 72 H66 M66 72 V108" />
        <path d="M30 90 H50" />
        {/* monitor at eye level */}
        <rect x="78" y="18" width="26" height="20" rx="2" />
        <path d="M91 38 V46 M82 46 H100" />
      </Figure>

      <Figure title="Alongamento de pescoço">
        <circle cx="60" cy="26" r="8" fill="currentColor" stroke="none" />
        <path d="M60 36 V70 M60 70 H82 M82 70 V108" />
        <path d="M36 92 H64" />
        {/* arm reaching over head */}
        <path d="M60 44 C40 40 38 24 50 22" />
      </Figure>

      <Figure title="Rotação de tronco na cadeira">
        <circle cx="58" cy="26" r="8" fill="currentColor" stroke="none" />
        <path d="M58 36 V70 M58 70 H80 M80 70 V108" />
        <path d="M34 90 H62" />
        {/* twisting arms */}
        <path d="M58 48 H86 M58 54 H34" />
      </Figure>

      <Figure title="Elevação de ombros">
        <circle cx="60" cy="28" r="8" fill="currentColor" stroke="none" />
        <path d="M60 38 V72 M60 72 H82 M82 72 V108" />
        <path d="M36 92 H64" />
        {/* shoulders up */}
        <path d="M44 46 L60 40 L76 46" />
      </Figure>

      <Figure title="Pausa ativa em pé">
        <circle cx="60" cy="22" r="8" fill="currentColor" stroke="none" />
        <path d="M60 32 V72" />
        <path d="M40 24 L60 40 L80 24" />
        <path d="M60 72 L46 108 M60 72 L74 108" />
      </Figure>
    </div>
  );
}
