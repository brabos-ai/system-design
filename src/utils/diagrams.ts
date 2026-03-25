export type LayerId = 'entry' | 'service' | 'data' | 'cross';

export const LAYER_COLORS: Record<LayerId, { bg: string; bgLight: string; border: string; text: string }> = {
  entry: { bg: '#3B82F6', bgLight: '#DBEAFE', border: '#2563EB', text: '#FFFFFF' },
  service: { bg: '#0D9488', bgLight: '#CCFBF1', border: '#0F766E', text: '#FFFFFF' },
  data: { bg: '#7C3AED', bgLight: '#EDE9FE', border: '#6D28D9', text: '#FFFFFF' },
  cross: { bg: '#6B7280', bgLight: '#F3F4F6', border: '#4B5563', text: '#FFFFFF' },
};

export const ARROW_COLORS = {
  sync: '#1F2937',
  async: '#F59E0B',
};

export function getLayerColor(id: LayerId): string {
  return LAYER_COLORS[id].bg;
}

export function getArrowStyle(type: 'sync' | 'async'): { stroke: string; dasharray: string } {
  return {
    stroke: ARROW_COLORS[type],
    dasharray: type === 'async' ? '8 4' : 'none',
  };
}
