export interface ChapterMeta {
  id: string;
  title: string;
  subtitle?: string;
  chapter: number;
  block: string;
  estimatedTime: string;
  difficulty: string;
}

export interface SidebarBlock {
  name: string;
  slug: string;
  chapters: ChapterMeta[];
}

export const BLOCK_ORDER: Record<string, string> = {
  prefacio: 'Prefácio',
  raciocinio: 'Raciocínio',
  visual: 'Metodologia Visual',
  exercicios: 'Exercícios',
  apendice: 'Apêndices',
};

const BLOCK_KEYS = Object.keys(BLOCK_ORDER);

export function getChaptersByBlock(chapters: ChapterMeta[]): SidebarBlock[] {
  const sorted = [...chapters].sort((a, b) => a.chapter - b.chapter);
  const blocks: SidebarBlock[] = [];

  for (const key of BLOCK_KEYS) {
    const blockChapters = sorted.filter((c) => c.block === key);
    if (blockChapters.length > 0) {
      blocks.push({
        name: BLOCK_ORDER[key],
        slug: key,
        chapters: blockChapters,
      });
    }
  }

  return blocks;
}

export function getPrevNext(
  chapters: ChapterMeta[],
  currentChapter: number,
): { prev?: ChapterMeta; next?: ChapterMeta } {
  const sorted = [...chapters].sort((a, b) => a.chapter - b.chapter);
  const index = sorted.findIndex((c) => c.chapter === currentChapter);
  return {
    prev: index > 0 ? sorted[index - 1] : undefined,
    next: index < sorted.length - 1 ? sorted[index + 1] : undefined,
  };
}

export function getSidebarData(chapters: ChapterMeta[]): SidebarBlock[] {
  return getChaptersByBlock(chapters);
}
