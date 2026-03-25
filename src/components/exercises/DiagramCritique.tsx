interface DiagramCritiqueProps {
  problems: Array<{ id: string; description: string; x: number; y: number }>;
  totalProblems: number;
}

export default function DiagramCritique({ problems, totalProblems }: DiagramCritiqueProps) {
  return (
    <div className="my-6 rounded-xl border border-border bg-bg-secondary p-6">
      <h3 className="text-lg font-semibold text-text mb-2">
        Encontre os Problemas
      </h3>
      <p className="text-sm text-text-muted mb-4">
        Clique nos pontos do diagrama onde existem problemas de arquitetura.
        Encontre {totalProblems} problemas.
      </p>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-text">0 / {totalProblems}</span>
        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-layer-entry rounded-full" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Placeholder diagram SVG */}
      <div className="relative rounded-lg border border-border bg-bg overflow-hidden">
        <svg viewBox="0 0 600 400" className="w-full" role="img" aria-label="Architecture diagram with problems to find">
          {/* Background */}
          <rect width="600" height="400" fill="#F9FAFB" />

          {/* Placeholder boxes */}
          <rect x="50" y="30" width="500" height="70" rx="8" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="300" y="70" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="600">
            Camada de Entrada
          </text>

          <rect x="50" y="120" width="500" height="70" rx="8" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.5" />
          <text x="300" y="160" textAnchor="middle" fill="#0D9488" fontSize="14" fontWeight="600">
            Camada de Servicos
          </text>

          <rect x="50" y="210" width="500" height="70" rx="8" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
          <text x="300" y="250" textAnchor="middle" fill="#7C3AED" fontSize="14" fontWeight="600">
            Camada de Dados
          </text>

          <rect x="50" y="300" width="500" height="70" rx="8" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1.5" />
          <text x="300" y="340" textAnchor="middle" fill="#6B7280" fontSize="14" fontWeight="600">
            Camada Transversal
          </text>

          {/* Instruction overlay */}
          <text x="300" y="395" textAnchor="middle" fill="#9CA3AF" fontSize="11">
            Clique para identificar problemas
          </text>
        </svg>
      </div>

      {/* Problem descriptions (hidden in stub) */}
      <div className="hidden">
        {problems.map((p) => (
          <div key={p.id}>
            {p.description} (x: {p.x}, y: {p.y})
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-text-muted italic">
        Funcionalidade interativa em breve.
      </p>
    </div>
  );
}
