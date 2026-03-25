# PRD: System Design Playbook

## Guia Prático de Raciocínio e Comunicação Visual de Arquitetura para Entrevistas Técnicas

---

## 1. Visão Geral do Produto

### 1.1 O que é

Um site estático construído com Astro que funciona como um ebook interativo para profissionais de software (SSE, Tech Lead, Principal Engineer) que estão se preparando para entrevistas de System Design. O conteúdo é agnóstico de linguagem e segmento.

O ebook é **híbrido**: ensina o profissional a **raciocinar e decompor problemas** de system design e, em seguida, a **comunicar visualmente** as soluções de forma clara, organizada e profissional durante entrevistas usando whiteboard, Miro ou Excalidraw.

### 1.2 Problema

Profissionais experientes de software frequentemente dominam arquitetura de sistemas, mas reprovam em entrevistas de System Design porque:

- Não têm um processo repetível para decompor o enunciado e organizar o raciocínio
- Não sabem fazer as perguntas certas ao entrevistador para definir escopo e escala
- Não conseguem organizar um diagrama de arquitetura de forma que o entrevistador entenda em segundos
- Não sabem decidir o que desenhar primeiro e como estruturar o canvas
- Não diferenciam visualmente comunicação síncrona de assíncrona
- Esquecem de componentes críticos (observabilidade, resiliência, idempotência)
- Não conseguem explicar verbalmente enquanto desenham, perdendo o fio da narrativa

### 1.3 Público-alvo

- Profissionais de software com 3-10+ anos de experiência
- Almejam cargos de Senior Staff Engineer, Tech Lead ou Principal Engineer
- Qualquer stack ou linguagem — conteúdo agnóstico
- Já conhecem conceitos de arquitetura (DDD, microsserviços, mensageria, caching, etc.)
- Precisam de uma **metodologia repetível** para decompor problemas e apresentar soluções visuais

### 1.4 Proposta de valor

> "Você sabe arquitetar. Agora aprenda a raciocinar com método e mostrar isso em 45 minutos de entrevista."

### 1.5 Nome do projeto

**`system-design-playbook`**

### 1.6 URL sugerida

`system-design-playbook.dev` ou deploy via Vercel/Netlify em path público

---

## 2. Arquitetura Técnica

### 2.1 Stack

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Framework | Astro 5.x | SSG perfeito para conteúdo estático, MDX nativo, performance extrema |
| Conteúdo | MDX (Markdown + componentes) | Permite misturar prosa com diagramas interativos |
| Estilização | Tailwind CSS 4.x | Utilitário, responsivo, dark mode nativo |
| Diagramas | Mermaid.js + SVGs customizados | Mermaid para fluxos simples, SVG para diagramas do framework de 4 camadas |
| Componentes interativos | React (ilhas Astro) | Apenas onde necessário: tabs, toggles de resposta, quiz |
| Deploy | Vercel ou Netlify | Zero config para Astro, preview por PR |
| Tipografia | Fontes variáveis via Google Fonts | Inter para corpo, JetBrains Mono para código |

### 2.2 Estrutura do repositório

```
system-design-playbook/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── fonts/
│   ├── og-image.png
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro          # HTML base, meta tags, dark mode
│   │   ├── ChapterLayout.astro       # Layout de capítulo com sidebar + TOC
│   │   └── ExerciseLayout.astro      # Layout de exercício com área de resposta
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Sidebar.astro         # Navegação lateral com capítulos
│   │   │   ├── TableOfContents.astro  # TOC do capítulo atual (scroll spy)
│   │   │   ├── Breadcrumb.astro
│   │   │   ├── ProgressBar.astro     # Progresso de leitura
│   │   │   ├── ThemeToggle.astro     # Dark/light mode
│   │   │   ├── Footer.astro
│   │   │   └── MobileNav.astro
│   │   ├── content/
│   │   │   ├── Callout.astro         # Blocos de destaque (dica, aviso, erro)
│   │   │   ├── KeyTakeaway.astro     # Box de resumo do capítulo
│   │   │   ├── ComparisonTable.astro # Tabela de comparação lado a lado
│   │   │   ├── Checklist.astro       # Checklist interativo com checkboxes
│   │   │   ├── TimerChallenge.tsx    # Desafio com cronômetro (React island)
│   │   │   └── QuoteBlock.astro      # Citação estilizada
│   │   ├── diagrams/
│   │   │   ├── LayerDiagram.astro    # Diagrama de 4 camadas (SVG)
│   │   │   ├── FlowDiagram.astro     # Wrapper para Mermaid com tema
│   │   │   ├── BeforeAfter.astro     # Comparação anti-padrão vs correto
│   │   │   ├── ArrowLegend.astro     # Legenda de setas (sync/async)
│   │   │   └── ArchitectureCard.astro # Card de componente de arquitetura
│   │   └── exercises/
│   │       ├── ExerciseBlock.astro        # Container de exercício
│   │       ├── SolutionReveal.tsx         # Toggle de solução (React island)
│   │       ├── LayerFillExercise.tsx      # Exercício interativo de preencher camadas (React island)
│   │       └── DiagramCritique.tsx        # Exercício de criticar diagrama (React island)
│   ├── content/
│   │   ├── config.ts                 # Schema de coleções Astro
│   │   └── chapters/
│   │       ├── 00-introducao/
│   │       │   └── index.mdx
│   │       ├── 01-guia-fundamentos/
│   │       │   └── index.mdx
│   │       ├── 02-decompondo-enunciado/
│   │       │   └── index.mdx
│   │       ├── 03-perguntas-certas/
│   │       │   └── index.mdx
│   │       ├── 04-estimando-escala/
│   │       │   └── index.mdx
│   │       ├── 05-decisoes-arquitetura/
│   │       │   └── index.mdx
│   │       ├── 06-organizando-ideias/
│   │       │   └── index.mdx
│   │       ├── 07-framework-4-camadas/
│   │       │   └── index.mdx
│   │       ├── 08-vocabulario-visual/
│   │       │   └── index.mdx
│   │       ├── 09-fluxo-de-desenho/
│   │       │   └── index.mdx
│   │       ├── 10-comunicacao-sync-async/
│   │       │   └── index.mdx
│   │       ├── 11-camada-entrada/
│   │       │   └── index.mdx
│   │       ├── 12-camada-servicos/
│   │       │   └── index.mdx
│   │       ├── 13-camada-dados/
│   │       │   └── index.mdx
│   │       ├── 14-camada-transversal/
│   │       │   └── index.mdx
│   │       ├── 15-modelo-dados-separado/
│   │       │   └── index.mdx
│   │       ├── 16-anti-padroes/
│   │       │   └── index.mdx
│   │       ├── 17-narracao-ao-vivo/
│   │       │   └── index.mdx
│   │       ├── 18-exercicios-guiados/
│   │       │   └── index.mdx
│   │       ├── 19-exercicios-livres/
│   │       │   └── index.mdx
│   │       ├── 20-checklist-final/
│   │       │   └── index.mdx
│   │       └── 21-apendices/
│   │           └── index.mdx
│   ├── pages/
│   │   ├── index.astro               # Landing page
│   │   └── [...slug].astro           # Rota dinâmica para capítulos
│   ├── styles/
│   │   └── global.css                # Tokens, tipografia, variáveis de cor
│   └── utils/
│       ├── navigation.ts             # Helpers de navegação entre capítulos
│       └── diagrams.ts               # Helpers para gerar SVGs das camadas
├── scripts/
│   └── generate-pdf.ts               # Script para gerar versão PDF (opcional)
└── README.md
```

### 2.3 Content Collections (Astro)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const chapters = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    chapter: z.number(),
    block: z.enum(['prefacio', 'raciocinio', 'visual', 'exercicios', 'apendice']),
    estimatedTime: z.string(),        // "15 min", "25 min"
    difficulty: z.enum(['fundamento', 'intermediário', 'avançado']),
    tags: z.array(z.string()),
    prerequisites: z.array(z.number()).optional(),  // capítulos anteriores
    objectives: z.array(z.string()),   // "Ao final deste capítulo você será capaz de..."
  }),
});

export const collections = { chapters };
```

### 2.4 Paleta de cores (design tokens)

A paleta reflete as cores do framework de 4 camadas, garantindo consistência entre o conteúdo escrito e os diagramas.

```css
/* src/styles/global.css */
:root {
  /* Camada 1: Entrada */
  --color-layer-entry: #3B82F6;         /* blue-500 */
  --color-layer-entry-light: #DBEAFE;   /* blue-100 */
  --color-layer-entry-dark: #1E3A5F;

  /* Camada 2: Serviços de Domínio */
  --color-layer-service: #0D9488;       /* teal-600 */
  --color-layer-service-light: #CCFBF1; /* teal-100 */
  --color-layer-service-dark: #134E4A;

  /* Camada 3: Dados */
  --color-layer-data: #7C3AED;          /* violet-600 */
  --color-layer-data-light: #EDE9FE;    /* violet-100 */
  --color-layer-data-dark: #3B1F6E;

  /* Camada 4: Transversal */
  --color-layer-cross: #6B7280;         /* gray-500 */
  --color-layer-cross-light: #F3F4F6;   /* gray-100 */
  --color-layer-cross-dark: #374151;

  /* Setas */
  --color-arrow-sync: #1F2937;          /* gray-800 */
  --color-arrow-async: #F59E0B;         /* amber-500 */

  /* Anti-padrão / Erro */
  --color-antipattern: #EF4444;         /* red-500 */
  --color-antipattern-light: #FEE2E2;

  /* Correto / Sucesso */
  --color-correct: #22C55E;             /* green-500 */
  --color-correct-light: #DCFCE7;

  /* UI geral */
  --color-bg: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-text: #111827;
  --color-text-muted: #6B7280;
  --color-border: #E5E7EB;
}

.dark {
  --color-bg: #0F172A;
  --color-bg-secondary: #1E293B;
  --color-text: #F1F5F9;
  --color-text-muted: #94A3B8;
  --color-border: #334155;
}
```

### 2.5 Componentes-chave

#### LayerDiagram (SVG)

Componente central do playbook. Renderiza o framework de 4 camadas como SVG responsivo.

```
Props:
- layers: Array<{
    id: 'entry' | 'service' | 'data' | 'cross',
    label: string,
    boxes: Array<{ name: string, description: string }>,
  }>
- arrows: Array<{
    from: string,       // id da box origem
    to: string,         // id da box destino
    type: 'sync' | 'async',
    label?: string,
  }>
- showLegend: boolean   // default true
- highlightLayer?: string // para animação de destaque
- compact?: boolean      // versão menor para inline
```

Cada camada é uma faixa horizontal com cor de fundo suave. Boxes são retângulos dentro da faixa. Setas conectam boxes entre camadas. Legenda aparece no canto inferior direito.

#### BeforeAfter

Mostra dois diagramas lado a lado: o anti-padrão (com borda vermelha e label "EVITE") e a versão corrigida (com borda verde e label "PREFIRA"). Usado extensivamente no capítulo de anti-padrões.

```
Props:
- before: { diagram: LayerDiagramProps, problems: string[] }
- after: { diagram: LayerDiagramProps, improvements: string[] }
```

#### SolutionReveal (React Island)

Toggle que esconde a solução de um exercício. O aluno tenta resolver primeiro, depois clica para revelar.

```
Props:
- buttonLabel?: string  // default "Ver solução"
- children: ReactNode   // conteúdo da solução
```

Estado inicial: colapsado. Ao clicar, expande com animação suave. Inclui aviso: "Tente resolver antes de ver a solução."

#### TimerChallenge (React Island)

Exercício cronometrado que simula pressão de entrevista.

```
Props:
- timeLimit: number      // segundos (ex: 120 para 2min)
- challenge: string      // descrição do desafio
- phases: string[]       // fases esperadas (ex: ["Dividir canvas", "Preencher Camada 1", ...])
```

---

## 3. Estrutura de Conteúdo

O ebook se organiza em **3 blocos principais** + exercícios + apêndices:

```
PREFÁCIO / REFERÊNCIA
  00. Introdução
  01. Guia de Fundamentos

BLOCO 1: O RACIOCÍNIO (como pensar antes de desenhar)
  02. Decompondo o Enunciado
  03. As Perguntas Certas
  04. Estimando Escala
  05. Tomando Decisões de Arquitetura
  06. Organizando as Ideias
  [Quick Win: Framework Mental de 5 Passos — página única consultável]

BLOCO 2: A METODOLOGIA VISUAL (como apresentar)
  07. O Framework de 4 Camadas
  08. Vocabulário Visual
  09. O Fluxo de Desenho
  10. Comunicação Síncrona vs Assíncrona
  11. Camada de Entrada em Profundidade
  12. Camada de Serviços em Profundidade
  13. Camada de Dados em Profundidade
  14. Camada Transversal em Profundidade
  15. Modelo de Dados Separado
  16. Anti-padrões Visuais
  17. Narração ao Vivo

BLOCO 3: EXERCÍCIOS PRÁTICOS
  18. Exercícios Guiados (passo a passo incremental)
  19. Exercícios Livres (simulação de entrevista)

APÊNDICES
  20. Checklist Final de Validação
  21. Apêndices (templates, glossário, referências)
```

---

## 4. Conteúdo dos Capítulos (Especificação Completa)

### PREFÁCIO / REFERÊNCIA

---

### Capítulo 0: Introdução

**Arquivo:** `src/content/chapters/00-introducao/index.mdx`

**Frontmatter:**
```yaml
title: "Você sabe arquitetar. Agora aprenda a raciocinar com método e mostrar."
chapter: 0
block: "prefacio"
estimatedTime: "10 min"
difficulty: "fundamento"
tags: ["motivação", "contexto"]
objectives:
  - "Entender por que entrevistas de system design reprovam profissionais experientes"
  - "Conhecer os 3 blocos do ebook: raciocínio, metodologia visual e prática"
  - "Saber exatamente o que este guia vai e não vai ensinar"
```

**Conteúdo a ser escrito:**

1. **O gap invisível** — Narrativa sobre o problema: profissionais experientes que dominam arquitetura mas travam na entrevista. O problema não é falta de conhecimento — é falta de um sistema repetível para decompor o problema, organizar o raciocínio e comunicar visualmente. Duas skills separadas: saber arquitetar e saber apresentar arquitetura.

2. **O que este guia é (e o que não é):**
   - É: um playbook prático com metodologia de raciocínio + comunicação visual
   - É: focado em entrevistas técnicas de 45-60 minutos
   - É: agnóstico de stack, linguagem e segmento
   - Não é: curso de arquitetura de software (você já sabe isso)
   - Não é: guia de design gráfico ou UX
   - Não é: preparação de system design do zero (assuma experiência prévia)

3. **Os 3 blocos do ebook:**
   - **Bloco 1 — O Raciocínio:** como decompor o enunciado, fazer perguntas certas, estimar escala e tomar decisões antes de tocar no quadro
   - **Bloco 2 — A Metodologia Visual:** o framework de 4 camadas, vocabulário visual, fluxo de desenho, narração ao vivo
   - **Bloco 3 — Prática:** exercícios guiados passo a passo e exercícios livres simulando entrevista real

4. **Preview do framework de 4 camadas** — Diagrama SVG mostrando as 4 faixas horizontais com cores, labels e exemplos genéricos. Explicar que este modelo será a ferramenta visual central do guia.

5. **Como usar este guia:**
   - Leitura sequencial na primeira vez (capítulos 0-17)
   - Exercícios guiados (capítulo 18) para fixar
   - Exercícios livres (capítulo 19) para simular entrevista real
   - Checklist + Quick Win (capítulo 20-21) para revisar antes da entrevista
   - O Framework Mental de 5 Passos como consulta rápida a qualquer momento

6. **Resultado esperado** — "Quando você conseguir, dado qualquer enunciado de system design: decompor os requisitos em 2 minutos, fazer as perguntas certas, estimar escala, dividir o canvas em 4 camadas, preencher de cima pra baixo, diferenciar sync/async visualmente, e narrar enquanto desenha — você está pronto."

**Componentes usados:** `LayerDiagram` (preview), `Callout` (avisos), `KeyTakeaway`

---

### Capítulo 1: Guia de Fundamentos

**Arquivo:** `src/content/chapters/01-guia-fundamentos/index.mdx`

**Frontmatter:**
```yaml
title: "Guia de Fundamentos"
subtitle: "Referência rápida dos conceitos que aparecem em entrevistas"
chapter: 1
block: "prefacio"
estimatedTime: "20 min"
difficulty: "fundamento"
tags: ["fundamentos", "referência", "conceitos"]
objectives:
  - "Ter uma referência de consulta rápida dos conceitos essenciais"
  - "Saber quando cada conceito aparece em entrevistas de system design"
  - "Identificar gaps no seu conhecimento para estudo complementar"
```

**Conteúdo a ser escrito:**

Este capítulo NÃO é um curso. É uma referência de consulta rápida. Cada tópico segue o formato: conceito em 1-2 parágrafos + diagrama simples + "quando isso aparece em entrevista". Futuramente, cada tópico pode virar um capítulo dedicado.

**Tópicos:**

1. **CAP Theorem** — Consistência, disponibilidade, tolerância a partição. Em entrevista: quando o entrevistador pergunta "o que acontece se uma réplica cai?" ou "como você lida com partição de rede?"

2. **Escalabilidade horizontal vs vertical** — Scale out vs scale up. Em entrevista: quando pedem para lidar com 10x ou 100x de volume.

3. **Load balancing** — Estratégias (round robin, least connections, consistent hashing). Em entrevista: quando há múltiplas instâncias de um serviço.

4. **Caching strategies** — Cache-aside, write-through, write-behind, cache invalidation. Em entrevista: quando latência importa ou há hot data.

5. **Database sharding e partitioning** — Horizontal vs vertical, partition key. Em entrevista: quando o volume de dados é grande demais para um único nó.

6. **Consistência eventual vs forte** — Trade-off com disponibilidade. Em entrevista: em sistemas distribuídos com replicação.

7. **SQL vs NoSQL** — Critérios de decisão (ACID, schema, escala, padrão de acesso). Em entrevista: toda vez que você escolhe um storage.

8. **Message queues vs event streaming** — RabbitMQ/SQS vs Kafka. Semântica de entrega, ordering, replay. Em entrevista: quando há comunicação assíncrona.

9. **Padrões de resiliência** — Circuit breaker, retry com backoff, bulkhead, timeout, fallback. Em entrevista: quando perguntam "e se o serviço X cair?"

10. **CQRS e Event Sourcing** — Separação de leitura/escrita, log de eventos como source of truth. Em entrevista: em cenários com volumes diferentes de read/write.

11. **Idempotência** — Operações que podem ser repetidas sem efeito colateral. Em entrevista: em processamento de pagamentos, retry, mensageria.

12. **Rate limiting** — Algoritmos (token bucket, sliding window, fixed window). Em entrevista: proteção de APIs, SLA, fair usage.

**Componentes usados:** `Callout`, `ComparisonTable`, `FlowDiagram` (Mermaid), `KeyTakeaway`

---

### BLOCO 1: O RACIOCÍNIO

---

### Capítulo 2: Decompondo o Enunciado

**Arquivo:** `src/content/chapters/02-decompondo-enunciado/index.mdx`

**Frontmatter:**
```yaml
title: "Decompondo o Enunciado"
subtitle: "Como extrair o que importa de qualquer problema de system design"
chapter: 2
block: "raciocinio"
estimatedTime: "20 min"
difficulty: "fundamento"
tags: ["requisitos", "enunciado", "decomposição", "funcional", "não-funcional"]
objectives:
  - "Extrair requisitos funcionais e não-funcionais de qualquer enunciado"
  - "Separar o que é explícito do que precisa ser perguntado"
  - "Ter um processo repetível para os primeiros 2 minutos da entrevista"
```

**Conteúdo a ser escrito:**

1. **Os primeiros 2 minutos definem tudo** — A maioria dos candidatos começa a desenhar imediatamente. Os melhores candidatos investem 2-3 minutos decomponendo o enunciado antes de tocar no quadro. Essa etapa é invisível mas determina a qualidade de tudo que vem depois.

2. **Requisitos funcionais** — O que o sistema FAZ:
   - Identificar os verbos do enunciado: "processar", "enviar", "consultar", "armazenar"
   - Para cada verbo, perguntar: quem faz? o que? com que frequência?
   - Técnica: listar 3-5 requisitos funcionais core — se tem mais, o escopo está largo demais para 45 minutos
   - Exemplo: dado o enunciado "Design a URL shortener", os requisitos funcionais são: encurtar URL, redirecionar URL, analytics de acesso (opcional)

3. **Requisitos não-funcionais** — Como o sistema se COMPORTA:
   - Latência: qual o tempo aceitável de resposta?
   - Disponibilidade: pode ter downtime? Qual o SLA?
   - Consistência: eventual ou forte?
   - Durabilidade: dados podem ser perdidos?
   - Escala: quantos usuários? quantos requests por segundo?
   - Técnica: listar 2-3 requisitos não-funcionais críticos que direcionam as decisões de arquitetura

4. **O explícito vs o implícito** — O enunciado diz "sistema de chat". Mas não diz: mensagens em grupo? Leitura offline? Histórico? Notificação push? Envio de mídia? A maioria das decisões de arquitetura depende dessas respostas. Treinar o olho para identificar o que está faltando.

5. **Template de decomposição:**
   ```
   ENUNCIADO: [problema]
   REQUISITOS FUNCIONAIS:
     1. [ação principal]
     2. [ação secundária]
     3. [ação terciária]
   REQUISITOS NÃO-FUNCIONAIS:
     - Escala: [estimativa]
     - Latência: [target]
     - Disponibilidade: [SLA]
   PERGUNTAS PARA O ENTREVISTADOR:
     1. [escopo]
     2. [escala]
     3. [prioridade]
   ```

6. **Exercício: Decompor 3 enunciados** — Dado 3 enunciados crus (URL shortener, notification system, chat system), listar requisitos funcionais, não-funcionais e perguntas para o entrevistador. Comparar com solução de referência.

**Componentes usados:** `Callout`, `ExerciseBlock`, `SolutionReveal`, `KeyTakeaway`

---

### Capítulo 3: As Perguntas Certas

**Arquivo:** `src/content/chapters/03-perguntas-certas/index.mdx`

**Frontmatter:**
```yaml
title: "As Perguntas Certas"
subtitle: "O que perguntar ao entrevistador para definir escopo e escala"
chapter: 3
block: "raciocinio"
estimatedTime: "15 min"
difficulty: "fundamento"
tags: ["perguntas", "escopo", "escala", "entrevistador"]
prerequisites: [2]
objectives:
  - "Saber fazer as perguntas que definem escopo, escala e prioridades"
  - "Entender como as respostas direcionam decisões de arquitetura"
  - "Nunca mais começar a desenhar sem ter feito pelo menos 5 perguntas"
```

**Conteúdo a ser escrito:**

1. **Por que perguntar é tão importante** — O entrevistador espera que você pergunte. Candidatos que mergulham direto sem perguntar perdem a chance de demonstrar maturidade. As perguntas mostram que você pensa em restrições, escala e trade-offs — não só em funcionalidade.

2. **4 categorias de perguntas:**

   - **Escopo:** "Quem são os usuários? Quantos? Qual a distribuição geográfica?" / "Quais funcionalidades são core vs nice-to-have?" / "É B2C, B2B ou interno?"
   - **Escala:** "Quantas requisições por segundo estamos projetando?" / "Qual o volume de dados armazenados?" / "Qual o crescimento esperado (1 ano, 5 anos)?"
   - **Prioridade:** "O que é mais crítico: latência ou consistência?" / "Disponibilidade ou durabilidade?" / "Custo ou performance?"
   - **Restrição:** "Existe SLA definido?" / "Há requisitos regulatórios (LGPD, PCI-DSS)?" / "Integrações obrigatórias com sistemas existentes?" / "Há budget ou limitação de infraestrutura?"

3. **Como as respostas mudam a arquitetura:**
   - "1.000 QPS" → provavelmente não precisa de sharding → pode usar um único PostgreSQL
   - "1.000.000 QPS" → precisa de cache agressivo, CDN, load balancer, possivelmente sharding
   - "Latência < 100ms" → cache obrigatório, talvez pré-computação
   - "Consistência eventual é OK" → pode usar replicação async, event sourcing
   - Tabela de decisão: resposta do entrevistador → implicação arquitetural

4. **Perguntas que impressionam** — Ir além do óbvio:
   - "Qual o ratio de read vs write?" (define se CQRS faz sentido)
   - "Os dados são imutáveis ou atualizáveis?" (define storage model)
   - "Precisa de real-time ou near-real-time é suficiente?" (define se WebSocket ou polling)
   - "Qual o tamanho médio de cada request/entidade?" (define storage e bandwidth)

5. **Exercício: Formulação de perguntas** — Dado 2 cenários (rate limiter distribuído, sistema de reservas), formular as 8 perguntas mais importantes e explicar como cada resposta influenciaria a arquitetura.

**Componentes usados:** `ComparisonTable`, `ExerciseBlock`, `SolutionReveal`, `Callout`

---

### Capítulo 4: Estimando Escala (Back-of-the-Envelope)

**Arquivo:** `src/content/chapters/04-estimando-escala/index.mdx`

**Frontmatter:**
```yaml
title: "Estimando Escala"
subtitle: "Cálculos rápidos que guiam decisões de arquitetura"
chapter: 4
block: "raciocinio"
estimatedTime: "20 min"
difficulty: "intermediário"
tags: ["escala", "estimativa", "QPS", "storage", "bandwidth", "back-of-the-envelope"]
prerequisites: [2, 3]
objectives:
  - "Fazer cálculos rápidos de QPS, storage e bandwidth"
  - "Ter os números de referência na cabeça (latência, tamanhos, volumes)"
  - "Saber como a estimativa de escala influencia escolhas de arquitetura"
```

**Conteúdo a ser escrito:**

1. **Por que estimar escala** — A escala define se você precisa de cache, sharding, CDN, filas, ou se um monolito simples resolve. Sem essa estimativa, suas decisões são arbitrárias. O entrevistador quer ver que suas escolhas são fundamentadas em números, não em preferência pessoal.

2. **Números que todo candidato deveria ter na cabeça:**
   - Latência: L1 cache (~1ns), RAM (~100ns), SSD (~100μs), HDD (~10ms), rede dentro do datacenter (~0.5ms), rede entre continentes (~150ms)
   - Tamanhos: 1 char = 1 byte (ASCII) / 2-4 bytes (UTF-8), UUID = 16 bytes, timestamp = 8 bytes, imagem média = 300KB, vídeo curto = 5MB
   - Escala: 1 dia = 86.400 segundos (~100K), 1 mês = 2.5M segundos, 1 ano = 31.5M segundos
   - Regra dos 80/20: 80% do tráfego em 20% do tempo (pico = ~4x a média)

3. **Como calcular QPS:**
   - Fórmula: DAU × ações por usuário por dia / 86.400
   - Exemplo: 10M DAU, cada um faz 5 consultas/dia → ~580 QPS médio → ~2.300 QPS pico (4x)
   - Exemplo: 100M DAU, cada um envia 40 mensagens/dia → ~46.000 QPS médio → ~185.000 QPS pico

4. **Como calcular storage:**
   - Fórmula: volume por unidade × quantidade de unidades × retenção
   - Exemplo URL shortener: 100M URLs/ano × 500 bytes cada = 50GB/ano. Em 5 anos = 250GB. Cabe num único banco.
   - Exemplo chat: 100M DAU × 40 msg/dia × 100 bytes = 400GB/dia. Em 5 anos = ~700TB. Precisa de sharding.

5. **Como a escala influencia decisões:**
   - < 1.000 QPS → um banco, sem cache obrigatório
   - 1.000-10.000 QPS → cache (Redis), read replicas, connection pooling
   - 10.000-100.000 QPS → sharding, CDN, message queue para writes async
   - > 100.000 QPS → arquitetura altamente distribuída, eventual consistency, múltiplos datacenters
   - Tabela de decisão com thresholds e componentes recomendados

6. **Exercício: Estimar escala para 3 cenários** — URL shortener (100M URLs/mês), Instagram-like feed (50M DAU), sistema de pagamentos (500K transações/dia). Para cada: calcular QPS, storage (1 ano e 5 anos), decidir quais componentes a escala exige.

**Componentes usados:** `ComparisonTable`, `Callout`, `ExerciseBlock`, `SolutionReveal`, `KeyTakeaway`

---

### Capítulo 5: Tomando Decisões de Arquitetura

**Arquivo:** `src/content/chapters/05-decisoes-arquitetura/index.mdx`

**Frontmatter:**
```yaml
title: "Tomando Decisões de Arquitetura"
subtitle: "Como decidir e como argumentar: trade-offs são a linguagem da entrevista"
chapter: 5
block: "raciocinio"
estimatedTime: "25 min"
difficulty: "intermediário"
tags: ["decisões", "trade-offs", "SQL", "NoSQL", "sync", "async", "microsserviços"]
prerequisites: [2, 3, 4]
objectives:
  - "Ter frameworks de decisão para as escolhas mais comuns em entrevistas"
  - "Saber argumentar com trade-offs, não com preferências pessoais"
  - "Entender que o entrevistador avalia o raciocínio, não a resposta certa"
```

**Conteúdo a ser escrito:**

1. **Trade-offs são a linguagem da entrevista** — Não existe resposta certa em system design. Existe resposta fundamentada. O entrevistador quer ouvir: "Escolhi X porque [razão], apesar de [desvantagem], que mitigo com [estratégia]." Essa estrutura vale para TODA decisão.

2. **SQL vs NoSQL — framework de decisão:**
   - SQL quando: transações ACID, dados relacionais, queries complexas, schema estável
   - NoSQL quando: escala horizontal, schema flexível, acesso por key, alta escrita
   - A pergunta-chave: "Quais são os padrões de acesso?" (se é por key → NoSQL pode servir; se precisa de JOINs → SQL)
   - Tabela de decisão com cenários

3. **Sync vs Async — framework de decisão:**
   - Sync quando: resposta necessária para continuar, operação rápida, feedback imediato ao usuário
   - Async quando: processamento longo, desacoplamento, garantia de entrega > latência, fan-out
   - A pergunta-chave: "O chamador precisa esperar a resposta?"
   - Tabela de decisão com cenários

4. **Monolito vs Microsserviços — para contexto de entrevista:**
   - Entrevistas de system design geralmente esperam uma arquitetura de serviços
   - Mas saber dizer "isso poderia começar como monolito e evoluir" demonstra maturidade
   - Framework: 1-2 domínios bem definidos = monolito. 3+ domínios independentes com times diferentes = microsserviços.
   - Em entrevista: desenhe serviços, mas esteja preparado para justificar a granularidade

5. **Outras decisões comuns:**
   - Push vs Pull (para feeds, notificações)
   - Orquestração vs Coreografia (para workflows)
   - Cache: onde colocar? TTL ou invalidação?
   - Replicação: sync ou async? Quantas réplicas?

6. **A estrutura de argumentação:**
   ```
   "Escolhi [X] porque [razão baseada em requisitos].
   O trade-off é [desvantagem de X].
   Para mitigar, [estratégia de mitigação].
   Se precisássemos de [alternativa], poderíamos usar [Y]."
   ```

7. **Exercício: Justificar 5 decisões** — Dado um cenário (sistema de e-commerce com 10M DAU), o leitor deve justificar 5 escolhas usando a estrutura de argumentação. Comparar com solução de referência.

**Componentes usados:** `ComparisonTable`, `Callout`, `ExerciseBlock`, `SolutionReveal`, `KeyTakeaway`, `QuoteBlock`

---

### Capítulo 6: Organizando as Ideias Antes do Quadro

**Arquivo:** `src/content/chapters/06-organizando-ideias/index.mdx`

**Frontmatter:**
```yaml
title: "Organizando as Ideias Antes do Quadro"
subtitle: "O momento entre pensar e desenhar — quando você sabe que está pronto"
chapter: 6
block: "raciocinio"
estimatedTime: "15 min"
difficulty: "fundamento"
tags: ["organização", "rascunho mental", "transição", "planejamento"]
prerequisites: [2, 3, 4, 5]
objectives:
  - "Saber montar um esqueleto mental antes de tocar no canvas"
  - "Ter critérios claros para saber quando está pronto para começar a desenhar"
  - "Dominar a transição fluida do raciocínio para o desenho"
```

**Conteúdo a ser escrito:**

1. **O minuto de silêncio intencional** — Depois de decompor o enunciado, fazer perguntas e estimar escala, há um momento de organização mental. Não é travamento — é planejamento. Candidatos maduros avisam o entrevistador: "Vou levar 30 segundos para organizar meu approach, e depois começo a desenhar." Isso é profissional, não fraqueza.

2. **Técnica do rascunho mental:**
   - Listar mentalmente os 4-6 componentes principais
   - Classificar cada um nas 4 camadas (entrada, domínio, dados, transversal)
   - Definir o happy path: qual ator inicia? O que acontece passo a passo até a resposta?
   - Identificar a comunicação: quais conexões são sync? quais são async?
   - Resultado: você deve ter na cabeça um "diagrama fantasma" antes de desenhar

3. **Critérios de prontidão — quando começar a desenhar:**
   - Sei quem são os atores (pontos de entrada)
   - Sei quais são os 3-5 serviços principais
   - Sei qual é o happy path
   - Sei onde estão os dados
   - Se falta algum desses: volte às perguntas (capítulo 3)

4. **A transição: do raciocínio ao canvas:**
   - Frase de abertura: "Vou estruturar a solução em camadas, começando pelos pontos de entrada e descendo até a camada de dados."
   - Primeira ação no quadro: dividir as 4 faixas (Camada 1-4). Isso já demonstra organização ao entrevistador
   - A partir daqui: entra o Bloco 2 (metodologia visual)

5. **O Framework Mental Quick Win (preview):**
   - Preview do framework de 5 passos que será detalhado nos apêndices
   - 1-ESCOPO → 2-ESCALA → 3-COMPONENTES → 4-FLUXO → 5-TRADE-OFFS
   - Este é o resumo de tudo que o Bloco 1 ensina, compactado em 1 página para consulta rápida

6. **Exercício: Rascunho mental cronometrado** — Dado um enunciado (design a parking lot system), o leitor tem 3 minutos para listar componentes, classificar em camadas e definir o happy path. SEM desenhar. Depois, comparar com solução de referência. Usar `TimerChallenge`.

**Componentes usados:** `TimerChallenge`, `Callout`, `ExerciseBlock`, `SolutionReveal`, `KeyTakeaway`

---

### BLOCO 2: A METODOLOGIA VISUAL

---

### Capítulo 7: O Framework de 4 Camadas

**Arquivo:** `src/content/chapters/07-framework-4-camadas/index.mdx`

**Frontmatter:**
```yaml
title: "O Framework de 4 Camadas"
subtitle: "Seu modelo mental visual para qualquer system design"
chapter: 7
block: "visual"
estimatedTime: "20 min"
difficulty: "fundamento"
tags: ["framework", "camadas", "modelo mental"]
prerequisites: [6]
objectives:
  - "Memorizar as 4 camadas e seus papéis"
  - "Saber quais componentes pertencem a cada camada"
  - "Dividir um canvas em branco em 4 faixas em menos de 30 segundos"
```

**Conteúdo a ser escrito:**

1. **Por que camadas?** — O cérebro humano processa informação hierarquicamente. Entrevistadores avaliam se você tem um modelo mental organizado. Camadas de cima pra baixo = fluxo natural de dados (quem pede, quem processa, onde guarda). A estrutura em camadas transforma um canvas em branco intimidador em um formulário a ser preenchido.

2. **Camada 1: Entrada (AZUL)** — Detalhamento completo:
   - O que colocar: usuários (mobile/web), APIs externas, webhooks, jobs agendados (cron), eventos externos
   - Regra visual: máximo 3-4 boxes nesta camada. Se tem mais pontos de entrada, agrupar por tipo
   - Erro comum: misturar pontos de entrada com serviços. API Gateway é entrada, não serviço de domínio

3. **Camada 2: Serviços de Domínio (VERDE/TEAL)** — Detalhamento:
   - O que colocar: microsserviços, módulos, bounded contexts
   - Regra da box: nome + responsabilidade em 3-5 palavras
   - Máximo 4-5 serviços. Se precisa de mais, você está detalhando demais para uma entrevista
   - Dica: nomeie pelo domínio de negócio, não pela tecnologia
   - Como agrupar: por bounded context do DDD, nunca por tecnologia

4. **Camada 3: Dados (ROXO)** — Detalhamento:
   - O que colocar: bancos relacionais, NoSQL, cache, filas/tópicos, object storage
   - Importante: filas e tópicos ficam aqui, NÃO na camada de serviços. Kafka é infraestrutura de dados, não serviço de domínio
   - Regra visual: diferenciar o tipo de storage com forma ou ícone (cilindro para banco, retângulo com ondas para fila, nuvem para object storage)
   - Erro comum: esquecer do cache

5. **Camada 4: Transversal (CINZA)** — Detalhamento:
   - O que colocar: observabilidade, auth/authz, rate limiting, circuit breaker, config centralizada, secrets manager
   - Representação visual: faixa tracejada na base do diagrama, cruzando toda a largura
   - Não usar boxes individuais para cada tool. Agrupar por categoria
   - Dica de entrevista: mencionar esta camada proativamente impressiona

6. **Exercício rápido: Memorização** — Sem olhar o texto acima, preencher um diagrama vazio com as 4 camadas para um cenário genérico. Usar componente `LayerFillExercise`.

**Componentes usados:** `LayerDiagram` (4 variações), `Callout`, `Checklist`, `LayerFillExercise`, `KeyTakeaway`

---

### Capítulo 8: Vocabulário Visual

**Arquivo:** `src/content/chapters/08-vocabulario-visual/index.mdx`

**Frontmatter:**
```yaml
title: "Vocabulário Visual"
subtitle: "As peças do seu kit de desenho"
chapter: 8
block: "visual"
estimatedTime: "15 min"
difficulty: "fundamento"
tags: ["visual", "boxes", "setas", "legenda", "cores"]
prerequisites: [7]
objectives:
  - "Dominar os 6 elementos visuais que compõem qualquer diagrama de arquitetura"
  - "Saber quando usar cada forma e cor"
  - "Nunca mais esquecer a legenda"
```

**Conteúdo a ser escrito:**

1. **Os 6 elementos visuais** — Catálogo completo com SVG de exemplo para cada:
   - **Box retangular**: serviços, APIs, aplicações. Sempre com nome + descrição curta (2 infos max)
   - **Cilindro**: bancos de dados (relacional e NoSQL)
   - **Retângulo com ondas / paralelogramo**: filas e tópicos (Kafka, SQS, RabbitMQ)
   - **Nuvem**: serviços externos, object storage
   - **Seta contínua**: comunicação síncrona (REST, gRPC). Cor escura
   - **Seta tracejada**: comunicação assíncrona (eventos, filas). Cor âmbar/laranja
   - **Faixa tracejada**: componentes transversais

2. **Regra de ouro das boxes** — Duas informações por box, no máximo. Mostrar exemplos bons e ruins:
   - Bom: `Payment Service | Processa transações`
   - Ruim: `Payment Service | Kotlin + Spring Boot | Processa transações | Deploy em K8s | Usa PostgreSQL`
   - Por que: o entrevistador precisa fazer scan visual rápido. Excesso de info = ruído

3. **A legenda obrigatória** — Sempre, SEMPRE incluir legenda no canto inferior direito:
   - Linha contínua = síncrono (REST/gRPC)
   - Linha tracejada = assíncrono (Kafka/filas)
   - Cores por camada
   - Mostrar template de legenda pronto para copiar

4. **Cores por categoria, não por sequência:**
   - Errado: cores diferentes para cada box na ordem que foram desenhadas
   - Certo: mesma cor para todos os componentes do mesmo tipo/camada
   - Exemplo visual comparativo

5. **Tamanho e espaçamento** — Regras práticas:
   - Boxes do mesmo tamanho dentro da mesma camada
   - Espaçamento uniforme entre boxes
   - Mínimo 2 cm de margem entre camadas (em whiteboard físico)
   - Setas devem ter espaço para o label sem sobrepor boxes

**Componentes usados:** `ArrowLegend`, `ComparisonTable`, `BeforeAfter`, diagramas SVG inline

---

### Capítulo 9: O Fluxo de Desenho

**Arquivo:** `src/content/chapters/09-fluxo-de-desenho/index.mdx`

**Frontmatter:**
```yaml
title: "O Fluxo de Desenho"
subtitle: "A ordem importa: como preencher o canvas passo a passo"
chapter: 9
block: "visual"
estimatedTime: "20 min"
difficulty: "fundamento"
tags: ["processo", "passo a passo", "canvas"]
prerequisites: [7, 8]
objectives:
  - "Ter um processo repetível para preencher qualquer diagrama"
  - "Saber o que desenhar primeiro e o que deixar para o final"
  - "Nunca mais travar diante de um canvas em branco"
```

**Conteúdo a ser escrito:**

1. **O processo orgânico de construção do diagrama:**

   - **Dividir o canvas** — Antes de qualquer box, trace linhas horizontais dividindo o canvas em faixas. Escreva os labels das camadas na lateral esquerda. Isso já mostra ao entrevistador que você tem um modelo mental. DICA: faça isso enquanto o entrevistador ainda está explicando o problema.

   - **Identificar os atores** — Pergunte ao entrevistador: "Quem inicia o fluxo?" Desenhe os pontos de entrada na Camada 1. Não precisa de detalhes ainda, só identificar quem dispara.

   - **Happy path primeiro** — Desenhe o fluxo principal de sucesso. Só o caminho feliz. Nada de edge cases ainda. Coloque os serviços de domínio na Camada 2 e conecte com setas.

   - **Dados e persistência** — Para cada serviço da Camada 2, pergunte: "Onde esse dado vive?" Desenhe os storages na Camada 3. Conecte com setas.

   - **Classificar as setas** — Revise TODAS as setas. Para cada uma, decida: é síncrona ou assíncrona? Mude o estilo (contínua vs tracejada) e adicione labels.

   - **Transversal** — Com o diagrama principal pronto, adicione a faixa transversal: observabilidade, auth, resiliência, rate limiting.

   - **Legenda + revisão** — Adicione a legenda. Revise o diagrama todo. Pergunte-se: "Um desconhecido entenderia isso em 10 segundos?"

   Nota: estes passos são um guia, não uma camisa de força. O número de passos varia conforme a complexidade do problema. O importante é a ordem: entrada → domínio → dados → transversal → legenda.

2. **Demonstração passo a passo** — Exemplo completo: "Notification System". Mostrar SVGs incrementais, um para cada passo, com o diagrama sendo construído progressivamente. Cada SVG adiciona elementos ao anterior.

3. **Regras de timing para entrevista de 45 min:**
   - 0-5 min: Entender o problema, fazer perguntas de escopo (Bloco 1)
   - 5-20 min: Diagrama high-level (passos acima)
   - 20-35 min: Deep dive em 1-2 componentes (o entrevistador vai pedir)
   - 35-45 min: Trade-offs, escalabilidade, o que mudaria com 10x/100x volume

4. **O que NÃO fazer nos primeiros 5 minutos:**
   - Não comece a desenhar sem entender o escopo
   - Não mergulhe em detalhes de um serviço específico
   - Não discuta tecnologias antes de ter a visão geral
   - Não desenhe modelo de dados antes do diagrama de arquitetura

**Componentes usados:** `LayerDiagram` (versões incrementais), `TimerChallenge`, `Callout`, `KeyTakeaway`

---

### Capítulo 10: Comunicação Síncrona vs Assíncrona

**Arquivo:** `src/content/chapters/10-comunicacao-sync-async/index.mdx`

**Frontmatter:**
```yaml
title: "Comunicação Síncrona vs Assíncrona"
subtitle: "A diferença que separa diagramas amadores de profissionais"
chapter: 10
block: "visual"
estimatedTime: "20 min"
difficulty: "intermediário"
tags: ["sync", "async", "kafka", "rest", "grpc", "filas"]
prerequisites: [8]
objectives:
  - "Saber decidir quando usar comunicação sync vs async em cada seta"
  - "Representar visualmente a diferença de forma inequívoca"
  - "Explicar verbalmente o trade-off de cada escolha"
```

**Conteúdo a ser escrito:**

1. **A regra visual** — Detalhamento do sistema de setas com diagrama SVG grande:
   - Seta contínua + cor escura = síncrono. Label: protocolo (REST, gRPC). Semântica: "eu espero a resposta"
   - Seta tracejada + cor âmbar = assíncrono. Label: mecanismo (Kafka, SQS, RabbitMQ). Semântica: "eu disparo e sigo"
   - Sempre colocar o label na seta, nunca assumir que o entrevistador vai adivinhar

2. **Quando usar cada um** — Tabela de decisão:
   - Sync quando: o cliente precisa da resposta para continuar, operação é rápida (<500ms), erros precisam de feedback imediato
   - Async quando: processamento demorado, sistemas desacoplados, garantia de entrega importa mais que latência, fan-out para múltiplos consumidores
   - Exemplos variados: consulta de saldo (sync), processamento de pagamento (async), validação de input (sync), envio de email (async), análise de fraude (pode ser ambos, dependendo do SLA)

3. **Padrões comuns:**
   - Request-Reply síncrono: Client -> API Gateway -> Service -> resposta
   - Fire-and-forget: Service A -> Message Queue -> Service B
   - Saga orquestrada: Orchestrator chama serviços sequencialmente (sync) mas cada etapa publica eventos (async)
   - CQRS: Write path async (evento -> projeção), Read path sync (query direto)
   - Cada padrão com diagrama SVG mostrando as setas corretamente

4. **O erro mais comum** — Desenhar tudo como seta contínua (tudo sync) ou tudo tracejada (tudo async). O entrevistador quer ver que você PENSA sobre a natureza de cada comunicação. Mostrar exemplo `BeforeAfter`.

5. **Exercício: Classificar setas** — Dado um diagrama com 8 setas sem estilo, o aluno deve classificar cada uma como sync ou async e justificar. Usar `DiagramCritique`.

**Componentes usados:** `ArrowLegend`, `ComparisonTable`, `BeforeAfter`, `DiagramCritique`, `FlowDiagram` (Mermaid)

---

### Capítulo 11: Camada de Entrada em Profundidade

**Arquivo:** `src/content/chapters/11-camada-entrada/index.mdx`

**Frontmatter:**
```yaml
title: "Camada de Entrada em Profundidade"
subtitle: "Quem dispara o fluxo? Desenhando pontos de entrada"
chapter: 11
block: "visual"
estimatedTime: "15 min"
difficulty: "intermediário"
tags: ["entrada", "api gateway", "webhook", "mobile", "web"]
prerequisites: [7, 9]
objectives:
  - "Mapear todos os pontos de entrada de um sistema"
  - "Saber quando usar API Gateway, BFF, ou acesso direto"
  - "Representar diferentes tipos de clientes visualmente"
```

**Conteúdo a ser escrito:**

1. **Tipos de ponto de entrada:**
   - Apps mobile (iOS/Android) — via BFF ou API Gateway
   - Web app (dashboard, portal, SPA)
   - Webhooks recebidos (callbacks de sistemas externos)
   - APIs B2B (integração com parceiros)
   - Jobs agendados (cron, batch)
   - Eventos externos (notificações de sistemas regulatórios, feeds de dados)

2. **API Gateway vs BFF** — Quando desenhar cada um:
   - API Gateway: quando há múltiplos clientes consumindo os mesmos serviços
   - BFF (Backend for Frontend): quando mobile e web têm necessidades diferentes
   - Diagrama mostrando as duas abordagens

3. **Regras visuais para a Camada 1:**
   - Usar ícones simples e reconhecíveis (celular, monitor, relógio, globo)
   - Agrupar clientes similares (não desenhar "iOS" e "Android" separados, use "App Mobile")
   - API Gateway pode ser a fronteira entre Camada 1 e Camada 2
   - Label de protocolo na seta de entrada (HTTPS, WebSocket, gRPC)

4. **Exemplo completo** — Diagrama da Camada 1 para um sistema de e-commerce: App Mobile, Web App, Webhook de pagamento, API B2B (marketplace), Job de reconciliação. Mostrar como organizar visualmente.

**Componentes usados:** `LayerDiagram` (foco na Camada 1), `ComparisonTable`, `Callout`

---

### Capítulo 12: Camada de Serviços em Profundidade

**Arquivo:** `src/content/chapters/12-camada-servicos/index.mdx`

**Frontmatter:**
```yaml
title: "Camada de Serviços de Domínio em Profundidade"
subtitle: "O coração do sistema: quem processa o quê"
chapter: 12
block: "visual"
estimatedTime: "25 min"
difficulty: "intermediário"
tags: ["serviços", "microsserviços", "DDD", "bounded context"]
prerequisites: [7, 9]
objectives:
  - "Decidir a granularidade dos serviços para uma entrevista"
  - "Nomear serviços pelo domínio, não pela tecnologia"
  - "Saber quando quebrar e quando manter junto"
```

**Conteúdo a ser escrito:**

1. **Granularidade para entrevista** — Não é deploy, é comunicação:
   - Numa entrevista de 45 min, desenhe 3-5 serviços de domínio. Mais que isso vira ruído
   - Cada serviço = um bounded context claro
   - Se não consegue descrever a responsabilidade em 5 palavras, o serviço está grande demais ou mal definido
   - O entrevistador pode pedir deep dive em um serviço; aí você abre um sub-diagrama

2. **Nomenclatura que funciona:**
   - Padrão: `[Domínio] Service` (ex: `Payment Service`, `Notification Service`, `Auth Service`)
   - A descrição curta: verbo + objeto (ex: "Processa transações", "Valida identidade", "Gerencia saldos")
   - Evitar: nomes genéricos ("Core Service", "Main Service"), nomes técnicos ("Kafka Consumer Service", "REST API Service")

3. **Padrões de comunicação entre serviços:**
   - Orquestração (um serviço coordena os outros, sync)
   - Coreografia (serviços reagem a eventos, async)
   - Saga (mix dos dois para transações distribuídas)
   - Cada padrão com diagrama mostrando as setas na Camada 2

4. **Exemplo: Sistema de pedidos** — Cenário de e-commerce onde um pedido passa por múltiplos serviços. Mostrar os serviços envolvidos: Order Service, Inventory Service, Payment Service, Shipping Service. Diagrama completo com Camada 2 detalhada.

5. **Exercício: Nomeação de serviços** — Dado um cenário, listar os serviços e suas responsabilidades em 5 palavras. Comparar com solução ideal.

**Componentes usados:** `LayerDiagram`, `ComparisonTable`, `ExerciseBlock`, `SolutionReveal`

---

### Capítulo 13: Camada de Dados em Profundidade

**Arquivo:** `src/content/chapters/13-camada-dados/index.mdx`

**Frontmatter:**
```yaml
title: "Camada de Dados em Profundidade"
subtitle: "Onde os dados vivem, como fluem, e por que isso importa"
chapter: 13
block: "visual"
estimatedTime: "25 min"
difficulty: "intermediário"
tags: ["dados", "banco", "cache", "kafka", "redis", "postgresql"]
prerequisites: [7, 9, 10]
objectives:
  - "Escolher o storage correto para cada tipo de dado"
  - "Representar diferentes tipos de storage com formas visuais distintas"
  - "Saber quando cache, fila e banco relacional coexistem no mesmo fluxo"
```

**Conteúdo a ser escrito:**

1. **Tipos de storage e suas formas visuais:**
   - Banco relacional (PostgreSQL, MySQL): cilindro com label "SQL"
   - NoSQL (DynamoDB, MongoDB): cilindro com cantos arredondados ou label "NoSQL"
   - Cache (Redis, Memcached): retângulo com raio ou label "Cache"
   - Fila/Tópico (Kafka, SQS): paralelogramo ou retângulo com ondas
   - Object Storage (S3, GCS): nuvem
   - Cada tipo com SVG de exemplo

2. **Decisão de storage** — Tabela de decisão:
   - Transações financeiras: SQL (ACID obrigatório)
   - Sessões e tokens: Cache (TTL, velocidade)
   - Eventos e audit log: Event streaming + storage de longo prazo
   - Documentos e mídia: Object storage
   - Configurações e feature flags: Cache ou config service
   - Dados analíticos: Data warehouse (fora do diagrama principal)

3. **O erro do "banco pra tudo"** — Anti-padrão comum: um único banco para tudo. Mostrar `BeforeAfter` com um banco monolítico vs polyglot persistence. O entrevistador quer ver que você pensa em trade-offs de storage.

4. **Filas/Tópicos na Camada 3, não na 2** — Por que filas e tópicos são infraestrutura de dados, não serviços de domínio. Kafka é o meio pelo qual dados fluem, assim como um banco é onde dados persistem. Diagrama mostrando a posição correta.

5. **Exemplo: Sistema de analytics** — Cenário de coleta e processamento de eventos. Mostrar Kafka para ingestão, Redis para contadores real-time, PostgreSQL para dados agregados, S3 para raw data.

6. **Exercício: Escolha de storage** — Dado um cenário com 6 tipos de dados diferentes, mapear cada um para o storage adequado e posicionar na Camada 3.

**Componentes usados:** `LayerDiagram`, `ComparisonTable`, `BeforeAfter`, `ExerciseBlock`, `SolutionReveal`

---

### Capítulo 14: Camada Transversal em Profundidade

**Arquivo:** `src/content/chapters/14-camada-transversal/index.mdx`

**Frontmatter:**
```yaml
title: "Camada Transversal em Profundidade"
subtitle: "O diferencial que impressiona entrevistadores"
chapter: 14
block: "visual"
estimatedTime: "20 min"
difficulty: "intermediário"
tags: ["observabilidade", "auth", "rate limiting", "circuit breaker", "resiliência"]
prerequisites: [7, 9]
objectives:
  - "Listar os componentes transversais críticos"
  - "Saber quais mencionar proativamente na entrevista"
  - "Representar a camada transversal como faixa, não como boxes soltas"
```

**Conteúdo a ser escrito:**

1. **Por que esta camada impressiona** — A maioria dos candidatos esquece. Mencionar proativamente mostra maturidade. O entrevistador geralmente pergunta: "E como você monitora isso?" Se você já desenhou, ganha pontos.

2. **Os 6 grupos transversais:**
   - **Observabilidade:** métricas, logs estruturados, tracing distribuído, alertas. Representar como bloco único "Observabilidade"
   - **Autenticação e Autorização:** OAuth2, mTLS entre serviços, RBAC/ABAC, API keys para parceiros. Representar como "Auth/AuthZ"
   - **Rate Limiting e Throttling:** proteção contra abuso e garantia de SLA. Crítico em APIs públicas
   - **Resiliência:** Circuit Breaker, retry com backoff, fallback, bulkhead. Não são serviços, são políticas aplicadas a todas as comunicações
   - **Gestão de Configuração:** feature flags, config centralizada, secrets management. Sem isso, deploy em produção é caos
   - **CI/CD e Deploy:** pipeline de build, canary deployment, blue/green. Mencionar brevemente, não detalhar

3. **Como representar visualmente** — Faixa tracejada horizontal na base do diagrama. Dentro da faixa: labels dos grupos separados por pipe. Exemplo: `| Observabilidade | Auth/AuthZ | Rate Limiting | Resiliência | Config |`

4. **Trade-offs como componentes visuais** — Quando o entrevistador pergunta "e se o serviço X cair?", a resposta deve apontar para algo que já está no diagrama (Circuit Breaker na camada transversal). Transforme decisões de resiliência em componentes visuais.

5. **Exemplo: Transversal para API pública** — Diagrama completo com foco na Camada 4. Mostrar como cada grupo transversal se relaciona com as camadas acima.

**Componentes usados:** `LayerDiagram` (foco Camada 4), `Callout`, `Checklist`, `KeyTakeaway`

---

### Capítulo 15: Modelo de Dados Separado

**Arquivo:** `src/content/chapters/15-modelo-dados-separado/index.mdx`

**Frontmatter:**
```yaml
title: "Modelo de Dados: Sempre em Diagrama Separado"
subtitle: "ERD e schema design não se misturam com arquitetura"
chapter: 15
block: "visual"
estimatedTime: "15 min"
difficulty: "intermediário"
tags: ["modelo de dados", "ERD", "schema", "normalização"]
prerequisites: [13]
objectives:
  - "Saber quando e como apresentar o modelo de dados na entrevista"
  - "Criar ERDs limpos que complementam o diagrama de arquitetura"
  - "Nunca misturar schema com diagrama de serviços"
```

**Conteúdo a ser escrito:**

1. **A regra de ouro:** Modelo de dados e diagrama de arquitetura são documentos SEPARADOS. Misturar os dois cria poluição visual. O diagrama de arquitetura mostra FLUXO. O ERD mostra ESTRUTURA.

2. **Quando desenhar o ERD na entrevista:**
   - Quando o entrevistador pedir explicitamente: "Me mostra o schema"
   - Quando o deep dive for no serviço que mais depende de dados
   - NUNCA proativamente no início. Primeiro a arquitetura, depois o modelo se pedido

3. **Regras visuais do ERD para entrevista:**
   - Máximo 5-7 entidades. Menos é mais
   - Só chaves primárias e estrangeiras. Nada de listar todos os campos
   - Para campos relevantes, listar apenas 3-5 por entidade (os de negócio)
   - Usar notação simples: retângulo com nome da tabela e lista de campos-chave
   - Indicar cardinalidade nas relações (1:N, N:M)

4. **Template de ERD genérico** — Entidades recorrentes por domínio. Diagrama Mermaid de exemplo.

5. **Exercício: ERD para sistema de pedidos** — Dado um cenário de e-commerce, desenhar o ERD. Solução com `SolutionReveal`.

**Componentes usados:** `FlowDiagram` (Mermaid ERD), `BeforeAfter`, `ExerciseBlock`, `SolutionReveal`

---

### Capítulo 16: Anti-padrões Visuais

**Arquivo:** `src/content/chapters/16-anti-padroes/index.mdx`

**Frontmatter:**
```yaml
title: "Anti-padrões Visuais"
subtitle: "O que NÃO fazer (e como corrigir)"
chapter: 16
block: "visual"
estimatedTime: "20 min"
difficulty: "avançado"
tags: ["anti-padrão", "erros", "correção"]
prerequisites: [7, 8, 9, 10]
objectives:
  - "Reconhecer os 8 anti-padrões visuais mais comuns"
  - "Saber corrigir cada um em menos de 1 minuto"
  - "Treinar o olho crítico para revisar seus próprios diagramas"
```

**Conteúdo a ser escrito:**

8 anti-padrões, cada um com `BeforeAfter`:

1. **O Espaguete** — Tudo conectado com tudo, sem camadas. Setas cruzando em todas as direções. Correção: aplicar o framework de 4 camadas.

2. **O Monobloco** — Um único retângulo gigante "Sistema" com setas entrando e saindo. Zero granularidade. Correção: decompor em serviços de domínio.

3. **O Tecnologista** — Boxes nomeadas por tecnologia ("Kafka", "Redis", "PostgreSQL") sem contexto de negócio. Correção: nomear pelo domínio, tecnologia vai no label secundário.

4. **O Seta-Única** — Todas as setas iguais (tudo sync ou tudo async). Correção: classificar cada seta individualmente.

5. **O Sem-Legenda** — Diagrama com setas de vários tipos mas nenhuma legenda. Correção: adicionar legenda obrigatória.

6. **O Detalhista** — 15+ boxes com campos de banco, versões de API, portas de rede. Excesso de info para 45 min. Correção: reduzir a 4-5 boxes por camada.

7. **O Esquecido** — Diagrama sem observabilidade, sem auth, sem resiliência. Só happy path. Correção: adicionar Camada 4 transversal.

8. **O Misturador** — Schema de banco misturado com diagrama de arquitetura. Colunas de tabela dentro de boxes de serviço. Correção: separar em dois diagramas.

**Componentes usados:** `BeforeAfter` (8 pares), `Callout`, `KeyTakeaway`

---

### Capítulo 17: Narração ao Vivo

**Arquivo:** `src/content/chapters/17-narracao-ao-vivo/index.mdx`

**Frontmatter:**
```yaml
title: "Narração ao Vivo"
subtitle: "Como falar enquanto desenha sem perder o fio"
chapter: 17
block: "visual"
estimatedTime: "15 min"
difficulty: "avançado"
tags: ["comunicação", "narração", "entrevista", "soft skill"]
prerequisites: [9]
objectives:
  - "Dominar o template de narração para cada camada"
  - "Saber conectar fala e desenho sem pausas longas"
  - "Lidar com perguntas do entrevistador sem perder a linha"
```

**Conteúdo a ser escrito:**

1. **O problema do silêncio** — Desenhar em silêncio por 5 minutos mata a entrevista. O entrevistador quer avaliar seu raciocínio, não só o resultado. Se você não fala, ele não sabe se você está pensando ou travado.

2. **Template de narração por camada:**
   - **Ao dividir o canvas:** "Vou estruturar a solução em 4 camadas: entrada, domínio, dados e transversal. Começando de cima pra baixo..."
   - **Camada 1:** "O fluxo começa quando [ator] faz [ação]. Isso chega via [protocolo] no [componente de entrada]..."
   - **Camada 2:** "O [serviço X] é responsável por [responsabilidade]. Ele se comunica com [serviço Y] de forma [sync/async] porque [justificativa]..."
   - **Camada 3:** "Os dados de [domínio] persistem em [storage] porque [justificativa: ACID, velocidade, volume]..."
   - **Camada 4:** "Cortando todas as camadas, temos [observabilidade, auth, etc.]. Isso garante que [benefício]..."

3. **Como lidar com perguntas no meio:**
   - Técnica "Parking Lot": "Boa pergunta. Vou anotar aqui no canto e voltar nela quando terminar o high-level. Posso?"
   - Técnica "Resposta rápida + retorno": "Sim, esse serviço usa circuit breaker. Vou detalhar quando chegarmos na camada transversal."
   - Técnica "Incorporação": Se a pergunta melhora o diagrama, incorpore ao vivo: "Isso é um bom ponto. Vou adicionar um cache aqui entre [X] e [Y] para resolver isso."

4. **Frases de transição entre camadas:**
   - "Com a entrada definida, vamos ver quem processa..."
   - "Agora que temos os serviços, onde esses dados vivem?"
   - "O happy path está pronto. Vamos tornar isso resiliente..."

5. **Exercício de narração** — Instrução para praticar em voz alta: gravar-se narrando um diagrama usando o template. Tempo alvo: 3 min para narrar as 4 camadas. Usar `TimerChallenge`.

**Componentes usados:** `Callout`, `KeyTakeaway`, `TimerChallenge`, `QuoteBlock`

---

### BLOCO 3: EXERCÍCIOS PRÁTICOS

---

### Capítulo 18: Exercícios Guiados

**Arquivo:** `src/content/chapters/18-exercicios-guiados/index.mdx`

**Frontmatter:**
```yaml
title: "Exercícios Guiados"
subtitle: "Passo a passo com solução construída incrementalmente"
chapter: 18
block: "exercicios"
estimatedTime: "120 min (total)"
difficulty: "avançado"
tags: ["exercício", "prática", "passo a passo"]
prerequisites: [2, 3, 4, 5, 6, 7, 8, 9, 10]
objectives:
  - "Aplicar o processo completo (raciocínio + visual) em 10 cenários reais"
  - "Ver cada diagrama sendo construído passo a passo, sem limite fixo de steps"
  - "Comparar seu raciocínio com a solução de referência"
```

**Formato de cada exercício:**

Cada exercício segue a jornada completa do ebook:

1. **Enunciado** — Problema com requisitos claros
2. **Raciocínio (Bloco 1 aplicado):**
   - Decomposição do enunciado (requisitos funcionais e não-funcionais)
   - Perguntas ao entrevistador (e respostas simuladas)
   - Estimativa de escala (QPS, storage)
   - Decisões de arquitetura com justificativa
3. **Construção visual (Bloco 2 aplicado):**
   - Passo a passo orgânico — quantos passos o problema precisar
   - Cada passo contém: o que desenhar + diagrama SVG acumulativo + narração sugerida + justificativa
4. **Diagrama final completo**
5. **Trade-offs para discussão** — perguntas que o entrevistador faria e como responder

---

#### Exercício 18.1: URL Shortener

**Enunciado:**
Projete um serviço de encurtamento de URLs. Requisitos: encurtar URLs longas em links curtos, redirecionar links curtos para a URL original, analytics básico (contagem de acessos), links com expiração opcional.

**Raciocínio:**
- Requisitos funcionais: criar short URL, redirecionar, analytics
- Não-funcionais: baixa latência no redirect (<50ms), alta disponibilidade, eventual consistency para analytics
- Escala: 100M URLs criadas/mês, ratio read:write de 100:1 → ~40K QPS de leitura
- Decisões: NoSQL ou SQL para URL mapping (key-value access pattern → pode ser NoSQL), cache obrigatório (hot URLs), counter service async

**Construção passo a passo:**
- Dividir canvas em 4 camadas
- Camada 1: Web App (encurtar), Redirect endpoint (acessar)
- Camada 2: URL Service (gera e resolve short URLs), Analytics Service (conta acessos)
- Camada 3: Key-Value Store (URL mapping), Cache (hot URLs), Message Queue (eventos de acesso), Analytics DB (contadores)
- Classificar setas: redirect → cache (sync), analytics event → queue (async)
- Camada 4: Rate Limiting (proteção contra abuso), Observabilidade
- Legenda

**Trade-offs:** hash vs counter para gerar IDs, cache invalidation, consistência de analytics.

---

#### Exercício 18.2: Chat / Messaging System

**Enunciado:**
Projete um sistema de chat em tempo real. Requisitos: mensagens 1:1, mensagens em grupo (até 500 membros), indicador de presença (online/offline), histórico de mensagens, indicador de leitura (read receipts), suporte a mídia (imagens).

**Raciocínio:**
- Requisitos funcionais: enviar/receber mensagens, criar grupos, presença, histórico, read receipts
- Não-funcionais: latência < 200ms para entrega, alta disponibilidade, ordenação de mensagens por conversa
- Escala: 50M DAU, 40 mensagens/dia/usuário → ~23K QPS de escrita
- Decisões: WebSocket para real-time, message queue para entrega garantida, NoSQL para histórico (write-heavy, access by conversation ID)

**Construção passo a passo** — orgânico, quantos passos o cenário exigir.

**Trade-offs:** push vs pull para mensagens, sharding por user vs por conversation, storage de mídia.

---

#### Exercício 18.3: Notification System

**Enunciado:**
Projete um sistema de notificações multi-canal. Requisitos: push notification (mobile), email, SMS, in-app notifications, preferências do usuário (opt-in/opt-out por canal), throttling (não enviar mais de X notificações por hora), templates de notificação, retry para falhas de entrega.

**Raciocínio:**
- Requisitos funcionais: enviar por múltiplos canais, respeitar preferências, throttling, retry
- Não-funcionais: entrega eventual garantida (at-least-once), alta throughput, latência não-crítica (seconds OK)
- Escala: 1B notificações/dia → ~12K QPS médio, picos de 50K+ QPS
- Decisões: message queue obrigatória (volume + async), workers por canal, rate limiter por usuário

**Construção passo a passo** — orgânico.

**Trade-offs:** fan-out vs fan-in, priorização de canais, dead letter queue para falhas persistentes.

---

#### Exercício 18.4: Rate Limiter

**Enunciado:**
Projete um rate limiter distribuído. Requisitos: limitar requests por API key, múltiplas políticas (por segundo, por minuto, por hora), resposta rápida (<10ms de overhead), funcionar em ambiente multi-node, dashboard para configuração de políticas.

**Raciocínio:**
- Requisitos funcionais: check de rate limit, configuração de políticas, dashboard
- Não-funcionais: latência mínima (<10ms), alta disponibilidade (rate limiter fora = todas as requests passam), consistência aproximada (OK perder precisão em troca de velocidade)
- Escala: avaliado em cada request da API → se a API faz 100K QPS, o rate limiter faz 100K+ QPS
- Decisões: Redis (in-memory, atômico), algoritmo (token bucket vs sliding window), sync vs async counter update

**Construção passo a passo** — orgânico.

**Trade-offs:** precisão vs performance, race conditions em ambiente distribuído, graceful degradation quando Redis cai.

---

#### Exercício 18.5: News Feed / Timeline

**Enunciado:**
Projete o feed de notícias de uma rede social. Requisitos: cada usuário vê posts dos amigos/seguidos, ordenação por relevância (não apenas cronológico), suporte a posts com texto, imagens e vídeos, feed atualizado em near-real-time, paginação infinita.

**Raciocínio:**
- Requisitos funcionais: publicar post, gerar feed personalizado, paginação
- Não-funcionais: latência de leitura < 200ms, near-real-time (segundos OK), alta disponibilidade
- Escala: 100M DAU, cada um abre o feed ~10x/dia → 12K QPS de leitura de feed
- Decisões: fan-out on write vs fan-out on read (trade-off clássico), cache de feed pré-computado, ranking service

**Construção passo a passo** — orgânico.

**Trade-offs:** fan-out on write (rápido para leitura, caro para celebrities) vs fan-out on read (lento para leitura, eficiente em storage), ranking em tempo real vs pré-computado.

---

#### Exercício 18.6: Processamento de Pagamento em Tempo Real

**Enunciado:**
Projete o sistema de processamento de pagamentos de um banco digital. Requisitos: receber pagamentos (crédito), enviar pagamentos (débito), notificar o usuário em tempo real, manter audit trail completo, processar no mínimo 1.000 TPS em horário de pico, garantia de idempotência.

**Raciocínio:**
- Requisitos funcionais: processar crédito/débito, notificação, audit trail
- Não-funcionais: idempotência (nunca processar duplicado), ACID para transações, alta disponibilidade, auditabilidade completa
- Escala: 1.000 TPS pico, audit trail cresce ~86M registros/dia
- Decisões: SQL obrigatório (ACID para dinheiro), Kafka para eventos (audit + notificação), Redis para idempotency key, circuit breaker para integrações externas

**Construção passo a passo** — orgânico.

**Trade-offs:** latência vs consistência, retry strategy para integrações externas, event sourcing vs CDC para audit trail.

---

#### Exercício 18.7: Sistema de Antifraude em Tempo Real

**Enunciado:**
Projete um sistema de antifraude para uma plataforma de pagamentos. Requisitos: análise em tempo real (< 200ms para aprovação/rejeição), análise assíncrona para casos duvidosos (revisão manual), integração com bureaus externos, machine learning para scoring, bloqueio automático de contas suspeitas.

**Raciocínio:**
- Requisitos funcionais: scoring em tempo real, fila de revisão manual, integração com bureaus, bloqueio automático
- Não-funcionais: latência < 200ms para fast-path, alta disponibilidade (sistema fora = fraude passa), fallback se ML model falha
- Escala: avaliado em cada transação → 1.000 TPS = 1.000 avaliações de fraude/segundo
- Decisões: two-path (fast sync + slow async), feature store em cache (Redis), circuit breaker para bureaus

**Construção passo a passo** — orgânico.

**Trade-offs:** latência vs acurácia, regras estáticas vs ML, false positive rate vs false negative rate, fallback quando bureau está indisponível.

---

#### Exercício 18.8: Emissão de Faturas PDF + Envio por Email via SFTP

**Enunciado:**
Projete um sistema de emissão de faturas. Requisitos: gerar faturas em PDF mensalmente para milhares de clientes, integrar com fornecedor externo de emissão fiscal que entrega as faturas processadas via SFTP (sim, SFTP), enviar faturas por email ao cliente, reconciliar faturas geradas vs recebidas, retry para faturas não recebidas dentro do prazo, dashboard de status.

**Raciocínio:**
- Requisitos funcionais: gerar request de fatura, receber fatura via SFTP, enviar por email, reconciliar, retry
- Não-funcionais: confiabilidade (toda fatura deve ser entregue), tolerância a atrasos do fornecedor, audit trail, batch processing
- Escala: 100K faturas/mês (batch, não real-time), SFTP polling periódico
- Decisões: job agendado para polling SFTP, message queue para processamento, state machine para lifecycle da fatura (solicitada → emitida → recebida → enviada), storage para PDFs

**Construção passo a passo** — orgânico. Este exercício é especial porque lida com integração legacy:
- Como representar o SFTP no diagrama (ator externo na Camada 1)
- Polling pattern: job agendado que verifica o SFTP periodicamente
- State machine da fatura no diagrama
- Reconciliação como serviço que compara o esperado vs recebido
- Dead letter / alerting para faturas não recebidas no prazo

**Trade-offs:** polling interval (frequente = custo, raro = atraso), push vs pull (fornecedor não suporta webhook, só SFTP), idempotência no processamento de arquivos SFTP (arquivo já processado vs novo).

---

#### Exercício 18.9: Autorização de Débito com SLA de 2 Segundos

**Enunciado:**
Projete o fluxo de autorização de débito de uma plataforma de pagamentos. Requisitos: o tempo total da autorização (do request do cliente até a resposta) não pode exceder 2 segundos, validar saldo, verificar fraude, registrar a transação, notificar o cliente, integrar com processador de pagamento externo. Se o prazo de 2s estourar, a transação deve ser negada com motivo "timeout".

**Raciocínio:**
- Requisitos funcionais: validar saldo, check de fraude, registrar, notificar, autorizar via processador
- Não-funcionais: SLA de 2 segundos end-to-end, timeout = rejeição, alta disponibilidade
- Escala: 500 TPS em pico
- Decisões: budget de tempo por componente (quanto cada serviço pode gastar dos 2s), o que é sync (validação, fraude, registro) vs async (notificação), circuit breaker obrigatório para processador externo, cache agressivo para saldo

**Construção passo a passo** — orgânico. Este exercício é especial porque força o raciocínio de **time budget**:
- Distribuição dos 2s: API Gateway (50ms) → Fraud Check (200ms) → Balance Check (100ms) → Processador Externo (1000ms) → Registro (200ms) → margem (450ms)
- O que fazer se o processador externo demora mais que o budget
- Quais etapas podem rodar em paralelo (fraud + balance check simultâneos)
- O que é relegado para async (notificação, audit log detalhado)
- Timeout em cada hop individual, não só no total
- Fallback strategies: cache de saldo, fraud check simplificado, resposta parcial

**Trade-offs:** paralelismo (reduz latência, aumenta complexidade), cache de saldo (risco de stale data vs speed), timeout granular vs global, o que sacrificar se o budget de 2s está apertado.

---

#### Exercício 18.10: Onboarding e KYC Digital

**Enunciado:**
Projete o fluxo de onboarding de uma conta digital com KYC (Know Your Customer). Requisitos: captura de documentos (identidade), selfie com liveness detection, validação de dados pessoais, checagem em listas restritivas (PEP, sanções), aprovação automática para casos limpos, fila de revisão para casos com pendência, notificação de status ao usuário.

**Raciocínio:**
- Requisitos funcionais: upload de docs, validação de identidade, checagem de compliance, aprovação/revisão, notificação
- Não-funcionais: tolerância a falhas (integrações externas), fluxo não-bloqueante (async), dados sensíveis (criptografia)
- Escala: 10K onboardings/dia → baixo QPS, mas integrações externas lentas
- Decisões: saga para orquestrar o fluxo multi-step, async para integrações externas, object storage para documentos

**Construção passo a passo** — orgânico.

**Trade-offs:** orquestração vs coreografia, storage de PII, privacy regulations (GDPR/LGPD), tempo de aprovação vs rigor de validação.

---

### Capítulo 19: Exercícios Livres (Sem Solução Imediata)

**Arquivo:** `src/content/chapters/19-exercicios-livres/index.mdx`

**Frontmatter:**
```yaml
title: "Exercícios Livres"
subtitle: "Simule a entrevista real: sem solução na tela"
chapter: 19
block: "exercicios"
estimatedTime: "90 min (total)"
difficulty: "avançado"
tags: ["exercício", "simulação", "entrevista", "prática livre"]
prerequisites: [18]
objectives:
  - "Praticar sem apoio, simulando condições reais de entrevista"
  - "Completar cada exercício em 15-20 minutos"
  - "Usar o checklist de validação para autoavaliação"
```

**Conteúdo a ser escrito:**

Cada exercício contém: enunciado, requisitos, restrições e checklist de validação. A solução de referência fica em `SolutionReveal` com aviso forte para tentar sozinho primeiro.

#### 19.1: Carteira Digital Multi-moeda
Projetar uma carteira digital que suporta múltiplas moedas (fiat e cripto). Requisitos: conversão em tempo real, limites por moeda, extrato consolidado.

#### 19.2: Gateway de Pagamentos Multi-adquirente
Sistema que roteia transações de cartão entre múltiplos processadores com fallback automático e otimização de custo.

#### 19.3: Sistema de Cashback Programável
Plataforma onde merchants configuram regras de cashback (percentual, teto, categorias). Requisitos: cálculo em tempo real, crédito em carteira, relatórios.

#### 19.4: Plataforma de Empréstimo P2P
Marketplace onde investidores financiam empréstimos a tomadores. Requisitos: scoring de crédito, matching automático, controle de inadimplência, compliance.

#### 19.5: Sistema de Cobrança Recorrente (Subscription Billing)
Motor de cobrança para SaaS com planos, upgrades, dunning (retry de cobrança falhada), proration, faturas.

#### 19.6: Open Banking / Open Finance Hub
Agregador de dados financeiros de múltiplos bancos via APIs padronizadas. Requisitos: consent management, cache de dados, refresh de tokens.

Para cada exercício: enunciado detalhado + `TimerChallenge` de 20 min + checklist de validação + `SolutionReveal` com diagrama de referência completo.

---

### APÊNDICES

---

### Capítulo 20: Checklist Final de Validação

**Arquivo:** `src/content/chapters/20-checklist-final/index.mdx`

**Frontmatter:**
```yaml
title: "Checklist Final de Validação"
subtitle: "Revise isso 5 minutos antes da entrevista"
chapter: 20
block: "apendice"
estimatedTime: "5 min"
difficulty: "fundamento"
tags: ["checklist", "revisão", "entrevista"]
objectives:
  - "Ter um checklist imprimível para revisar antes de qualquer entrevista"
  - "Validar qualquer diagrama em menos de 2 minutos"
```

**Conteúdo a ser escrito:**

Checklist interativo com checkboxes (componente `Checklist`) organizado por categoria:

**Raciocínio (antes de desenhar):**
- [ ] Requisitos funcionais listados (3-5)?
- [ ] Requisitos não-funcionais identificados (latência, escala, disponibilidade)?
- [ ] Perguntas de escopo feitas ao entrevistador?
- [ ] Estimativa de escala (QPS, storage) calculada?
- [ ] Decisões de arquitetura justificadas com trade-offs?

**Estrutura:**
- [ ] Canvas dividido em 4 camadas horizontais?
- [ ] Labels das camadas visíveis na lateral?
- [ ] Máximo 4-5 boxes por camada?

**Camada 1 — Entrada:**
- [ ] Todos os pontos de entrada identificados?
- [ ] Atores agrupados por tipo (não duplicados)?
- [ ] Protocolo de entrada indicado nas setas?

**Camada 2 — Serviços:**
- [ ] Cada box tem nome + responsabilidade (max 5 palavras)?
- [ ] Nomes refletem domínio de negócio, não tecnologia?
- [ ] Comunicação entre serviços tem setas com label?

**Camada 3 — Dados:**
- [ ] Cada serviço tem pelo menos um storage associado?
- [ ] Tipos de storage diferenciados visualmente?
- [ ] Filas/tópicos estão na Camada 3, não na 2?
- [ ] Cache presente onde faz sentido?

**Camada 4 — Transversal:**
- [ ] Observabilidade mencionada?
- [ ] Auth/AuthZ presente?
- [ ] Resiliência (Circuit Breaker, retry) presente?
- [ ] Representado como faixa, não como boxes soltas?

**Setas e Legenda:**
- [ ] Setas sync (contínuas) e async (tracejadas) diferenciadas?
- [ ] Cada seta tem label de protocolo/mecanismo?
- [ ] Legenda presente no diagrama?

**Comunicação:**
- [ ] Consigo narrar o fluxo de cima pra baixo em 3 minutos?
- [ ] Sei justificar cada escolha sync vs async?
- [ ] Tenho 2-3 trade-offs prontos para discutir?
- [ ] Sei o que quebraria primeiro com 10x de volume?

**Modelo de dados:**
- [ ] Modelo de dados está em diagrama SEPARADO?
- [ ] ERD tem no máximo 5-7 entidades?
- [ ] Só campos-chave listados (PK, FK, 3-5 de negócio)?

---

### Capítulo 21: Apêndices

**Arquivo:** `src/content/chapters/21-apendices/index.mdx`

**Frontmatter:**
```yaml
title: "Apêndices"
subtitle: "Referências rápidas, templates e recursos"
chapter: 21
block: "apendice"
estimatedTime: "10 min"
difficulty: "fundamento"
tags: ["referência", "template", "glossário", "quick win"]
objectives:
  - "Ter acesso rápido a templates e referências"
  - "Usar o Framework Mental Quick Win como consulta rápida"
```

**Conteúdo a ser escrito:**

#### A. Framework Mental Quick Win (1 Página)

O resumo de todo o Bloco 1 em 5 passos consultáveis em 2 minutos:

```
┌─────────────────────────────────────────────────┐
│          FRAMEWORK MENTAL - QUICK WIN           │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. ESCOPO                                      │
│     → 3-5 requisitos funcionais                 │
│     → 2-3 requisitos não-funcionais             │
│     → 3-5 perguntas de esclarecimento           │
│                                                 │
│  2. ESCALA                                      │
│     → DAU × ações/dia ÷ 86.400 = QPS médio     │
│     → QPS × 4 = QPS pico                       │
│     → Volume × retenção = storage total         │
│                                                 │
│  3. COMPONENTES                                 │
│     → Listar 4-6 componentes principais         │
│     → Classificar em 4 camadas                  │
│                                                 │
│  4. FLUXO                                       │
│     → Happy path do ator até a resposta         │
│     → Classificar cada seta: sync ou async      │
│                                                 │
│  5. TRADE-OFFS                                  │
│     → Para cada decisão: 1 pro + 1 contra       │
│     → "Escolhi X porque Y, apesar de Z"         │
│                                                 │
└─────────────────────────────────────────────────┘
```

#### B. Template de Diagrama em Branco
SVG/PNG do framework de 4 camadas vazio, pronto para copiar e preencher no Miro/Excalidraw. Com marcações de posição para boxes e setas.

#### C. Glossário de Ícones e Formas
Tabela visual com todas as formas usadas no playbook e seus significados.

#### D. Perguntas Frequentes de Entrevistadores
Lista de 20 perguntas comuns de follow-up em entrevistas de system design e como responder cada uma apontando para o diagrama.

#### E. Recursos Complementares
Links para prática adicional: canais, livros, repositórios de referência.

---

## 5. Componentes Interativos (Especificação de Comportamento)

### 5.1 SolutionReveal (React Island)

```
Estado: collapsed | expanded
Transição: click no botão → slide down com ease-out 300ms
Botão colapsado: ícone de olho fechado + "Tente resolver antes de ver a solução"
Botão expandido: ícone de olho aberto + "Esconder solução"
Cor do container: bg amarelo claro (aviso) quando colapsado, bg branco quando expandido
Persiste estado em sessionStorage (chave = exercício ID)
```

### 5.2 TimerChallenge (React Island)

```
Estado: idle | running | paused | finished
Display: MM:SS contagem regressiva
Cor do timer: verde (>50% tempo), amarelo (25-50%), vermelho (<25%)
Ao finalizar: som sutil (opcional, toggle) + mensagem "Tempo esgotado! Verifique o checklist."
Fases: lista de checkboxes marcáveis durante o exercício
Botões: Iniciar, Pausar, Reiniciar
```

### 5.3 LayerFillExercise (React Island)

```
Canvas vazio com 4 faixas de camada.
Drag-and-drop de componentes pré-definidos para dentro das camadas.
Componentes errados na camada errada ficam com borda vermelha.
Botão "Verificar" compara com gabarito e mostra score.
Feedback: lista de erros com explicação.
```

### 5.4 Checklist (Astro + localStorage)

```
Checkboxes interativos que persistem em localStorage.
Botão "Limpar tudo" para resetar.
Barra de progresso mostrando % preenchido.
Funciona 100% client-side via <script> tag no Astro (sem React).
```

### 5.5 DiagramCritique (React Island)

```
Mostra um diagrama com problemas intencionais.
Aluno clica nos elementos problemáticos.
Para cada clique correto: popup com explicação do problema.
Marcador visual (X vermelho) nos problemas encontrados.
Score: X de Y problemas encontrados.
Botão "Revelar todos" para mostrar os que faltaram.
```

---

## 6. Design e UX

### 6.1 Landing Page

A landing page (`src/pages/index.astro`) deve:

- Hero com título principal: "System Design Playbook"
- Subtítulo: "Pare de reprovar em entrevistas de System Design. Aprenda a raciocinar com método e comunicar visualmente suas soluções de arquitetura."
- CTA: "Começar o Playbook" (âncora para capítulo 0)
- Preview visual: o diagrama de 4 camadas animado (SVG com fade-in por camada)
- Seção "Para quem é este guia" (3 cards: Senior Engineer, Staff Engineer, Aspirante a Tech Lead / Principal)
- Seção "O que você vai aprender" (3 blocos: Raciocínio, Metodologia Visual, Prática)
- Seção "O framework" (diagrama de 4 camadas estático com labels)
- Footer com créditos e link para repositório

### 6.2 Layout de Capítulo

Estrutura de 3 colunas em desktop:

```
[Sidebar 240px] [Conteúdo 720px] [TOC 200px]
```

- **Sidebar esquerda:** lista de capítulos agrupados por bloco com indicador do capítulo atual. Colapsável em mobile (hamburger)
- **Conteúdo central:** texto MDX renderizado com componentes. Max-width 720px para legibilidade
- **TOC direita:** table of contents do capítulo atual com scroll spy (destaca seção visível). Esconde em telas < 1280px

Navegação entre capítulos: botões "Anterior" e "Próximo" no rodapé do conteúdo.

Barra de progresso no topo: indica % do capítulo lido (baseado em scroll).

### 6.3 Responsividade

- Desktop (>1280px): 3 colunas
- Tablet (768-1280px): sidebar colapsável + conteúdo. TOC escondido
- Mobile (<768px): conteúdo full-width, sidebar via menu hamburger, TOC via dropdown

### 6.4 Dark Mode

Toggle no header. Persiste em localStorage. Respeita `prefers-color-scheme` do sistema como default. Todas as cores do design system têm variante dark (definidas em global.css).

### 6.5 Tipografia

- Títulos: variável com peso bold, tamanho responsivo (clamp)
- Corpo: 16px/1.6 line-height, max 72 caracteres por linha
- Código: JetBrains Mono, fundo levemente diferente do corpo
- Labels de diagrama: sans-serif condensada para caber em boxes pequenas

### 6.6 Performance

Target: 100 no Lighthouse em todas as páginas.
- Astro gera HTML estático (zero JS por padrão)
- React islands carregam apenas nas páginas que usam (`client:visible`)
- Fonts preloaded e font-display: swap
- Imagens em formato WebP com lazy loading
- SVGs inline (sem requests extras)

---

## 7. SEO e Metadados

### 7.1 Meta tags por página

```html
<title>{chapter.title} | System Design Playbook</title>
<meta name="description" content="{chapter.subtitle}" />
<meta property="og:title" content="{chapter.title}" />
<meta property="og:description" content="{chapter.subtitle}" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="article" />
<link rel="canonical" href="https://system-design-playbook.dev/{slug}" />
```

### 7.2 Structured Data

JSON-LD de Book/Course em cada página para rich snippets.

### 7.3 Sitemap

Gerado automaticamente pelo Astro (`@astrojs/sitemap`).

---

## 8. Deploy e CI/CD

### 8.1 Deploy

Vercel ou Netlify com configuração zero para Astro.

```json
// vercel.json (se necessário)
{
  "framework": "astro"
}
```

### 8.2 CI/CD

GitHub Actions:
- Push em `main`: build + deploy em produção
- Pull request: build + preview deploy
- Lint: ESLint + Prettier
- Type check: `astro check`

### 8.3 Dependências principais

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/react": "^4.x",
    "@astrojs/tailwind": "^6.x",
    "@astrojs/mdx": "^4.x",
    "@astrojs/sitemap": "^3.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "mermaid": "^11.x",
    "tailwindcss": "^4.x"
  }
}
```

---

## 9. Métricas de Sucesso do Produto

### 9.1 Engajamento

- Tempo médio por capítulo > 10 minutos (indica leitura real)
- Taxa de conclusão do playbook > 40% (chegou ao capítulo 20)
- Exercícios completados: média > 6 dos 16 disponíveis

### 9.2 Técnico

- Lighthouse score: 100 em Performance, Accessibility, SEO
- First Contentful Paint < 1s
- Time to Interactive < 2s
- Bundle JS total < 50KB (islands only)

### 9.3 Comunidade

- Stars no GitHub > 500 em 3 meses
- Compartilhamentos em LinkedIn (público-alvo é ativo lá)
