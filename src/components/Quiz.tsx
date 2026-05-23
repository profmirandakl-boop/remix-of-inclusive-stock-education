import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

export interface QuizQuestion {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}

export function Quiz({ titulo, questoes }: { titulo: string; questoes: QuizQuestion[] }) {
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [enviado, setEnviado] = useState(false);

  const acertos = Object.entries(respostas).filter(
    ([i, r]) => questoes[Number(i)].correta === r,
  ).length;

  function reset() {
    setRespostas({});
    setEnviado(false);
  }

  return (
    <section
      aria-labelledby="quiz-titulo"
      className="mt-12 rounded-2xl border-2 border-primary bg-secondary p-6"
    >
      <h2 id="quiz-titulo" className="text-2xl font-bold text-foreground">
        {titulo}
      </h2>
      <p className="mt-2 text-base text-foreground">
        Teste o que você aprendeu. Escolha uma resposta em cada pergunta.
      </p>

      <ol className="mt-6 space-y-6">
        {questoes.map((q, i) => {
          const escolhida = respostas[i];
          const acertou = enviado && escolhida === q.correta;
          const errou = enviado && escolhida !== undefined && escolhida !== q.correta;
          return (
            <li key={i} className="rounded-lg border-2 border-border bg-background p-4">
              <fieldset>
                <legend className="text-base font-bold text-foreground">
                  {i + 1}. {q.pergunta}
                </legend>
                <ul className="mt-3 space-y-2">
                  {q.opcoes.map((op, j) => {
                    const id = `q${i}-o${j}`;
                    const certaApos = enviado && j === q.correta;
                    return (
                      <li key={j}>
                        <label
                          htmlFor={id}
                          className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md border-2 px-3 py-2 ${
                            certaApos
                              ? "border-primary bg-primary/10"
                              : enviado && escolhida === j
                                ? "border-destructive bg-destructive/10"
                                : "border-border hover:bg-secondary"
                          }`}
                        >
                          <input
                            id={id}
                            type="radio"
                            name={`q-${i}`}
                            value={j}
                            checked={escolhida === j}
                            disabled={enviado}
                            onChange={() => setRespostas((r) => ({ ...r, [i]: j }))}
                            className="h-5 w-5"
                          />
                          <span className="text-base text-foreground">{op}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                {enviado && (
                  <p
                    className="mt-3 flex items-start gap-2 text-sm text-foreground"
                    role="status"
                  >
                    {acertou ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
                    )}
                    <span>
                      <strong>{acertou ? "Correto!" : errou ? "Resposta incorreta." : "Sem resposta."}</strong>{" "}
                      {q.explicacao}
                    </span>
                  </p>
                )}
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {!enviado ? (
          <button
            type="button"
            onClick={() => setEnviado(true)}
            disabled={Object.keys(respostas).length < questoes.length}
            className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 py-2 text-base font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Verificar respostas
          </button>
        ) : (
          <>
            <div
              role="status"
              aria-live="polite"
              className="text-lg font-bold text-foreground"
            >
              Você acertou {acertos} de {questoes.length}.
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-md border-2 border-primary bg-background px-4 py-2 text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Tentar de novo
            </button>
          </>
        )}
      </div>
    </section>
  );
}
