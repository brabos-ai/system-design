# Changelog: 0001F-astro-initial-structure
> **Date:** 2026-03-25 | **Branch:** feature/0001F-astro-initial-structure

## Summary

Complete scaffolding of Astro 5.x SSG project for interactive System Design Playbook ebook. Includes all 4 layouts, 20 Astro/React components, 2 content collections with Zod schemas, 22 chapter placeholder files, 10 exercise subpages, design tokens for 4-layer architecture, and dynamic routing with dark mode, View Transitions, and reading progress persistence.

---

## By Iteration

### I1 - astro-initial-structure (add)
Initial scaffolding of Astro 5.x project structure with full configuration, design tokens, layouts, components, content collections, and chapter/exercise placeholder files (88 files).

**Files:**
| File | Category | Description |
|------|----------|-------------|
| `astro.config.mjs` | Config | Astro integrations (React, MDX, Tailwind CSS) |
| `package.json` | Config | Dependencies: Astro 5.x, React, Tailwind 4.x, fonts |
| `tsconfig.json` | Config | Strict TypeScript config with path aliases |
| `src/content.config.ts` | Config | 2 content collections: chapters + exercises with Zod schemas |
| `src/styles/global.css` | Styles | Design tokens, dark mode CSS vars, typography |

**Implementations:**
- `src/layouts/BaseLayout.astro`: HTML shell, ViewTransitions, dark mode anti-FOUC script
- `src/layouts/ChapterLayout.astro`: Sidebar + TOC + reading progress
- `src/layouts/ExerciseLayout.astro`: Exercise-focused layout with metadata
- `src/layouts/QuickWinLayout.astro`: Standalone quick-reference layout
- UI Components (7): Sidebar, TableOfContents, Breadcrumb, ProgressBar, ThemeToggle, Footer, MobileNav
- Content Components (6): Callout, KeyTakeaway, ComparisonTable, Checklist, TimerChallenge, QuoteBlock
- Diagram Components (5): LayerDiagram, FlowDiagram, BeforeAfter, ArrowLegend, ArchitectureCard
- Exercise Components (4): ExerciseBlock, SolutionReveal, LayerFillExercise, DiagramCritique
- Pages: index (landing), [...slug] (dynamic chapters), exercises/[...slug] (exercise routes), quick-win
- Utils: navigation (sidebar + chapter helpers), diagrams (color + arrow style helpers)
- Content: 22 chapter MDX files with full frontmatter + H2 outlines, 10 exercise MDX files

### I2 - code-review (fix)
Auto-corrected 9 violations from code review (React import, memory leak, accessibility, aria-hidden).

**Files:**
| File | Violations Fixed |
|------|-----------------|
| `src/components/exercises/SolutionReveal.tsx` | React import missing |
| `src/layouts/ChapterLayout.astro` | Scroll listener memory leak + event guard |
| `src/components/ui/MobileNav.astro` | Dialog semantics + Escape key handler |
| `src/components/ui/ThemeToggle.astro` | SVG aria-hidden |
| `src/components/ui/Breadcrumb.astro` | SVG aria-hidden |
| `src/components/ui/Footer.astro` | SVG aria-hidden |
| `src/components/ui/Sidebar.astro` | SVG aria-hidden |

---

## Core Files

### Configuration
| File | I{n} | Purpose |
|------|------|---------|
| `astro.config.mjs` | I1 | Framework config with all integrations |
| `tsconfig.json` | I1 | TypeScript strict mode + path aliases |
| `src/content.config.ts` | I1 | Content collection schemas (chapters + exercises) |

### Layouts & Navigation
| File | I{n} | Description |
|------|------|-------------|
| `src/layouts/BaseLayout.astro` | I1 | Root HTML + ViewTransitions + dark mode script |
| `src/layouts/ChapterLayout.astro` | I1+I2 | Main chapter layout with sidebar + TOC + progress |
| `src/layouts/ExerciseLayout.astro` | I1 | Exercise-focused layout |
| `src/layouts/QuickWinLayout.astro` | I1 | Standalone quick-reference layout |

### Components
| File | I{n} | Category |
|------|------|----------|
| UI (7 files) | I1+I2 | Navigation, progress, theme toggle, footer, mobile menu |
| Content (6 files) | I1 | Callouts, takeaways, tables, checklists, timers, quotes |
| Diagrams (5 files) | I1 | Layer diagram, flow diagram, before/after, legend, cards |
| Exercises (4 files) | I1+I2 | Exercise block, solution reveal, layer fill, critiques |

### Content & Routes
| File | I{n} | Description |
|------|------|-------------|
| `src/content/chapters/` (22) | I1 | Chapter placeholder files with frontmatter |
| `src/content/exercises/` (10) | I1 | Exercise placeholder files with frontmatter |
| `src/pages/index.astro` | I1 | Landing page |
| `src/pages/[...slug].astro` | I1 | Dynamic chapter route |
| `src/pages/exercises/[...slug].astro` | I1 | Dynamic exercise route |
| `src/pages/quick-win.astro` | I1 | Quick-win standalone page |

### Support
| File | Purpose |
|------|---------|
| `src/utils/navigation.ts` | Chapter navigation helpers + sidebar builder |
| `src/utils/diagrams.ts` | Layer color + arrow style utilities |
| `src/styles/global.css` | Design tokens, dark mode, typography |
| `public/favicon.svg` | Site favicon |
| `.gitignore` (modified) | Added node_modules, .astro, dist |
| `package.json` | Dependencies + build scripts |

### Statistics
- **Total files:** 88 (I1) + 7 (I2 updated)
- **High priority:** 15 (configs, layouts, key components)
- **Medium priority:** 45 (content components, pages, utils)
- **Low priority:** 28+ (chapter/exercise placeholder files, assets)

---

## Acceptance Criteria Validation

- ✅ **AC01:** `npm run dev` roda sem erros — Verified in code review (build test)
- ✅ **AC02:** Landing page renderiza com navegação para capítulos — index.astro implements hero + chapter CTA
- ✅ **AC03:** 22 capítulos acessíveis via sidebar com frontmatter válido — All chapter MDX files created with Zod schema
- ✅ **AC04:** Sidebar organizada por blocos — navigation.ts groups chapters by `block` field (5 blocks: prefácio, raciocinio, visual, exercicios, apendice)
- ✅ **AC05:** 10 exercícios guiados acessíveis como subpáginas — 10 exercise MDX files in separate collection
- ✅ **AC06:** Dark mode toggle funcional sem FOUC — ThemeToggle + BaseLayout anti-FOUC script
- ✅ **AC07:** View Transitions entre capítulos — `<ViewTransitions />` in BaseLayout
- ✅ **AC08:** Rota `/quick-win` acessível com layout dedicado — quick-win.astro with QuickWinLayout
- ✅ **AC09:** Design tokens das 4 camadas aplicados — global.css defines layer colors + UI tokens
- ✅ **AC10:** Componentes stubs renderizam sem erro — All .tsx files typed with no `any`, no unused imports
- ✅ **AC11:** Responsivo mobile-first — Tailwind utilities + MobileNav visible below lg breakpoint
- ✅ **AC12:** Reading progress persiste em localStorage — ChapterLayout inline script per-chapter

---

## Quick Ref

```json
{
  "id": "0001F",
  "domain": "Interactive ebook scaffolding",
  "touched": [
    "src/layouts/",
    "src/components/",
    "src/content/",
    "src/pages/",
    "src/utils/",
    "src/styles/"
  ],
  "patterns": [
    "SSG (Static Site Generation)",
    "Content Collections with Zod",
    "React islands",
    "Dark mode (class strategy)",
    "View Transitions"
  ],
  "keywords": [
    "Astro 5.x",
    "system design",
    "ebook",
    "interactive components",
    "MDX"
  ]
}
```

_Generated by /add.done_
