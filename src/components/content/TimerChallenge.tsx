interface TimerChallengeProps {
  timeLimit: number;
  challenge: string;
  phases: string[];
}

export default function TimerChallenge({ timeLimit, challenge, phases }: TimerChallengeProps) {
  const minutes = Math.floor(timeLimit / 60);
  const seconds = timeLimit % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="my-6 rounded-xl border border-border bg-bg-secondary p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">Desafio Cronometrado</h3>
        <span className="text-3xl font-mono font-bold text-layer-entry">{display}</span>
      </div>

      {/* Challenge description */}
      <p className="text-sm text-text-muted mb-4">{challenge}</p>

      {/* Phases */}
      <div className="mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          Fases
        </h4>
        <ol className="space-y-2">
          {phases.map((phase, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-layer-entry-light text-layer-entry text-xs font-semibold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {phase}
            </li>
          ))}
        </ol>
      </div>

      {/* Buttons (static, no logic) */}
      <div className="flex gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-layer-entry text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-not-allowed opacity-60"
          disabled
        >
          Iniciar
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-lg border border-border text-text-muted text-sm font-medium cursor-not-allowed opacity-60"
          disabled
        >
          Pausar
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-lg border border-border text-text-muted text-sm font-medium cursor-not-allowed opacity-60"
          disabled
        >
          Resetar
        </button>
      </div>

      <p className="mt-3 text-xs text-text-muted italic">
        Funcionalidade interativa em breve.
      </p>
    </div>
  );
}
