interface LayerFillExerciseProps {
  components: Array<{ name: string; correctLayer: 'entry' | 'service' | 'data' | 'cross' }>;
}

const layerConfig = {
  entry: { label: 'Camada de Entrada', color: '#3B82F6', bgLight: '#DBEAFE' },
  service: { label: 'Camada de Servicos', color: '#0D9488', bgLight: '#CCFBF1' },
  data: { label: 'Camada de Dados', color: '#7C3AED', bgLight: '#EDE9FE' },
  cross: { label: 'Camada Transversal', color: '#6B7280', bgLight: '#F3F4F6' },
} as const;

const layerOrder: Array<'entry' | 'service' | 'data' | 'cross'> = ['entry', 'service', 'data', 'cross'];

export default function LayerFillExercise({ components }: LayerFillExerciseProps) {
  return (
    <div className="my-6 rounded-xl border border-border bg-bg-secondary p-6">
      <h3 className="text-lg font-semibold text-text mb-4">
        Classifique os Componentes
      </h3>
      <p className="text-sm text-text-muted mb-6">
        Arraste cada componente para a camada correta da arquitetura.
      </p>

      {/* Empty layer bands */}
      <div className="space-y-3 mb-6">
        {layerOrder.map((id) => {
          const config = layerConfig[id];
          return (
            <div
              key={id}
              className="flex items-center gap-3 rounded-lg border-2 border-dashed p-4 min-h-16"
              style={{ borderColor: config.color, backgroundColor: `${config.bgLight}40` }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-wider shrink-0 w-36"
                style={{ color: config.color }}
              >
                {config.label}
              </span>
              <div className="flex-1 text-center text-xs text-text-muted italic">
                Solte os componentes aqui
              </div>
            </div>
          );
        })}
      </div>

      {/* Component labels */}
      <div className="flex flex-wrap gap-2">
        {components.map((comp) => (
          <span
            key={comp.name}
            className="px-3 py-1.5 rounded-lg border border-border bg-bg text-sm font-medium text-text cursor-not-allowed opacity-60"
          >
            {comp.name}
          </span>
        ))}
      </div>

      <p className="mt-4 text-xs text-text-muted italic">
        Funcionalidade de arrastar em breve.
      </p>
    </div>
  );
}
