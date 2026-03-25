# Task: Estrutura Inicial Astro — System Design Playbook

> **Branch:** feature/0001F-astro-initial-structure
> **Feature:** 0001F
> **Date:** 2026-03-25

---

## Objective

Criar o scaffolding completo do projeto Astro que serve como base do ebook interativo "System Design Playbook" — um site SSG que ensina profissionais (SSE, Tech Lead, Principal Engineer) a raciocinar, planejar e apresentar system design em entrevistas técnicas.

## Business Context

- **Why:** O repositório está vazio (só documentação). Sem a estrutura Astro, não é possível começar a produzir conteúdo nem validar o fluxo de leitura.
- **Problem:** Não existe código — nenhum layout, componente, content collection, ou design system implementado.
- **Stakeholders:** Fundador (autor do conteúdo), leitores (profissionais preparando-se para entrevistas de system design).

## Scope

### Included

- Projeto Astro 5.x com MDX, Tailwind CSS 4.x e React (islands)
- 3 layouts: BaseLayout, ChapterLayout, ExerciseLayout
- ~15 componentes organizados em 4 categorias: `ui/`, `content/`, `diagrams/`, `exercises/`
- Componentes React (islands) como stubs tipados — props tipadas, UI estática placeholder
- 2 content collections separadas: `chapters` (schema de capítulo) + `exercises` (schema de exercício)
- 22 diretórios de capítulos com frontmatter completo + seções H2 como outline
- 10 subpáginas de exercícios guiados (1 por exercício)
- Design tokens completos: paleta das 4 camadas, dark mode, tipografia (Inter + JetBrains Mono)
- Landing page (`index.astro`)
- Rota dinâmica `[...slug].astro` com sidebar gerada automaticamente da content collection
- View Transitions API do Astro para navegação smooth
- Rota standalone `/quick-win` com layout próprio — framework mental de 5 passos otimizado para consulta rápida (2min) dentro dos 40min de entrevista
- Reading progress persistido com localStorage por capítulo
- Diagramas 100% SVG estático — sem Mermaid (decisão de qualidade visual)

### Not Included

- Conteúdo real dos capítulos (só frontmatter + outline H2)
- Lógica interativa dos componentes React (SolutionReveal toggle, TimerChallenge cronômetro, etc.)
- Exercícios interativos funcionais (LayerFillExercise, DiagramCritique)
- SVGs dos diagramas reais (só componente wrapper)
- Deploy (Vercel/Netlify)
- Geração de PDF
- SEO avançado / Open Graph images
- Analytics

## Business Rules

### Validations

- Content collection schema deve validar frontmatter de todos os capítulos sem erro
- `npm run dev` deve rodar sem erros
- Navegação entre capítulos deve funcionar via sidebar + rotas dinâmicas
- Dark mode deve funcionar com toggle
- Layout responsivo (mobile-first)

### Flows

**Happy Path:**
1. Dev roda `npm install && npm run dev`
2. Landing page renderiza com overview do ebook
3. Sidebar lista todos os capítulos organizados por bloco
4. Clicar em capítulo navega com View Transition
5. ChapterLayout renderiza frontmatter + outline + TOC
6. Quick Win acessível via `/quick-win`
7. Progresso de leitura persiste entre sessões

**Alternative:**
1. Autor cria novo capítulo MDX com frontmatter válido
2. Content collection detecta automaticamente
3. Sidebar atualiza sem intervenção manual

**Error:**
1. Frontmatter inválido → Astro mostra erro de validação Zod em dev
2. Capítulo sem frontmatter obrigatório → build falha com mensagem clara

## Strategic Questionnaire

### Decisões Validadas

| Questão | Resposta |
|---|---|
| Escopo do scaffolding | Esqueleto completo — todos os 22 capítulos, componentes stubs, layouts, configs |
| Componentes React | Stubs tipados — props tipadas, UI estática, sem lógica interativa |
| Conteúdo placeholder | Frontmatter completo (do PRD) + seções H2 como outline |
| Exercícios guiados | Subpáginas separadas — 1 arquivo MDX por exercício |
| Diagramas | SVGs estáticos — sem Mermaid (rústico demais visualmente) |
| Content collections | 2 collections separadas: `chapters` + `exercises` |
| Sidebar | Gerada automaticamente da content collection |
| Navegação | View Transitions API do Astro |
| Quick Win | Rota standalone `/quick-win`, layout próprio, foco em consulta rápida 2min |
| Progresso | localStorage por capítulo |

## Decisions

| Context | Decision | Rationale |
|---------|----------|-----------|
| Diagramas do ebook | SVG estático, sem Mermaid | Mermaid é visualmente rústico; SVGs customizados permitem controle total sobre cores das 4 camadas e estilo profissional |
| Content collections | 2 collections separadas (chapters + exercises) | Exercícios têm metadata distinta (timeLimit, phases, difficulty) que não pertence ao schema de capítulo |
| Exercícios guiados | 1 arquivo MDX por exercício | Cada exercício terá conteúdo extenso (diagrama incremental, narração, trade-offs); arquivo único seria imenso |
| Quick Win | Rota standalone `/quick-win` | Ferramenta de sobrevivência — candidato abre no celular 2min antes da entrevista dentro dos 40min totais |
| Componentes React | Stubs tipados agora | Lógica interativa é feature separada que merece própria iteração com testes |
| Navegação | View Transitions API | Uma linha no layout, zero overhead de SPA, experiência de leitura drasticamente melhor |

## Edge Cases

| Name | Description | Strategy |
|------|-------------|----------|
| Capítulo sem prerequisites | Alguns capítulos não dependem de outros | Campo `prerequisites` é opcional no schema Zod |
| Exercício com subpáginas | Capítulo 18 tem 10 subpáginas | Content collection `exercises` separada com referência ao capítulo pai |
| Dark mode flash | FOUC ao carregar página em dark mode | Script inline no `<head>` que lê localStorage antes do render |
| Capítulo vazio | Placeholder sem conteúdo real | Renderizar frontmatter + outline + mensagem "Conteúdo em desenvolvimento" |

## Acceptance Criteria

- [ ] `npm run dev` roda sem erros
- [ ] Landing page renderiza com navegação para capítulos
- [ ] 22 capítulos acessíveis via sidebar com frontmatter válido
- [ ] Sidebar organizada por blocos (Prefácio, Raciocínio, Visual, Exercícios, Apêndices)
- [ ] 10 exercícios guiados acessíveis como subpáginas
- [ ] Dark mode toggle funcional sem FOUC
- [ ] View Transitions entre capítulos
- [ ] Rota `/quick-win` acessível com layout dedicado
- [ ] Design tokens das 4 camadas aplicados
- [ ] Componentes stubs renderizam sem erro quando usados no MDX
- [ ] Responsivo mobile-first
- [ ] Reading progress persiste em localStorage

## Spec (Token-Efficient)

### Architecture

```
Stack: Astro 5.x + MDX + Tailwind 4.x + React islands
Build: SSG (Static Site Generation)
Deploy: Vercel/Netlify (futuro)

src/
├── layouts/
│   ├── BaseLayout.astro          # HTML base, meta, dark mode, ViewTransitions
│   ├── ChapterLayout.astro       # Sidebar + TOC + progress
│   ├── ExerciseLayout.astro      # Área de exercício com timer
│   └── QuickWinLayout.astro      # Layout standalone para /quick-win
├── components/
│   ├── ui/                       # Sidebar, TOC, Breadcrumb, ProgressBar, ThemeToggle, Footer, MobileNav
│   ├── content/                  # Callout, KeyTakeaway, ComparisonTable, Checklist, TimerChallenge, QuoteBlock
│   ├── diagrams/                 # LayerDiagram, FlowDiagram (SVG wrapper), BeforeAfter, ArrowLegend, ArchitectureCard
│   └── exercises/                # ExerciseBlock, SolutionReveal, LayerFillExercise, DiagramCritique
├── content/
│   ├── config.ts                 # 2 collections: chapters + exercises
│   ├── chapters/                 # 22 diretórios com index.mdx
│   └── exercises/                # 10 exercícios guiados
├── pages/
│   ├── index.astro               # Landing page
│   ├── quick-win.astro           # Framework Mental 5 Passos
│   └── [...slug].astro           # Rotas dinâmicas
├── styles/
│   └── global.css                # Design tokens, tipografia, dark mode
└── utils/
    ├── navigation.ts             # Helpers de navegação + sidebar data
    └── diagrams.ts               # Helpers para SVGs das camadas
```

### Content Collections Schema

```
chapters: title, subtitle?, chapter, block (enum), estimatedTime, difficulty (enum), tags[], prerequisites?[], objectives[]
exercises: title, chapter (ref), exerciseNumber, scenario, timeLimit, difficulty, tags[], phases[]
```

### Design Tokens

```
4 camadas: entry (#3B82F6), service (#0D9488), data (#7C3AED), cross (#6B7280)
Setas: sync (#1F2937), async (#F59E0B)
Status: antipattern (#EF4444), correct (#22C55E)
UI: bg, bg-secondary, text, text-muted, border — light + dark variants
Fonts: Inter (corpo), JetBrains Mono (código)
```

## Next Steps

Orientação para Planning Agent:
1. Inicializar projeto Astro com `npm create astro`
2. Instalar dependências: `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/mdx`
3. Configurar `astro.config.mjs` com integrações
4. Criar design tokens em `global.css`
5. Criar layouts (Base → Chapter → Exercise → QuickWin)
6. Criar componentes por categoria (ui/ primeiro, depois content/, diagrams/, exercises/)
7. Configurar content collections com 2 schemas
8. Criar 22 capítulos placeholder com frontmatter do PRD
9. Criar 10 exercícios guiados como subpáginas
10. Criar páginas (landing, [...slug], quick-win)
11. Implementar sidebar dinâmica + View Transitions
12. Implementar dark mode toggle + reading progress (localStorage)
