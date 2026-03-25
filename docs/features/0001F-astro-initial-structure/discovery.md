# Discovery: Estrutura Inicial Astro — System Design Playbook

> **Branch:** feature/0001F-astro-initial-structure
> **Feature:** 0001F
> **Date:** 2026-03-25

---

## Codebase Analysis

### Commit History

- `d7fb0d1` Initial commit — apenas LICENSE, README, .gitignore
- Repositório greenfield — sem código existente

### Related Files

- `docs/system-design-playbook.md` — PRD completo com stack, estrutura de diretórios, schemas, design tokens, specs de componentes
- `docs/brainstorm/2026-03-25-ebook-system-design-playbook.md` — Brainstorm que redefiniu escopo: generalista, híbrido (raciocínio + visual), 3 blocos + exercícios

### Similar Features

- Nenhuma — primeira feature do projeto

### Patterns

- Projeto greenfield — padrões serão estabelecidos por esta feature
- PRD define convenções a seguir:
  - Componentes Astro: `.astro` para SSG, `.tsx` para islands React
  - Content em MDX com frontmatter Zod-validated
  - Organização por responsabilidade: `ui/`, `content/`, `diagrams/`, `exercises/`
  - Nomenclatura: PascalCase para componentes, kebab-case para diretórios de capítulos

## Technical Context

### Infrastructure

- **Framework:** Astro 5.x (SSG mode)
- **Content:** MDX (Markdown + JSX components)
- **Styling:** Tailwind CSS 4.x (utility-first, dark mode via class strategy)
- **Islands:** React para componentes interativos (`client:visible` directive)
- **Build output:** Static HTML/CSS/JS
- **Deploy:** Vercel ou Netlify (futuro — não no escopo desta feature)

### Dependencies

| Package | Purpose |
|---------|---------|
| `astro` | Framework core |
| `@astrojs/mdx` | Suporte a MDX em content collections |
| `@astrojs/react` | React islands architecture |
| `@astrojs/tailwind` | Integração Tailwind |
| `tailwindcss` | CSS utility framework |
| `react` + `react-dom` | Runtime para islands |
| `@fontsource/inter` | Tipografia corpo |
| `@fontsource/jetbrains-mono` | Tipografia código |

### Integration Points

- **Content Collections API:** `getCollection('chapters')`, `getCollection('exercises')` para popular sidebar e rotas
- **View Transitions:** `<ViewTransitions />` no BaseLayout
- **Dark Mode:** Script inline no `<head>` + toggle component + Tailwind `darkMode: 'class'`
- **localStorage:** Reading progress por capítulo (key: `sdp-progress-{chapter}`)

## Files Mapping

### To Create

**Configs:**
- `package.json` — dependências e scripts
- `astro.config.mjs` — integrações (react, mdx, tailwind), site config
- `tailwind.config.mjs` — extend com design tokens das 4 camadas
- `tsconfig.json` — strict mode, path aliases

**Styles:**
- `src/styles/global.css` — design tokens (cores das 4 camadas, setas, status), dark mode vars, tipografia, base styles

**Layouts:**
- `src/layouts/BaseLayout.astro` — HTML shell, `<head>`, dark mode script, ViewTransitions, slot
- `src/layouts/ChapterLayout.astro` — extends Base, Sidebar + TOC + ProgressBar + chapter content
- `src/layouts/ExerciseLayout.astro` — extends Base, exercise-specific UI (timer area, phases)
- `src/layouts/QuickWinLayout.astro` — extends Base, standalone minimal layout, print-optimized

**Componentes UI:**
- `src/components/ui/Sidebar.astro` — navegação lateral, capítulos agrupados por bloco, gerada da content collection
- `src/components/ui/TableOfContents.astro` — TOC do capítulo atual (headings H2/H3)
- `src/components/ui/Breadcrumb.astro` — migalhas de pão: Home > Bloco > Capítulo
- `src/components/ui/ProgressBar.astro` — barra de progresso de leitura (scroll-based)
- `src/components/ui/ThemeToggle.astro` — toggle dark/light mode
- `src/components/ui/Footer.astro` — rodapé com links
- `src/components/ui/MobileNav.astro` — navegação mobile (hamburger menu)

**Componentes Content:**
- `src/components/content/Callout.astro` — blocos de destaque (tip, warning, error, info)
- `src/components/content/KeyTakeaway.astro` — box de resumo do capítulo
- `src/components/content/ComparisonTable.astro` — tabela lado a lado
- `src/components/content/Checklist.astro` — checklist interativo com checkboxes
- `src/components/content/TimerChallenge.tsx` — (stub) exercício cronometrado (React island)
- `src/components/content/QuoteBlock.astro` — citação estilizada

**Componentes Diagrams:**
- `src/components/diagrams/LayerDiagram.astro` — diagrama SVG das 4 camadas (componente central)
- `src/components/diagrams/FlowDiagram.astro` — wrapper para SVGs de fluxo com tema consistente
- `src/components/diagrams/BeforeAfter.astro` — comparação anti-padrão (vermelho) vs correto (verde)
- `src/components/diagrams/ArrowLegend.astro` — legenda de setas sync/async
- `src/components/diagrams/ArchitectureCard.astro` — card de componente de arquitetura

**Componentes Exercises:**
- `src/components/exercises/ExerciseBlock.astro` — container de exercício
- `src/components/exercises/SolutionReveal.tsx` — (stub) toggle de solução (React island)
- `src/components/exercises/LayerFillExercise.tsx` — (stub) preencher camadas (React island)
- `src/components/exercises/DiagramCritique.tsx` — (stub) criticar diagrama (React island)

**Content Collections:**
- `src/content/config.ts` — 2 collections: chapters (Zod schema) + exercises (Zod schema)
- `src/content/chapters/00-introducao/index.mdx` — frontmatter + outline H2
- `src/content/chapters/01-guia-fundamentos/index.mdx`
- `src/content/chapters/02-decompondo-enunciado/index.mdx`
- `src/content/chapters/03-perguntas-certas/index.mdx`
- `src/content/chapters/04-estimando-escala/index.mdx`
- `src/content/chapters/05-decisoes-arquitetura/index.mdx`
- `src/content/chapters/06-organizando-ideias/index.mdx`
- `src/content/chapters/07-framework-4-camadas/index.mdx`
- `src/content/chapters/08-vocabulario-visual/index.mdx`
- `src/content/chapters/09-fluxo-de-desenho/index.mdx`
- `src/content/chapters/10-comunicacao-sync-async/index.mdx`
- `src/content/chapters/11-camada-entrada/index.mdx`
- `src/content/chapters/12-camada-servicos/index.mdx`
- `src/content/chapters/13-camada-dados/index.mdx`
- `src/content/chapters/14-camada-transversal/index.mdx`
- `src/content/chapters/15-modelo-dados-separado/index.mdx`
- `src/content/chapters/16-anti-padroes/index.mdx`
- `src/content/chapters/17-narracao-ao-vivo/index.mdx`
- `src/content/chapters/18-exercicios-guiados/index.mdx`
- `src/content/chapters/19-exercicios-livres/index.mdx`
- `src/content/chapters/20-checklist-final/index.mdx`
- `src/content/chapters/21-apendices/index.mdx`
- `src/content/exercises/url-shortener.mdx`
- `src/content/exercises/chat-messaging.mdx`
- `src/content/exercises/notification-system.mdx`
- `src/content/exercises/rate-limiter.mdx`
- `src/content/exercises/news-feed.mdx`
- `src/content/exercises/processamento-pix.mdx`
- `src/content/exercises/antifraude.mdx`
- `src/content/exercises/faturas-sftp.mdx`
- `src/content/exercises/autorizacao-debito.mdx`
- `src/content/exercises/onboarding-kyc.mdx`

**Pages:**
- `src/pages/index.astro` — landing page do ebook
- `src/pages/[...slug].astro` — rota dinâmica para capítulos (getStaticPaths da content collection)
- `src/pages/quick-win.astro` — Framework Mental de 5 Passos (standalone)

**Utils:**
- `src/utils/navigation.ts` — helpers: getChaptersByBlock(), getPrevNext(), getSidebarData()
- `src/utils/diagrams.ts` — helpers para gerar SVGs das camadas programaticamente

**Assets:**
- `public/favicon.svg` — ícone do site

### To Modify

- `.gitignore` — adicionar `node_modules/`, `.astro/`, `dist/`

## Technical Assumptions

| Assumption | Impact if Wrong |
|------------|-----------------|
| Astro 5.x está estável com content collections v2 | Pode precisar ajustar schema API se breaking changes |
| Tailwind 4.x é compatível com integração Astro | Fallback para Tailwind 3.x se incompatibilidade |
| `@fontsource` packages disponíveis para Inter e JetBrains Mono | Alternativa: Google Fonts via CDN |
| View Transitions API funciona com content collections | Funcionalidade core do Astro, risco baixo |
| localStorage disponível em todos os browsers target | Progressive enhancement — funciona sem, persiste se disponível |
| SVGs inline no Astro performam bem com 4+ diagramas por página | Monitorar bundle size; extrair para arquivos se necessário |

## References

### Files Consulted

- `docs/system-design-playbook.md` — PRD com stack, estrutura, schemas, componentes, design tokens
- `docs/brainstorm/2026-03-25-ebook-system-design-playbook.md` — Redefinição de escopo e estrutura de capítulos

### Documentation

- Astro 5.x Content Collections: https://docs.astro.build/en/guides/content-collections/
- Astro View Transitions: https://docs.astro.build/en/guides/view-transitions/
- Tailwind CSS 4.x: https://tailwindcss.com/docs

### Related Features (historical)

- Nenhuma — primeira feature do projeto

## Related Features

| Feature | Relation | Key Files | Impact |
|---------|----------|-----------|--------|
| — | — | — | Primeira feature, sem relações |

## Summary for Planning

### Executive Summary

Scaffolding completo de um projeto Astro 5.x para ebook interativo de System Design. Greenfield — todos os arquivos serão criados do zero seguindo o PRD existente. Inclui 3+1 layouts, ~15 componentes (stubs tipados para React islands), 2 content collections, 22 capítulos placeholder, 10 exercícios como subpáginas, design tokens das 4 camadas, sidebar dinâmica, View Transitions, dark mode, e rota standalone Quick Win.

### Key Decisions

- SVGs estáticos em vez de Mermaid — qualidade visual superior
- 2 content collections separadas (chapters + exercises) — schemas distintos
- Componentes React como stubs tipados — lógica interativa em feature futura
- Quick Win como rota standalone `/quick-win` — consulta rápida 2min dentro dos 40min de entrevista

### Critical Files

- `astro.config.mjs` — configuração central que define todas as integrações
- `src/content/config.ts` — schemas das 2 collections, valida todo o conteúdo
- `src/layouts/BaseLayout.astro` — shell HTML usado por todos os layouts
- `src/layouts/ChapterLayout.astro` — layout principal onde 90% do conteúdo será lido
- `src/components/diagrams/LayerDiagram.astro` — componente visual central do ebook
- `src/utils/navigation.ts` — lógica de sidebar e navegação entre capítulos
- `src/styles/global.css` — design tokens que definem toda a identidade visual
