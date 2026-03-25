# Plan: Estrutura Inicial Astro — System Design Playbook

> Feature: 0001F-astro-initial-structure
> Date: 2026-03-25

## Technical Approach

Scaffold a complete Astro 5.x SSG project from scratch: configs, design tokens, 4 layouts, ~20 components (Astro + React stubs), 2 content collections using the Content Layer API with glob loaders, 22 chapter MDX files with full frontmatter, 10 exercise MDX files, 3 pages (landing, dynamic chapter route, quick-win), utility helpers, and dark mode with View Transitions. Tailwind 4.x uses CSS-first configuration (no JS config). React components are typed stubs with static placeholder UI only.

---

## Implementation Steps

### Step 1: Project Initialization

**Actions:**
1. Run `npm create astro@latest` (empty template, strict TypeScript)
2. Install dependencies
3. Configure `astro.config.mjs`
4. Configure `tsconfig.json`

**Dependencies to install:**

```bash
# Core
npx astro add react mdx

# Tailwind 4.x (Vite-native, no @astrojs/tailwind needed)
npm install tailwindcss @tailwindcss/vite

# Fonts
npm install @fontsource/inter @fontsource/jetbrains-mono
```

**`astro.config.mjs`:**

```ts
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**`tsconfig.json`** — Astro's `strict` preset with path aliases:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@utils/*": ["src/utils/*"]
    },
    "jsx": "react-jsx"
  }
}
```

**`.gitignore` additions:** `node_modules/`, `.astro/`, `dist/`

**`public/favicon.svg`:** Simple SVG placeholder icon.

---

### Step 2: Design Tokens & Global Styles

**File:** `src/styles/global.css`

```css
@import "tailwindcss";
@import "@fontsource/inter/400.css";
@import "@fontsource/inter/500.css";
@import "@fontsource/inter/600.css";
@import "@fontsource/inter/700.css";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";

/* Dark mode strategy: class-based */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Layer colors */
  --color-layer-entry: #3B82F6;
  --color-layer-entry-light: #DBEAFE;
  --color-layer-entry-dark: #1E3A5F;

  --color-layer-service: #0D9488;
  --color-layer-service-light: #CCFBF1;
  --color-layer-service-dark: #134E4A;

  --color-layer-data: #7C3AED;
  --color-layer-data-light: #EDE9FE;
  --color-layer-data-dark: #3B1F6E;

  --color-layer-cross: #6B7280;
  --color-layer-cross-light: #F3F4F6;
  --color-layer-cross-dark: #374151;

  /* Arrows */
  --color-arrow-sync: #1F2937;
  --color-arrow-async: #F59E0B;

  /* Status */
  --color-antipattern: #EF4444;
  --color-antipattern-light: #FEE2E2;
  --color-correct: #22C55E;
  --color-correct-light: #DCFCE7;

  /* UI - Light (defaults) */
  --color-bg: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-text: #111827;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;

  /* Fonts */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

/* Dark mode overrides via CSS variables on .dark class */
.dark {
  --color-bg: #0F172A;
  --color-bg-secondary: #1E293B;
  --color-text: #F1F5F9;
  --color-text-muted: #94A3B8;
  --color-border: #334155;
}

/* Base styles */
body {
  font-family: var(--font-sans);
  color: var(--color-text);
  background-color: var(--color-bg);
}

/* Prose / typography defaults for MDX content */
.prose {
  max-width: 720px;
}

.prose h2 {
  scroll-margin-top: 5rem;
}

code, pre {
  font-family: var(--font-mono);
}
```

---

### Step 3: Layouts

Layout hierarchy: `BaseLayout` → `ChapterLayout` / `ExerciseLayout` / `QuickWinLayout`

#### `src/layouts/BaseLayout.astro`

```
Props: { title: string; description?: string }
```

Responsibilities:
- `<!DOCTYPE html>`, `<html lang="pt-BR">`, `<head>` with meta, title, ViewTransitions
- Import `global.css`
- Dark mode anti-FOUC inline script in `<head>` (reads `localStorage.getItem('theme')`, sets `.dark` class before paint)
- `<ViewTransitions />` from `astro:transitions`
- `<body>` with `<slot />`
- Import font CSS files

#### `src/layouts/ChapterLayout.astro`

```
Props: {
  title: string;
  subtitle?: string;
  chapter: number;
  block: string;
  estimatedTime: string;
  difficulty: string;
}
```

Responsibilities:
- Wraps BaseLayout
- 3-column grid: Sidebar (240px) | Content (720px max) | TOC (200px)
- Renders `<Sidebar />`, `<ProgressBar />`, `<Breadcrumb />`, `<TableOfContents />`, `<Footer />`
- Prev/Next chapter navigation buttons at bottom
- `<MobileNav />` visible below 1280px
- TOC hidden below 1280px
- Content `<slot />`
- Inline `<script>` for reading progress persistence to `localStorage` key `sdp-progress-{chapter}`

#### `src/layouts/ExerciseLayout.astro`

```
Props: {
  title: string;
  exerciseNumber: number;
  scenario: string;
  timeLimit: number;
  difficulty: string;
}
```

Responsibilities:
- Wraps BaseLayout
- Sidebar + content area (no TOC column)
- Exercise metadata header (scenario, time limit, difficulty badge)
- `<slot />` for exercise MDX content
- Back link to chapter 18

#### `src/layouts/QuickWinLayout.astro`

```
Props: { title: string }
```

Responsibilities:
- Wraps BaseLayout
- Standalone minimal layout (no sidebar, no TOC)
- Print-optimized CSS (`@media print` rules)
- Centered single-column content (max-width 640px)
- Back-to-book link
- `<slot />`

---

### Step 4: UI Components

All in `src/components/ui/`. All are Astro components (`.astro`).

#### `Sidebar.astro`

```
Props: { currentSlug: string }
```

- Receives chapter list from `getCollection('chapters')` (passed as prop or fetched)
- Groups chapters by `block` field: Prefácio, Raciocínio, Visual, Exercícios, Apêndices
- Highlights current chapter
- Collapsible block sections
- Links to `/quick-win` at top
- Fixed left panel, scrollable

#### `TableOfContents.astro`

```
Props: { headings: Array<{ depth: number; slug: string; text: string }> }
```

- Renders H2/H3 headings as nested list
- Scroll-spy highlighting via inline `<script>` with IntersectionObserver

#### `Breadcrumb.astro`

```
Props: { items: Array<{ label: string; href?: string }> }
```

- Renders: Home > Block Name > Chapter Title
- Last item is current (no link)

#### `ProgressBar.astro`

```
Props: (none — scroll-based, client-side)
```

- Fixed top bar showing scroll percentage
- Inline `<script>` listens to `scroll` event
- Color uses `--color-layer-entry`

#### `ThemeToggle.astro`

```
Props: (none)
```

- Button with sun/moon icon
- Inline `<script>` toggles `.dark` on `<html>`, saves to `localStorage('theme')`

#### `Footer.astro`

```
Props: (none)
```

- Copyright, link to GitHub repo
- Prev/Next chapter navigation (receives via slot or props)

#### `MobileNav.astro`

```
Props: { currentSlug: string }
```

- Hamburger button visible below `lg` breakpoint
- Opens full-screen overlay with chapter list (same data as Sidebar)
- Close button

---

### Step 5: Content Components

All in `src/components/content/`.

#### `Callout.astro`

```
Props: { type: 'tip' | 'warning' | 'error' | 'info'; title?: string }
```

- Colored left border + icon based on type
- `<slot />` for body content
- Colors: tip=green, warning=amber, error=red, info=blue

#### `KeyTakeaway.astro`

```
Props: { title?: string }
```

- Highlighted box with background, icon (lightbulb)
- `<slot />` for summary content

#### `ComparisonTable.astro`

```
Props: {
  headers: [string, string];
  rows: Array<[string, string]>;
}
```

- 2-column table with styled headers
- Responsive: stacks on mobile

#### `Checklist.astro`

```
Props: { id: string; items: string[] }
```

- Renders checkboxes with labels
- Inline `<script>` persists state to `localStorage` key `sdp-checklist-{id}`
- Reset button
- Progress bar (X of Y checked)

#### `TimerChallenge.tsx` (React island stub)

```tsx
interface TimerChallengeProps {
  timeLimit: number;        // seconds
  challenge: string;
  phases: string[];
}
```

- Stub: renders static UI with timer display (MM:SS), phase checklist, Start/Pause/Reset buttons
- No interactive logic (future feature)
- Used with `client:visible`

#### `QuoteBlock.astro`

```
Props: { author?: string; role?: string }
```

- Styled blockquote with large quotation mark
- `<slot />` for quote text
- Author attribution below

---

### Step 6: Diagram Components

All in `src/components/diagrams/`.

#### `LayerDiagram.astro`

```
Props: {
  layers: Array<{
    id: 'entry' | 'service' | 'data' | 'cross';
    label: string;
    boxes: Array<{ name: string; description?: string }>;
  }>;
  arrows?: Array<{
    from: string;
    to: string;
    type: 'sync' | 'async';
    label?: string;
  }>;
  showLegend?: boolean;     // default true
  highlightLayer?: string;
  compact?: boolean;        // default false
}
```

- Renders 4 horizontal SVG bands with layer colors
- Boxes as rectangles within each band
- Arrows placeholder (static SVG lines between boxes)
- Legend in bottom-right corner
- Responsive via `viewBox`

#### `FlowDiagram.astro`

```
Props: { title?: string; caption?: string }
```

- SVG wrapper with consistent theming (border, background, caption)
- `<slot />` for SVG content
- No Mermaid (decision: SVG-only for visual quality)

#### `BeforeAfter.astro`

```
Props: {
  before: { title?: string; problems: string[] };
  after: { title?: string; improvements: string[] };
}
```

- 2-column grid: left (red border, "EVITE" label) | right (green border, "PREFIRA" label)
- Lists problems/improvements below each diagram
- `<slot name="before" />` and `<slot name="after" />` for diagram content
- Stacks vertically on mobile

#### `ArrowLegend.astro`

```
Props: { showAsync?: boolean }  // default true
```

- Small inline SVG showing:
  - Solid line + dark color = "Síncrono (REST/gRPC)"
  - Dashed line + amber color = "Assíncrono (Kafka/Filas)"
- Compact, meant to be placed near diagrams

#### `ArchitectureCard.astro`

```
Props: {
  name: string;
  layer: 'entry' | 'service' | 'data' | 'cross';
  description: string;
  tech?: string;
}
```

- Card with colored top border matching layer
- Name, description, optional tech badge
- Used for listing architecture components outside of diagrams

---

### Step 7: Exercise Components

All in `src/components/exercises/`.

#### `ExerciseBlock.astro`

```
Props: {
  title: string;
  difficulty: 'fundamento' | 'intermediário' | 'avançado';
  timeEstimate?: string;
}
```

- Container with distinct background
- Header with title, difficulty badge, time estimate
- `<slot />` for exercise content

#### `SolutionReveal.tsx` (React island stub)

```tsx
interface SolutionRevealProps {
  buttonLabel?: string;     // default "Ver solução"
  children: React.ReactNode;
}
```

- Stub: renders collapsed state with button "Tente resolver antes de ver a solução"
- Static placeholder, no toggle logic
- Used with `client:visible`

#### `LayerFillExercise.tsx` (React island stub)

```tsx
interface LayerFillExerciseProps {
  components: Array<{ name: string; correctLayer: 'entry' | 'service' | 'data' | 'cross' }>;
}
```

- Stub: renders 4 empty layer bands + list of draggable component labels
- Static layout only, no drag-and-drop logic
- Used with `client:visible`

#### `DiagramCritique.tsx` (React island stub)

```tsx
interface DiagramCritiqueProps {
  problems: Array<{ id: string; description: string; x: number; y: number }>;
  totalProblems: number;
}
```

- Stub: renders a placeholder diagram SVG with instruction text
- Static, no click-to-find logic
- Used with `client:visible`

---

### Step 8: Content Collections Config

**File:** `src/content.config.ts` (Astro 5.x Content Layer API — note: root of `src/`, NOT `src/content/config.ts`)

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/chapters' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    chapter: z.number(),
    block: z.enum(['prefacio', 'raciocinio', 'visual', 'exercicios', 'apendice']),
    estimatedTime: z.string(),
    difficulty: z.enum(['fundamento', 'intermediário', 'avançado']),
    tags: z.array(z.string()),
    prerequisites: z.array(z.number()).optional(),
    objectives: z.array(z.string()),
  }),
});

const exercises = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/exercises' }),
  schema: z.object({
    title: z.string(),
    chapter: z.number(),                // reference to parent chapter (18)
    exerciseNumber: z.number(),         // 1-10
    scenario: z.string(),
    timeLimit: z.number(),              // seconds
    difficulty: z.enum(['fundamento', 'intermediário', 'avançado']),
    tags: z.array(z.string()),
    phases: z.array(z.string()),
  }),
});

export const collections = { chapters, exercises };
```

---

### Step 9: Chapter Content (22 chapters)

Each chapter is an MDX file at `src/content/chapters/{dir}/index.mdx` with complete frontmatter from the PRD and H2 section outlines as placeholder content.

Every chapter body follows this pattern:
```mdx
## Section Title

> Conteúdo em desenvolvimento.
```

#### Complete chapter list with frontmatter:

| # | Directory | Title | Block | Time | Difficulty | Prerequisites |
|---|-----------|-------|-------|------|------------|---------------|
| 0 | `00-introducao` | Você sabe arquitetar. Agora aprenda a raciocinar com método e mostrar. | prefacio | 10 min | fundamento | — |
| 1 | `01-guia-fundamentos` | Guia de Fundamentos | prefacio | 20 min | fundamento | — |
| 2 | `02-decompondo-enunciado` | Decompondo o Enunciado | raciocinio | 20 min | fundamento | — |
| 3 | `03-perguntas-certas` | As Perguntas Certas | raciocinio | 15 min | fundamento | [2] |
| 4 | `04-estimando-escala` | Estimando Escala | raciocinio | 20 min | intermediário | [2, 3] |
| 5 | `05-decisoes-arquitetura` | Tomando Decisões de Arquitetura | raciocinio | 25 min | intermediário | [2, 3, 4] |
| 6 | `06-organizando-ideias` | Organizando as Ideias Antes do Quadro | raciocinio | 15 min | fundamento | [2, 3, 4, 5] |
| 7 | `07-framework-4-camadas` | O Framework de 4 Camadas | visual | 20 min | fundamento | [6] |
| 8 | `08-vocabulario-visual` | Vocabulário Visual | visual | 15 min | fundamento | [7] |
| 9 | `09-fluxo-de-desenho` | O Fluxo de Desenho | visual | 20 min | fundamento | [7, 8] |
| 10 | `10-comunicacao-sync-async` | Comunicação Síncrona vs Assíncrona | visual | 20 min | intermediário | [8] |
| 11 | `11-camada-entrada` | Camada de Entrada em Profundidade | visual | 15 min | intermediário | [7, 9] |
| 12 | `12-camada-servicos` | Camada de Serviços de Domínio em Profundidade | visual | 25 min | intermediário | [7, 9] |
| 13 | `13-camada-dados` | Camada de Dados em Profundidade | visual | 25 min | intermediário | [7, 9, 10] |
| 14 | `14-camada-transversal` | Camada Transversal em Profundidade | visual | 20 min | intermediário | [7, 9] |
| 15 | `15-modelo-dados-separado` | Modelo de Dados: Sempre em Diagrama Separado | visual | 15 min | intermediário | [13] |
| 16 | `16-anti-padroes` | Anti-padrões Visuais | visual | 20 min | avançado | [7, 8, 9, 10] |
| 17 | `17-narracao-ao-vivo` | Narração ao Vivo | visual | 15 min | avançado | [9] |
| 18 | `18-exercicios-guiados` | Exercícios Guiados | exercicios | 120 min (total) | avançado | [2, 3, 4, 5, 6, 7, 8, 9, 10] |
| 19 | `19-exercicios-livres` | Exercícios Livres | exercicios | 90 min (total) | avançado | [18] |
| 20 | `20-checklist-final` | Checklist Final de Validação | apendice | 5 min | fundamento | — |
| 21 | `21-apendices` | Apêndices | apendice | 10 min | fundamento | — |

Each MDX file includes:
- Full YAML frontmatter (title, subtitle if applicable, chapter, block, estimatedTime, difficulty, tags, prerequisites if applicable, objectives)
- H2 section outlines from the PRD
- Placeholder text: `> Conteúdo em desenvolvimento.` under each H2

---

### Step 10: Exercise Content (10 exercises)

Each exercise is an MDX file at `src/content/exercises/{slug}.mdx`.

| # | File | Title | Scenario (short) | Time (s) | Difficulty |
|---|------|-------|-------------------|----------|------------|
| 1 | `url-shortener.mdx` | URL Shortener | Encurtador de URLs com analytics | 1200 | intermediário |
| 2 | `chat-messaging.mdx` | Chat / Messaging System | Chat real-time com grupos e presença | 1500 | avançado |
| 3 | `notification-system.mdx` | Notification System | Notificações multi-canal com throttling | 1200 | intermediário |
| 4 | `rate-limiter.mdx` | Rate Limiter Distribuído | Rate limiter multi-node com <10ms overhead | 1200 | avançado |
| 5 | `news-feed.mdx` | News Feed / Timeline | Feed de rede social com ranking | 1500 | avançado |
| 6 | `processamento-pix.mdx` | Processamento de Pagamento | Pagamento real-time com idempotência | 1500 | avançado |
| 7 | `antifraude.mdx` | Antifraude em Tempo Real | Scoring com ML e fallback | 1500 | avançado |
| 8 | `faturas-sftp.mdx` | Emissão de Faturas via SFTP | Integração legacy SFTP com reconciliação | 1200 | intermediário |
| 9 | `autorizacao-debito.mdx` | Autorização de Débito (SLA 2s) | Time-budget com paralelismo | 1500 | avançado |
| 10 | `onboarding-kyc.mdx` | Onboarding e KYC Digital | Fluxo multi-step com compliance | 1200 | avançado |

Each exercise MDX includes frontmatter fields: `title`, `chapter: 18`, `exerciseNumber`, `scenario` (full description from PRD), `timeLimit`, `difficulty`, `tags`, `phases` (list of construction steps).

Body includes H2 sections: Enunciado, Raciocínio, Construção Passo a Passo, Trade-offs — all with placeholder text.

---

### Step 11: Utility Functions

#### `src/utils/navigation.ts`

```ts
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

// Block display names and order
export const BLOCK_ORDER: Record<string, string> = {
  prefacio: 'Prefácio',
  raciocinio: 'Raciocínio',
  visual: 'Metodologia Visual',
  exercicios: 'Exercícios',
  apendice: 'Apêndices',
};

export function getChaptersByBlock(chapters: ChapterMeta[]): SidebarBlock[];
export function getPrevNext(chapters: ChapterMeta[], currentChapter: number): { prev?: ChapterMeta; next?: ChapterMeta };
export function getSidebarData(chapters: ChapterMeta[]): SidebarBlock[];
```

#### `src/utils/diagrams.ts`

```ts
export type LayerId = 'entry' | 'service' | 'data' | 'cross';

export const LAYER_COLORS: Record<LayerId, { bg: string; bgLight: string; border: string; text: string }>;
export const ARROW_COLORS: { sync: string; async: string };

export function getLayerColor(id: LayerId): string;
export function getArrowStyle(type: 'sync' | 'async'): { stroke: string; dasharray: string };
```

---

### Step 12: Pages

#### `src/pages/index.astro` — Landing Page

- Uses `BaseLayout`
- Hero section: title "System Design Playbook", subtitle, CTA button linking to chapter 0
- Section "Para quem é este guia" — 3 cards (Senior Engineer, Staff Engineer, Tech Lead)
- Section "O que você vai aprender" — 3 blocks (Raciocínio, Visual, Prática)
- Section "O Framework" — static `LayerDiagram` with generic labels
- Footer
- Responsive (single column on mobile)

#### `src/pages/[...slug].astro` — Dynamic Chapter Route

```ts
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const chapters = await getCollection('chapters');
  return chapters.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
```

- Uses `ChapterLayout` with frontmatter data as props
- Renders `<Content />` in the content slot
- Passes headings to `<TableOfContents />`

#### `src/pages/exercises/[...slug].astro` — Dynamic Exercise Route

```ts
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const exercises = await getCollection('exercises');
  return exercises.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
```

- Uses `ExerciseLayout` with exercise frontmatter data
- Renders `<Content />` in content slot

#### `src/pages/quick-win.astro` — Quick Win Page

- Uses `QuickWinLayout`
- Hardcoded content: the 5-step mental framework from the PRD
- Styled as a single-page reference card
- Print-friendly

---

## File Inventory

Complete list of every file to create, organized by directory:

### Root

```
package.json
astro.config.mjs
tsconfig.json
.gitignore (modify existing)
public/favicon.svg
```

### `src/styles/`

```
src/styles/global.css
```

### `src/layouts/`

```
src/layouts/BaseLayout.astro
src/layouts/ChapterLayout.astro
src/layouts/ExerciseLayout.astro
src/layouts/QuickWinLayout.astro
```

### `src/components/ui/`

```
src/components/ui/Sidebar.astro
src/components/ui/TableOfContents.astro
src/components/ui/Breadcrumb.astro
src/components/ui/ProgressBar.astro
src/components/ui/ThemeToggle.astro
src/components/ui/Footer.astro
src/components/ui/MobileNav.astro
```

### `src/components/content/`

```
src/components/content/Callout.astro
src/components/content/KeyTakeaway.astro
src/components/content/ComparisonTable.astro
src/components/content/Checklist.astro
src/components/content/TimerChallenge.tsx
src/components/content/QuoteBlock.astro
```

### `src/components/diagrams/`

```
src/components/diagrams/LayerDiagram.astro
src/components/diagrams/FlowDiagram.astro
src/components/diagrams/BeforeAfter.astro
src/components/diagrams/ArrowLegend.astro
src/components/diagrams/ArchitectureCard.astro
```

### `src/components/exercises/`

```
src/components/exercises/ExerciseBlock.astro
src/components/exercises/SolutionReveal.tsx
src/components/exercises/LayerFillExercise.tsx
src/components/exercises/DiagramCritique.tsx
```

### `src/content.config.ts`

```
src/content.config.ts
```

### `src/content/chapters/` (22 files)

```
src/content/chapters/00-introducao/index.mdx
src/content/chapters/01-guia-fundamentos/index.mdx
src/content/chapters/02-decompondo-enunciado/index.mdx
src/content/chapters/03-perguntas-certas/index.mdx
src/content/chapters/04-estimando-escala/index.mdx
src/content/chapters/05-decisoes-arquitetura/index.mdx
src/content/chapters/06-organizando-ideias/index.mdx
src/content/chapters/07-framework-4-camadas/index.mdx
src/content/chapters/08-vocabulario-visual/index.mdx
src/content/chapters/09-fluxo-de-desenho/index.mdx
src/content/chapters/10-comunicacao-sync-async/index.mdx
src/content/chapters/11-camada-entrada/index.mdx
src/content/chapters/12-camada-servicos/index.mdx
src/content/chapters/13-camada-dados/index.mdx
src/content/chapters/14-camada-transversal/index.mdx
src/content/chapters/15-modelo-dados-separado/index.mdx
src/content/chapters/16-anti-padroes/index.mdx
src/content/chapters/17-narracao-ao-vivo/index.mdx
src/content/chapters/18-exercicios-guiados/index.mdx
src/content/chapters/19-exercicios-livres/index.mdx
src/content/chapters/20-checklist-final/index.mdx
src/content/chapters/21-apendices/index.mdx
```

### `src/content/exercises/` (10 files)

```
src/content/exercises/url-shortener.mdx
src/content/exercises/chat-messaging.mdx
src/content/exercises/notification-system.mdx
src/content/exercises/rate-limiter.mdx
src/content/exercises/news-feed.mdx
src/content/exercises/processamento-pix.mdx
src/content/exercises/antifraude.mdx
src/content/exercises/faturas-sftp.mdx
src/content/exercises/autorizacao-debito.mdx
src/content/exercises/onboarding-kyc.mdx
```

### `src/pages/`

```
src/pages/index.astro
src/pages/[...slug].astro
src/pages/exercises/[...slug].astro
src/pages/quick-win.astro
```

### `src/utils/`

```
src/utils/navigation.ts
src/utils/diagrams.ts
```

**Total files: ~60**

---

## Spec Checklist

| Requirement (from about.md) | Implementation |
|------------------------------|----------------|
| Astro 5.x + MDX + Tailwind 4.x + React islands | `astro.config.mjs`, `package.json`, `global.css` |
| 3+1 layouts (Base, Chapter, Exercise, QuickWin) | `src/layouts/*.astro` |
| ~15 components in 4 categories | `src/components/{ui,content,diagrams,exercises}/` (20 total) |
| React stubs typed, static UI only | `.tsx` files: TimerChallenge, SolutionReveal, LayerFillExercise, DiagramCritique |
| 2 content collections (chapters + exercises) | `src/content.config.ts` with glob loaders |
| 22 chapter directories with full frontmatter + H2 outline | `src/content/chapters/*/index.mdx` |
| 10 exercise subpages | `src/content/exercises/*.mdx` |
| Design tokens: 4-layer palette, dark mode, typography | `src/styles/global.css` with `@theme` block |
| Landing page | `src/pages/index.astro` |
| Dynamic route `[...slug].astro` | `src/pages/[...slug].astro` |
| Exercise dynamic route | `src/pages/exercises/[...slug].astro` |
| Sidebar generated from content collection | `Sidebar.astro` + `navigation.ts` |
| View Transitions | `<ViewTransitions />` in BaseLayout |
| `/quick-win` standalone route | `src/pages/quick-win.astro` + `QuickWinLayout.astro` |
| Reading progress persisted with localStorage | Inline `<script>` in ChapterLayout |
| Dark mode toggle without FOUC | `ThemeToggle.astro` + inline script in `<head>` of BaseLayout |
| Responsive mobile-first | Tailwind utilities, MobileNav, responsive grid in ChapterLayout |
| SVG diagrams, no Mermaid | `LayerDiagram.astro`, `FlowDiagram.astro` as SVG wrappers |
| `npm run dev` runs without errors | All schemas, imports, and types must be valid |
| Content collection validates all frontmatter | Zod schemas in `content.config.ts` |
| Tailwind 4.x CSS-first config (no JS config) | `global.css` with `@import "tailwindcss"` + `@theme` |
| Astro 5.x Content Layer API (glob loader) | `content.config.ts` uses `glob()` from `astro/loaders` |
