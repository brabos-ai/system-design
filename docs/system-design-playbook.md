# PRD: System Design Visual Playbook

## Guia Completo de Comunicação Visual de Arquitetura para Entrevistas Técnicas

---

## 1. Visão Geral do Produto

### 1.1 O que é

Um site estático construído com Astro que funciona como um ebook interativo e guia prático para profissionais de backend (sênior/staff) que estão se preparando para entrevistas de System Design em vagas de Tech Lead, especialmente em fintechs brasileiras.

O foco não é ensinar conceitos de arquitetura (o público já domina isso), mas sim ensinar a **comunicar visualmente** soluções de arquitetura de forma clara, organizada e profissional durante entrevistas técnicas usando whiteboard, Miro ou Excalidraw.

### 1.2 Problema

Desenvolvedores backend seniores frequentemente dominam arquitetura de sistemas, mas reprovam em entrevistas de System Design porque não conseguem:

- Organizar um diagrama de arquitetura de forma que o entrevistador entenda em segundos
- Decidir o que desenhar primeiro e como estruturar o canvas
- Diferenciar visualmente comunicação síncrona de assíncrona
- Lembrar de componentes críticos (observabilidade, resiliência, idempotência)
- Explicar verbalmente enquanto desenham, sem perder o fio da narrativa

### 1.3 Público-alvo

- Desenvolvedores backend sênior e staff (3-10+ anos de experiência)
- Concorrendo a vagas de Tech Lead ou Staff Engineer
- Stack JVM (Kotlin, Java, Scala) ou C#/.NET
- Contexto de fintechs, bancos digitais e empresas de benefícios no Brasil
- Já conhecem DDD, CQRS, Event Sourcing, microsserviços, Kafka, etc.
- Precisam treinar a habilidade de **desenhar e comunicar**, não de **aprender conceitos**

### 1.4 Proposta de valor

> "Você sabe arquitetar. Agora aprenda a mostrar isso em 45 minutos de entrevista."

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
│   │   │   ├── TimerChallenge.astro  # Desafio com cronômetro (React island)
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
│   │       ├── 01-framework-4-camadas/
│   │       │   └── index.mdx
│   │       ├── 02-vocabulario-visual/
│   │       │   └── index.mdx
│   │       ├── 03-fluxo-de-desenho/
│   │       │   └── index.mdx
│   │       ├── 04-comunicacao-sync-async/
│   │       │   └── index.mdx
│   │       ├── 05-camada-entrada/
│   │       │   └── index.mdx
│   │       ├── 06-camada-servicos/
│   │       │   └── index.mdx
│   │       ├── 07-camada-dados/
│   │       │   └── index.mdx
│   │       ├── 08-camada-transversal/
│   │       │   └── index.mdx
│   │       ├── 09-modelo-dados-separado/
│   │       │   └── index.mdx
│   │       ├── 10-anti-padroes/
│   │       │   └── index.mdx
│   │       ├── 11-narracao-ao-vivo/
│   │       │   └── index.mdx
│   │       ├── 12-exercicios-guiados/
│   │       │   └── index.mdx
│   │       ├── 13-exercicios-livres/
│   │       │   └── index.mdx
│   │       └── 14-checklist-final/
│   │       │   └── index.mdx
│   │       └── 15-apendices/
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

## 3. Conteúdo dos Capítulos (Especificação Completa)

### Capítulo 0: Introdução

**Arquivo:** `src/content/chapters/00-introducao/index.mdx`

**Frontmatter:**
```yaml
title: "Você sabe arquitetar. Agora aprenda a mostrar."
chapter: 0
estimatedTime: "10 min"
difficulty: "fundamento"
tags: ["motivação", "contexto"]
objectives:
  - "Entender por que comunicação visual é uma skill separada de conhecimento técnico"
  - "Conhecer o framework de 4 camadas que será usado em todo o guia"
  - "Saber exatamente o que este guia vai e não vai ensinar"
```

**Conteúdo a ser escrito:**

1. **O gap invisível** - Narrativa sobre o problema: devs seniores que dominam arquitetura mas travam na hora de desenhar. Usar dados reais de que system design é a etapa com maior taxa de reprovação em processos de Tech Lead. Mencionar que o problema não é falta de conhecimento, é falta de um sistema visual repetível.

2. **O que este guia é (e o que não é):**
   - É: um playbook prático de comunicação visual de arquitetura
   - É: focado em entrevistas técnicas de 45-60 minutos
   - É: contextualizado em fintechs brasileiras (Pix, split de pagamento, antifraude, KYC)
   - Não é: curso de arquitetura de software (você já sabe isso)
   - Não é: guia de design gráfico ou UX
   - Não é: preparação de system design do zero (assuma conhecimento prévio)

3. **O framework de 4 camadas** - Preview visual do framework completo. Diagrama SVG mostrando as 4 faixas horizontais com cores, labels e exemplos genéricos. Explicar que este modelo será a base de TUDO no guia.

4. **Como usar este guia:**
   - Leitura sequencial na primeira vez (capítulos 1-11)
   - Exercícios guiados (capítulo 12) para fixar
   - Exercícios livres (capítulo 13) para simular entrevista real
   - Checklist (capítulo 14) para revisar antes da entrevista

5. **Resultado esperado** - Definição concreta de sucesso: "Quando você conseguir, dado qualquer problema de system design, dividir o canvas em 4 faixas em 30 segundos, preencher de cima pra baixo sem travar, diferenciar sync/async visualmente, e narrar enquanto desenha, você está pronto."

**Componentes usados:** `LayerDiagram` (preview), `Callout` (avisos), `KeyTakeaway`

---

### Capítulo 1: O Framework de 4 Camadas

**Arquivo:** `src/content/chapters/01-framework-4-camadas/index.mdx`

**Frontmatter:**
```yaml
title: "O Framework de 4 Camadas"
subtitle: "Seu modelo mental para qualquer system design"
chapter: 1
estimatedTime: "20 min"
difficulty: "fundamento"
tags: ["framework", "camadas", "modelo mental"]
objectives:
  - "Memorizar as 4 camadas e seus papéis"
  - "Saber quais componentes pertencem a cada camada"
  - "Dividir um canvas em branco em 4 faixas em menos de 30 segundos"
```

**Conteúdo a ser escrito:**

1. **Por que camadas?** - O cérebro humano processa informação hierarquicamente. Entrevistadores avaliam se você tem um modelo mental organizado. Camadas de cima pra baixo = fluxo natural de dados (quem pede, quem processa, onde guarda).

2. **Camada 1: Entrada (AZUL)** - Detalhamento completo:
   - O que colocar: usuários (mobile/web), APIs externas, webhooks (ex: callback do Pix), jobs agendados (cron), eventos externos (ex: notificação do BACEN)
   - Regra visual: máximo 3-4 boxes nesta camada. Se tem mais pontos de entrada, agrupar por tipo (ex: "Clientes" agrupa mobile + web)
   - Erro comum: misturar pontos de entrada com serviços. API Gateway é entrada, não serviço de domínio
   - Formato da box: `[ícone simples] Nome` (ex: `[phone] App Mobile`, `[webhook] Callback Pix`)

3. **Camada 2: Serviços de Domínio (VERDE/TEAL)** - Detalhamento:
   - O que colocar: microsserviços, módulos, bounded contexts
   - Regra da box: nome + responsabilidade em 3-5 palavras (ex: `Payment Service - processa transações Pix`)
   - Máximo 4-5 serviços. Se precisa de mais, você está detalhando demais para uma entrevista
   - Dica: nomeie pelo domínio de negócio, não pela tecnologia (ex: "Serviço de Antifraude", não "Kafka Consumer")
   - Como agrupar: por bounded context do DDD, nunca por tecnologia

4. **Camada 3: Dados (ROXO)** - Detalhamento:
   - O que colocar: bancos relacionais, NoSQL, cache, filas/tópicos Kafka, object storage (S3)
   - Importante: filas e tópicos ficam aqui, NÃO na camada de serviços. Kafka é infraestrutura de dados, não serviço de domínio
   - Regra visual: diferenciar o tipo de storage com forma ou ícone (cilindro para banco, retângulo com ondas para fila, nuvem para object storage)
   - Erro comum: esquecer do cache. Redis quase sempre aparece em fintechs

5. **Camada 4: Transversal (CINZA)** - Detalhamento:
   - O que colocar: observabilidade (Datadog, Grafana), auth/authz (OAuth, RBAC), rate limiting, circuit breaker, config centralizada, secrets manager, CI/CD
   - Representação visual: faixa tracejada na base do diagrama, cruzando toda a largura
   - Não usar boxes individuais para cada tool. Agrupar por categoria: "Observabilidade (Datadog + Prometheus)", "Segurança (OAuth2 + mTLS)"
   - Dica de entrevista: mencionar esta camada proativamente impressiona. A maioria dos candidatos esquece

6. **Exercício rápido: Memorização** - Sem olhar o texto acima, preencher um diagrama vazio com as 4 camadas para o cenário "sistema de transferência Pix". Usar componente `LayerFillExercise`.

**Componentes usados:** `LayerDiagram` (4 variações), `Callout`, `Checklist`, `LayerFillExercise`, `KeyTakeaway`

---

### Capítulo 2: Vocabulário Visual

**Arquivo:** `src/content/chapters/02-vocabulario-visual/index.mdx`

**Frontmatter:**
```yaml
title: "Vocabulário Visual"
subtitle: "As peças do seu kit de desenho"
chapter: 2
estimatedTime: "15 min"
difficulty: "fundamento"
tags: ["visual", "boxes", "setas", "legenda", "cores"]
prerequisites: [1]
objectives:
  - "Dominar os 6 elementos visuais que compõem qualquer diagrama de arquitetura"
  - "Saber quando usar cada forma e cor"
  - "Nunca mais esquecer a legenda"
```

**Conteúdo a ser escrito:**

1. **Os 6 elementos visuais** - Catálogo completo com SVG de exemplo para cada:
   - **Box retangular**: serviços, APIs, aplicações. Sempre com nome + descrição curta (2 infos max)
   - **Cilindro**: bancos de dados (relacional e NoSQL)
   - **Retângulo com ondas / paralelogramo**: filas e tópicos (Kafka, SQS, RabbitMQ)
   - **Nuvem**: serviços externos, object storage
   - **Seta contínua**: comunicação síncrona (REST, gRPC). Cor escura
   - **Seta tracejada**: comunicação assíncrona (eventos, filas). Cor âmbar/laranja
   - **Faixa tracejada**: componentes transversais

2. **Regra de ouro das boxes** - Duas informações por box, no máximo. Mostrar exemplos bons e ruins:
   - Bom: `Payment Service | Processa transações Pix`
   - Ruim: `Payment Service | Kotlin + Spring Boot | Processa transações Pix | Deploy em K8s | Usa PostgreSQL`
   - Por que: o entrevistador precisa fazer scan visual rápido. Excesso de info = ruído

3. **A legenda obrigatória** - Sempre, SEMPRE incluir legenda no canto inferior direito:
   - Linha contínua = síncrono (REST/gRPC)
   - Linha tracejada = assíncrono (Kafka/filas)
   - Cores por camada
   - Mostrar template de legenda pronto para copiar

4. **Cores por categoria, não por sequência** - Explicar a diferença:
   - Errado: cores diferentes para cada box na ordem que foram desenhadas
   - Certo: mesma cor para todos os componentes do mesmo tipo/camada
   - Exemplo visual comparativo

5. **Tamanho e espaçamento** - Regras práticas:
   - Boxes do mesmo tamanho dentro da mesma camada
   - Espaçamento uniforme entre boxes
   - Mínimo 2 cm de margem entre camadas (em whiteboard físico)
   - Setas devem ter espaço para o label sem sobrepor boxes

**Componentes usados:** `ArrowLegend`, `ComparisonTable`, `BeforeAfter`, diagramas SVG inline

---

### Capítulo 3: O Fluxo de Desenho

**Arquivo:** `src/content/chapters/03-fluxo-de-desenho/index.mdx`

**Frontmatter:**
```yaml
title: "O Fluxo de Desenho"
subtitle: "A ordem importa: como preencher o canvas passo a passo"
chapter: 3
estimatedTime: "20 min"
difficulty: "fundamento"
tags: ["processo", "passo a passo", "canvas"]
prerequisites: [1, 2]
objectives:
  - "Ter um processo repetível de 7 passos para preencher qualquer diagrama"
  - "Saber o que desenhar primeiro e o que deixar para o final"
  - "Nunca mais travar diante de um canvas em branco"
```

**Conteúdo a ser escrito:**

1. **O processo de 7 passos:**

   - **Passo 1 (0:00-0:30): Dividir o canvas** - Antes de qualquer box, trace 4 linhas horizontais leves dividindo o canvas em faixas. Escreva os labels das camadas na lateral esquerda: "Entrada", "Domínio", "Dados", "Transversal". Isso já mostra ao entrevistador que você tem um modelo mental. DICA: faça isso enquanto o entrevistador ainda está explicando o problema. Multitask.

   - **Passo 2 (0:30-2:00): Identificar os atores** - Pergunte ao entrevistador: "Quem inicia o fluxo?" Desenhe os pontos de entrada na Camada 1. Não precisa de detalhes ainda, só identificar quem dispara.

   - **Passo 3 (2:00-5:00): Happy path primeiro** - Desenhe o fluxo principal de sucesso. Só o caminho feliz. Nada de edge cases ainda. Coloque os serviços de domínio na Camada 2 e conecte com setas.

   - **Passo 4 (5:00-8:00): Dados e persistência** - Para cada serviço da Camada 2, pergunte: "Onde esse dado vive?" Desenhe os storages na Camada 3. Conecte com setas.

   - **Passo 5 (8:00-10:00): Classificar as setas** - Revise TODAS as setas. Para cada uma, decida: é síncrona ou assíncrona? Mude o estilo (contínua vs tracejada) e adicione labels (REST, gRPC, Kafka, etc.).

   - **Passo 6 (10:00-12:00): Transversal** - Agora, com o diagrama principal pronto, adicione a faixa transversal: onde entra observabilidade? Auth? Rate limiting? Circuit breaker?

   - **Passo 7 (12:00-15:00): Legenda + revisão** - Adicione a legenda. Revise o diagrama todo. Pergunte-se: "Um desconhecido entenderia isso em 10 segundos?"

2. **Demonstração passo a passo** - Exemplo completo: "Sistema de processamento de Pix". Mostrar 7 SVGs, um para cada passo, com o diagrama sendo construído incrementalmente. Cada SVG adiciona elementos ao anterior.

3. **Regras de timing para entrevista de 45 min:**
   - 0-5 min: Entender o problema, fazer perguntas de escopo
   - 5-20 min: Diagrama high-level (os 7 passos acima)
   - 20-35 min: Deep dive em 1-2 componentes (o entrevistador vai pedir)
   - 35-45 min: Trade-offs, escalabilidade, o que mudaria com 10x/100x volume

4. **O que NÃO fazer nos primeiros 5 minutos:**
   - Não comece a desenhar sem entender o escopo
   - Não mergulhe em detalhes de um serviço específico
   - Não discuta tecnologias antes de ter a visão geral
   - Não desenhe modelo de dados antes do diagrama de arquitetura

**Componentes usados:** `LayerDiagram` (7 versões incrementais), `TimerChallenge`, `Callout`, `KeyTakeaway`

---

### Capítulo 4: Comunicação Síncrona vs Assíncrona

**Arquivo:** `src/content/chapters/04-comunicacao-sync-async/index.mdx`

**Frontmatter:**
```yaml
title: "Comunicação Síncrona vs Assíncrona"
subtitle: "A diferença que separa diagramas amadores de profissionais"
chapter: 4
estimatedTime: "20 min"
difficulty: "intermediário"
tags: ["sync", "async", "kafka", "rest", "grpc", "filas"]
prerequisites: [2]
objectives:
  - "Saber decidir quando usar comunicação sync vs async em cada seta"
  - "Representar visualmente a diferença de forma inequívoca"
  - "Explicar verbalmente o trade-off de cada escolha"
```

**Conteúdo a ser escrito:**

1. **A regra visual** - Detalhamento do sistema de setas com diagrama SVG grande:
   - Seta contínua + cor escura = síncrono. Label: protocolo (REST, gRPC). Semântica: "eu espero a resposta"
   - Seta tracejada + cor âmbar = assíncrono. Label: mecanismo (Kafka, SQS, RabbitMQ). Semântica: "eu disparo e sigo"
   - Sempre colocar o label na seta, nunca assumir que o entrevistador vai adivinhar

2. **Quando usar cada um** - Tabela de decisão:
   - Sync quando: o cliente precisa da resposta para continuar, operação é rápida (<500ms), erros precisam de feedback imediato
   - Async quando: processamento demorado, sistemas desacoplados, garantia de entrega importa mais que latência, fan-out para múltiplos consumidores
   - Exemplos reais: consulta de saldo (sync), processamento de Pix (async), validação de CPF (sync), notificação por email (async), análise de fraude (pode ser ambos, dependendo do SLA)

3. **Padrões comuns em fintechs:**
   - Request-Reply síncrono: App -> API Gateway -> Payment Service -> resposta
   - Fire-and-forget: Payment Service -> Kafka topic -> Notification Service
   - Saga orquestrada: Orchestrator chama serviços sequencialmente (sync) mas cada etapa publica eventos (async)
   - CQRS: Write path async (evento -> projeção), Read path sync (query direto)
   - Cada padrão com diagrama SVG mostrando as setas corretamente

4. **O erro mais comum** - Desenhar tudo como seta contínua (tudo sync) ou tudo tracejada (tudo async). O entrevistador quer ver que você PENSA sobre a natureza de cada comunicação. Mostrar exemplo `BeforeAfter`.

5. **Exercício: Classificar setas** - Dado um diagrama com 8 setas sem estilo, o aluno deve classificar cada uma como sync ou async e justificar. Usar `DiagramCritique`.

**Componentes usados:** `ArrowLegend`, `ComparisonTable`, `BeforeAfter`, `DiagramCritique`, `FlowDiagram` (Mermaid)

---

### Capítulo 5: Camada de Entrada em Profundidade

**Arquivo:** `src/content/chapters/05-camada-entrada/index.mdx`

**Frontmatter:**
```yaml
title: "Camada de Entrada em Profundidade"
subtitle: "Quem dispara o fluxo? Desenhando pontos de entrada"
chapter: 5
estimatedTime: "15 min"
difficulty: "intermediário"
tags: ["entrada", "api gateway", "webhook", "mobile", "web"]
prerequisites: [1, 3]
objectives:
  - "Mapear todos os pontos de entrada de um sistema"
  - "Saber quando usar API Gateway, BFF, ou acesso direto"
  - "Representar diferentes tipos de clientes visualmente"
```

**Conteúdo a ser escrito:**

1. **Tipos de ponto de entrada em fintechs:**
   - Apps mobile (iOS/Android) - via BFF ou API Gateway
   - Web app (dashboard administrativo, portal do cliente)
   - Webhooks recebidos (callbacks do Pix do BACEN, notificações de parceiros)
   - APIs B2B (integração com ERPs, marketplaces)
   - Jobs agendados (conciliação diária, fechamento, batch de cobrança)
   - Eventos externos (mudança regulatória, atualização de taxa de câmbio)

2. **API Gateway vs BFF** - Quando desenhar cada um:
   - API Gateway: quando há múltiplos clientes consumindo os mesmos serviços
   - BFF (Backend for Frontend): quando mobile e web têm necessidades diferentes
   - Diagrama mostrando as duas abordagens

3. **Regras visuais para a Camada 1:**
   - Usar ícones simples e reconhecíveis (celular, monitor, relógio, globo)
   - Agrupar clientes similares (não desenhar "iOS" e "Android" separados, use "App Mobile")
   - API Gateway pode ser a fronteira entre Camada 1 e Camada 2
   - Label de protocolo na seta de entrada (HTTPS, WebSocket, gRPC)

4. **Exemplo completo: Onboarding KYC** - Diagrama da Camada 1 para um fluxo de onboarding: App Mobile -> API Gateway -> (depois continua nas próximas camadas). Mostrar como representar upload de documento, selfie, e preenchimento de dados como entradas distintas ou agrupadas.

**Componentes usados:** `LayerDiagram` (foco na Camada 1), `ComparisonTable`, `Callout`

---

### Capítulo 6: Camada de Serviços em Profundidade

**Arquivo:** `src/content/chapters/06-camada-servicos/index.mdx`

**Frontmatter:**
```yaml
title: "Camada de Serviços de Domínio em Profundidade"
subtitle: "O coração do sistema: quem processa o quê"
chapter: 6
estimatedTime: "25 min"
difficulty: "intermediário"
tags: ["serviços", "microsserviços", "DDD", "bounded context"]
prerequisites: [1, 3]
objectives:
  - "Decidir a granularidade dos serviços para uma entrevista"
  - "Nomear serviços pelo domínio, não pela tecnologia"
  - "Saber quando quebrar e quando manter junto"
```

**Conteúdo a ser escrito:**

1. **Granularidade para entrevista** - Não é deploy, é comunicação:
   - Numa entrevista de 45 min, desenhe 3-5 serviços de domínio. Mais que isso vira ruído
   - Cada serviço = um bounded context claro
   - Se não consegue descrever a responsabilidade em 5 palavras, o serviço está grande demais ou mal definido
   - O entrevistador pode pedir deep dive em um serviço; aí você abre um sub-diagrama

2. **Nomenclatura que funciona:**
   - Padrão: `[Domínio] Service` (ex: `Payment Service`, `Fraud Detection Service`, `Account Service`)
   - A descrição curta: verbo + objeto (ex: "Processa transações", "Valida identidade", "Gerencia saldos")
   - Evitar: nomes genéricos ("Core Service", "Main Service"), nomes técnicos ("Kafka Consumer Service", "REST API Service")

3. **Padrões de comunicação entre serviços:**
   - Orquestração (um serviço coordena os outros, sync)
   - Coreografia (serviços reagem a eventos, async)
   - Saga (mix dos dois para transações distribuídas)
   - Cada padrão com diagrama mostrando as setas na Camada 2

4. **Exemplo: Split de pagamento** - Cenário de marketplace/benefícios onde um pagamento precisa ser dividido entre múltiplos recebedores. Mostrar os serviços envolvidos: Payment Service, Split Engine, Account Service, Settlement Service. Diagrama completo com Camada 2 detalhada.

5. **Exercício: Nomeação de serviços** - Dado um cenário (antifraude), listar os serviços e suas responsabilidades em 5 palavras. Comparar com solução ideal.

**Componentes usados:** `LayerDiagram`, `ComparisonTable`, `ExerciseBlock`, `SolutionReveal`

---

### Capítulo 7: Camada de Dados em Profundidade

**Arquivo:** `src/content/chapters/07-camada-dados/index.mdx`

**Frontmatter:**
```yaml
title: "Camada de Dados em Profundidade"
subtitle: "Onde os dados vivem, como fluem, e por que isso importa"
chapter: 7
estimatedTime: "25 min"
difficulty: "intermediário"
tags: ["dados", "banco", "cache", "kafka", "redis", "postgresql"]
prerequisites: [1, 3, 4]
objectives:
  - "Escolher o storage correto para cada tipo de dado em fintechs"
  - "Representar diferentes tipos de storage com formas visuais distintas"
  - "Saber quando cache, fila e banco relacional coexistem no mesmo fluxo"
```

**Conteúdo a ser escrito:**

1. **Tipos de storage e suas formas visuais:**
   - Banco relacional (PostgreSQL, MySQL): cilindro com label "SQL"
   - NoSQL (DynamoDB, MongoDB): cilindro com cantos arredondados ou label "NoSQL"
   - Cache (Redis): retângulo com raio ou label "Cache"
   - Fila/Tópico (Kafka, SQS): paralelogramo ou retângulo com ondas
   - Object Storage (S3): nuvem
   - Cada tipo com SVG de exemplo

2. **Decisão de storage para fintechs** - Tabela de decisão:
   - Transações financeiras: PostgreSQL (ACID obrigatório)
   - Sessões e tokens: Redis (TTL, velocidade)
   - Eventos e audit log: Kafka + storage de longo prazo
   - Documentos de KYC (imagens): S3
   - Configurações e feature flags: Redis ou config service
   - Dados analíticos: data lake ou warehouse (fora do diagrama principal)

3. **O erro do "banco pra tudo"** - Anti-padrão comum: um único PostgreSQL para tudo. Mostrar `BeforeAfter` com um banco monolítico vs polyglot persistence. Explicar que o entrevistador quer ver que você pensa em trade-offs de storage.

4. **Kafka na Camada 3, não na 2** - Por que filas e tópicos são infraestrutura de dados, não serviços de domínio. Kafka é o meio pelo qual dados fluem, assim como um banco é onde dados persistem. Diagrama mostrando a posição correta.

5. **Exemplo: Sistema de saldos** - Cenário de gestão de saldos em tempo real (conta digital). Mostrar PostgreSQL para saldo consolidado, Redis para saldo em cache (consulta rápida), Kafka para eventos de movimentação, S3 para comprovantes.

6. **Exercício: Escolha de storage** - Dado um cenário com 6 tipos de dados diferentes, mapear cada um para o storage adequado e posicionar na Camada 3.

**Componentes usados:** `LayerDiagram`, `ComparisonTable`, `BeforeAfter`, `ExerciseBlock`, `SolutionReveal`

---

### Capítulo 8: Camada Transversal em Profundidade

**Arquivo:** `src/content/chapters/08-camada-transversal/index.mdx`

**Frontmatter:**
```yaml
title: "Camada Transversal em Profundidade"
subtitle: "O diferencial que impressiona entrevistadores"
chapter: 8
estimatedTime: "20 min"
difficulty: "intermediário"
tags: ["observabilidade", "auth", "rate limiting", "circuit breaker", "resiliência"]
prerequisites: [1, 3]
objectives:
  - "Listar os componentes transversais críticos para fintechs"
  - "Saber quais mencionar proativamente na entrevista"
  - "Representar a camada transversal como faixa, não como boxes soltas"
```

**Conteúdo a ser escrito:**

1. **Por que esta camada impressiona** - A maioria dos candidatos esquece. Mencionar proativamente mostra maturidade. O entrevistador geralmente pergunta: "E como você monitora isso?" Se você já desenhou, ganha pontos.

2. **Os 6 grupos transversais para fintechs:**
   - **Observabilidade:** métricas (Prometheus/Datadog), logs estruturados (ELK/Datadog Logs), tracing distribuído (Jaeger/Datadog APM), alertas. Representar como bloco único "Observabilidade"
   - **Autenticação e Autorização:** OAuth2, mTLS entre serviços, RBAC/ABAC, API keys para parceiros. Representar como "Auth/AuthZ"
   - **Rate Limiting e Throttling:** proteção contra abuso e garantia de SLA. Crítico em APIs públicas de fintech
   - **Resiliência:** Circuit Breaker, retry com backoff, fallback, bulkhead. Não são serviços, são políticas aplicadas a todas as comunicações
   - **Gestão de Configuração:** feature flags, config centralizada, secrets management (Vault, AWS Secrets Manager). Sem isso, deploy em produção é caos
   - **CI/CD e Deploy:** pipeline de build, canary deployment, blue/green. Mencionar brevemente, não detalhar

3. **Como representar visualmente** - Faixa tracejada horizontal na base do diagrama. Dentro da faixa: labels dos grupos separados por pipe. Exemplo: `| Observabilidade | Auth/AuthZ | Rate Limiting | Resiliência | Config |`

4. **Trade-offs como componentes explícitos** - Quando o entrevistador pergunta "e se o serviço X cair?", a resposta deve apontar para algo que já está no diagrama (Circuit Breaker na camada transversal), não ser uma nota mental. Transforme decisões de resiliência em componentes visuais.

5. **Exemplo: Transversal para gateway de pagamentos** - Diagrama completo com foco na Camada 4. Mostrar como cada grupo transversal se relaciona com as camadas acima.

**Componentes usados:** `LayerDiagram` (foco Camada 4), `Callout`, `Checklist`, `KeyTakeaway`

---

### Capítulo 9: Modelo de Dados Separado

**Arquivo:** `src/content/chapters/09-modelo-dados-separado/index.mdx`

**Frontmatter:**
```yaml
title: "Modelo de Dados: Sempre em Diagrama Separado"
subtitle: "ERD e schema design não se misturam com arquitetura"
chapter: 9
estimatedTime: "15 min"
difficulty: "intermediário"
tags: ["modelo de dados", "ERD", "schema", "normalização"]
prerequisites: [7]
objectives:
  - "Saber quando e como apresentar o modelo de dados na entrevista"
  - "Criar ERDs limpos que complementam o diagrama de arquitetura"
  - "Nunca misturar schema com diagrama de serviços"
```

**Conteúdo a ser escrito:**

1. **A regra de ouro:** Modelo de dados e diagrama de arquitetura são documentos SEPARADOS. Misturar os dois cria poluição visual e confunde o entrevistador. O diagrama de arquitetura mostra FLUXO. O ERD mostra ESTRUTURA.

2. **Quando desenhar o ERD na entrevista:**
   - Quando o entrevistador pedir explicitamente: "Me mostra o schema"
   - Quando o deep dive for no serviço que mais depende de dados (ex: Account Service)
   - NUNCA proativamente no início. Primeiro a arquitetura, depois o modelo de dados se pedido

3. **Regras visuais do ERD para entrevista:**
   - Máximo 5-7 entidades. Menos é mais
   - Só chaves primárias e estrangeiras. Nada de listar todos os campos
   - Para campos relevantes, listar apenas 3-5 por entidade (os de negócio, não created_at)
   - Usar notação simples: retângulo com nome da tabela e lista de campos-chave
   - Indicar cardinalidade nas relações (1:N, N:M)

4. **Template de ERD para fintechs** - Entidades recorrentes em fintechs: Account, Transaction, User, Wallet, PaymentOrder, Settlement, AuditLog. Diagrama Mermaid de exemplo.

5. **Exercício: ERD para split de pagamento** - Dado o cenário do capítulo 6, desenhar o ERD. Solução com `SolutionReveal`.

**Componentes usados:** `FlowDiagram` (Mermaid ERD), `BeforeAfter`, `ExerciseBlock`, `SolutionReveal`

---

### Capítulo 10: Anti-padrões Visuais

**Arquivo:** `src/content/chapters/10-anti-padroes/index.mdx`

**Frontmatter:**
```yaml
title: "Anti-padrões Visuais"
subtitle: "O que NÃO fazer (e como corrigir)"
chapter: 10
estimatedTime: "20 min"
difficulty: "avançado"
tags: ["anti-padrão", "erros", "correção"]
prerequisites: [1, 2, 3, 4]
objectives:
  - "Reconhecer os 8 anti-padrões visuais mais comuns"
  - "Saber corrigir cada um em menos de 1 minuto"
  - "Treinar o olho crítico para revisar seus próprios diagramas"
```

**Conteúdo a ser escrito:**

8 anti-padrões, cada um com `BeforeAfter`:

1. **O Espaguete** - Tudo conectado com tudo, sem camadas. Setas cruzando em todas as direções. Correção: aplicar o framework de 4 camadas.

2. **O Monobloco** - Um único retângulo gigante "Sistema" com setas entrando e saindo. Zero granularidade. Correção: decompor em serviços de domínio.

3. **O Tecnologista** - Boxes nomeadas por tecnologia ("Kafka", "Redis", "PostgreSQL") sem contexto de negócio. Correção: nomear pelo domínio, tecnologia vai no label secundário.

4. **O Seta-Única** - Todas as setas iguais (tudo sync ou tudo async). Correção: classificar cada seta individualmente.

5. **O Sem-Legenda** - Diagrama com setas de vários tipos mas nenhuma legenda. Entrevistador não sabe o que é o quê. Correção: adicionar legenda obrigatória.

6. **O Detalhista** - 15+ boxes com campos de banco, versões de API, portas de rede. Excesso de info para entrevista de 45 min. Correção: reduzir a 4-5 boxes por camada.

7. **O Esquecido** - Diagrama sem observabilidade, sem auth, sem resiliência. Só happy path. Correção: adicionar Camada 4 transversal.

8. **O Misturador** - Schema de banco misturado com diagrama de arquitetura. Colunas de tabela dentro de boxes de serviço. Correção: separar em dois diagramas.

**Componentes usados:** `BeforeAfter` (8 pares), `Callout`, `KeyTakeaway`

---

### Capítulo 11: Narração ao Vivo

**Arquivo:** `src/content/chapters/11-narracao-ao-vivo/index.mdx`

**Frontmatter:**
```yaml
title: "Narração ao Vivo"
subtitle: "Como falar enquanto desenha sem perder o fio"
chapter: 11
estimatedTime: "15 min"
difficulty: "avançado"
tags: ["comunicação", "narração", "entrevista", "soft skill"]
prerequisites: [3]
objectives:
  - "Dominar o template de narração para cada camada"
  - "Saber conectar fala e desenho sem pausas longas"
  - "Lidar com perguntas do entrevistador sem perder a linha"
```

**Conteúdo a ser escrito:**

1. **O problema do silêncio** - Desenhar em silêncio por 5 minutos mata a entrevista. O entrevistador quer avaliar seu raciocínio, não só o resultado. Se você não fala, ele não sabe se você está pensando ou travado.

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

5. **Exercício de narração** - Instrução para praticar em voz alta: gravar-se narrando um diagrama usando o template. Tempo alvo: 3 min para narrar as 4 camadas. Usar `TimerChallenge`.

**Componentes usados:** `Callout`, `KeyTakeaway`, `TimerChallenge`, `QuoteBlock`

---

### Capítulo 12: Exercícios Guiados

**Arquivo:** `src/content/chapters/12-exercicios-guiados/index.mdx`

**Frontmatter:**
```yaml
title: "Exercícios Guiados"
subtitle: "Passo a passo com solução comentada"
chapter: 12
estimatedTime: "60 min"
difficulty: "avançado"
tags: ["exercício", "prática", "pix", "antifraude", "onboarding"]
prerequisites: [1, 2, 3, 4, 5, 6, 7, 8]
objectives:
  - "Aplicar o framework completo em 4 cenários reais de fintech"
  - "Comparar sua solução com a solução de referência"
  - "Identificar gaps no seu processo de desenho"
```

**Conteúdo a ser escrito:**

#### Exercício 12.1: Processamento de Pix em Tempo Real

**Enunciado:**
Você está projetando o sistema de processamento de Pix de um banco digital. Requisitos: receber Pix (crédito), enviar Pix (débito), notificar o usuário em tempo real, manter audit trail completo, processar no mínimo 1000 TPS em horário de pico.

**Solução passo a passo:**

Cada passo deve ser apresentado como um bloco com:
- O que desenhar neste passo (texto)
- O diagrama SVG mostrando o estado ATUAL do canvas (acumulativo)
- Narração sugerida (o que falar enquanto desenha)
- Por que esta decisão (justificativa técnica)

**Passo 1:** Dividir canvas em 4 camadas.
**Passo 2:** Camada 1 - App Mobile, Webhook BACEN (recebimento de Pix), Job de conciliação.
**Passo 3:** Camada 2 - Pix Gateway (recebe/envia instruções SPI), Transaction Service (registra e valida), Notification Service (push + in-app), Fraud Detection (análise em tempo real).
**Passo 4:** Camada 3 - PostgreSQL (transações, ACID), Kafka (eventos de transação), Redis (cache de status, idempotência), S3 (comprovantes).
**Passo 5:** Setas - App->Gateway (REST sync), Gateway->Transaction (gRPC sync), Transaction->Kafka (async), Kafka->Notification (async), Kafka->Fraud Detection (async), Transaction->PostgreSQL (sync), BACEN Webhook->Gateway (REST sync).
**Passo 6:** Camada 4 - Observabilidade (Datadog), Auth (mTLS + OAuth2), Rate Limiting (proteção do SPI), Circuit Breaker (fallback se BACEN fora).
**Passo 7:** Legenda + revisão.

**Diagrama final completo** com todas as camadas, setas classificadas, legenda.

**Avaliação da solução:** Nota em 4 eixos (organização, completude, clareza, trade-offs).

**Trade-offs para discussão:**
- Por que Kafka e não RabbitMQ? (ordenação garantida por partition key = chave Pix)
- Por que PostgreSQL e não DynamoDB? (ACID para transações financeiras)
- E se o BACEN ficar fora? (circuit breaker + fila de retry com dead letter)
- Idempotência: como garantir? (idempotency key no Redis com TTL)

---

#### Exercício 12.2: Sistema de Antifraude em Tempo Real

**Enunciado:**
Projete um sistema de antifraude para uma fintech de pagamentos. Requisitos: análise em tempo real (< 200ms para aprovação), análise assíncrona para casos duvidosos (revisão manual), integração com bureaus externos (Serasa, TransUnion), machine learning para scoring, bloqueio automático de contas suspeitas.

**Solução passo a passo** (mesmo formato do 12.1, com 7 passos incrementais).

Camada 1: Payment Service (trigger), Admin Dashboard (revisão manual).
Camada 2: Risk Engine (scoring ML), Rules Engine (regras estáticas), Case Manager (fila de revisão), Bureau Connector (integração externa).
Camada 3: Feature Store (Redis, features em tempo real), PostgreSQL (histórico de decisões), Kafka (stream de eventos), ML Model Store (S3).
Camada 4: Observabilidade (métricas de false positive/negative), Circuit Breaker (bureaus externos), Rate Limiting.

**Trade-offs:** latência vs acurácia, regras estáticas vs ML, sync para fast-path vs async para review.

---

#### Exercício 12.3: Onboarding e KYC Digital

**Enunciado:**
Projete o fluxo de onboarding de uma conta digital com KYC (Know Your Customer). Requisitos: captura de documentos (RG/CNH), selfie com liveness detection, validação de CPF, checagem em listas restritivas (PEP, sanções), aprovação automática para casos limpos, fila de revisão para casos com pendência.

**Solução passo a passo** (mesmo formato).

Camada 1: App Mobile (upload de docs), Admin Portal (revisão manual).
Camada 2: Document Service (OCR + validação), Identity Service (liveness + face match), Compliance Service (PEP/sanções), Onboarding Orchestrator (saga).
Camada 3: S3 (documentos e selfies), PostgreSQL (status do onboarding, dados pessoais), Redis (cache de listas restritivas), Kafka (eventos de progresso).
Camada 4: Observabilidade, Auth, Criptografia em repouso (dados sensíveis).

**Trade-offs:** orquestração vs coreografia para o fluxo, storage de PII, LGPD.

---

#### Exercício 12.4: Sistema de Split de Pagamento

**Enunciado:**
Projete um sistema de split de pagamento para um marketplace de benefícios. Requisitos: um pagamento é dividido entre N recebedores com regras configuráveis, liquidação (settlement) em D+1, estorno parcial se um recebedor cancelar, relatórios de reconciliação.

**Solução passo a passo** (mesmo formato).

Camada 1: Merchant API, Admin Dashboard, Job de Settlement (cron D+1).
Camada 2: Payment Service, Split Engine (calcula divisão), Settlement Service (liquida), Reconciliation Service.
Camada 3: PostgreSQL (transações, splits, settlements), Kafka (eventos), Redis (cache de regras de split).
Camada 4: Observabilidade, Auth, Idempotência (retry-safe).

**Trade-offs:** consistência eventual vs forte no split, saga para estorno parcial, CQRS para relatórios.

---

### Capítulo 13: Exercícios Livres (Sem Solução Imediata)

**Arquivo:** `src/content/chapters/13-exercicios-livres/index.mdx`

**Frontmatter:**
```yaml
title: "Exercícios Livres"
subtitle: "Simule a entrevista real: sem solução na tela"
chapter: 13
estimatedTime: "90 min (total)"
difficulty: "avançado"
tags: ["exercício", "simulação", "entrevista", "prática livre"]
prerequisites: [12]
objectives:
  - "Praticar sem apoio, simulando condições reais de entrevista"
  - "Completar cada exercício em 15-20 minutos"
  - "Usar o checklist de validação para autoavaliação"
```

**Conteúdo a ser escrito:**

Cada exercício contém: enunciado, requisitos, restrições e o checklist de validação. A solução de referência fica em `SolutionReveal` mas com aviso forte para tentar sozinho primeiro.

#### 13.1: Carteira Digital com Multi-moeda
Projetar uma carteira digital que suporta BRL, USD e cripto. Requisitos: conversão em tempo real, limites por moeda, extrato consolidado.

#### 13.2: Gateway de Pagamentos Multi-adquirente
Sistema que roteia transações de cartão entre múltiplas adquirentes (Cielo, Rede, Stone) com fallback automático e otimização de custo.

#### 13.3: Sistema de Cashback Programável
Plataforma onde merchants configuram regras de cashback (percentual, teto, categorias). Requisitos: cálculo em tempo real, crédito em carteira, relatórios.

#### 13.4: Plataforma de Empréstimo P2P
Marketplace onde investidores financiam empréstimos a tomadores. Requisitos: scoring de crédito, matching automático, controle de inadimplência, compliance.

#### 13.5: Sistema de Cobrança Recorrente (Subscription Billing)
Motor de cobrança para SaaS com planos, upgrades, dunning (retry de cobrança falhada), proration, faturas.

#### 13.6: Open Banking / Open Finance Hub
Agregador de dados financeiros de múltiplos bancos via API Open Finance do BACEN. Requisitos: consent management, cache de dados, refresh de tokens.

Para cada exercício: enunciado detalhado + `TimerChallenge` de 15 min + checklist de validação + `SolutionReveal` com diagrama de referência completo.

---

### Capítulo 14: Checklist Final de Validação

**Arquivo:** `src/content/chapters/14-checklist-final/index.mdx`

**Frontmatter:**
```yaml
title: "Checklist Final de Validação"
subtitle: "Revise isso 5 minutos antes da entrevista"
chapter: 14
estimatedTime: "5 min"
difficulty: "fundamento"
tags: ["checklist", "revisão", "entrevista"]
objectives:
  - "Ter um checklist imprimível para revisar antes de qualquer entrevista"
  - "Validar qualquer diagrama em menos de 2 minutos"
```

**Conteúdo a ser escrito:**

Checklist interativo com checkboxes (componente `Checklist`) organizado por categoria:

**Estrutura:**
- [ ] Canvas dividido em 4 camadas horizontais?
- [ ] Labels das camadas visíveis na lateral?
- [ ] Máximo 4-5 boxes por camada?

**Camada 1 - Entrada:**
- [ ] Todos os pontos de entrada identificados?
- [ ] Atores agrupados por tipo (não duplicados)?
- [ ] Protocolo de entrada indicado nas setas?

**Camada 2 - Serviços:**
- [ ] Cada box tem nome + responsabilidade (max 5 palavras)?
- [ ] Nomes refletem domínio de negócio, não tecnologia?
- [ ] Comunicação entre serviços tem setas com label?

**Camada 3 - Dados:**
- [ ] Cada serviço tem pelo menos um storage associado?
- [ ] Tipos de storage diferenciados visualmente?
- [ ] Kafka/filas estão na Camada 3, não na 2?
- [ ] Cache (Redis) presente onde faz sentido?

**Camada 4 - Transversal:**
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

### Capítulo 15: Apêndices

**Arquivo:** `src/content/chapters/15-apendices/index.mdx`

**Frontmatter:**
```yaml
title: "Apêndices"
subtitle: "Referências rápidas e templates"
chapter: 15
estimatedTime: "10 min"
difficulty: "fundamento"
tags: ["referência", "template", "glossário"]
objectives:
  - "Ter acesso rápido a templates e referências"
```

**Conteúdo a ser escrito:**

#### A. Template de Diagrama em Branco
SVG/PNG do framework de 4 camadas vazio, pronto para copiar e preencher no Miro/Excalidraw. Com marcações de posição para boxes e setas.

#### B. Glossário de Ícones e Formas
Tabela visual com todas as formas usadas no playbook e seus significados.

#### C. Stack de Referência para Fintechs BR
Tabela com as tecnologias mais comuns em fintechs brasileiras, organizadas por categoria (linguagem, framework, banco, mensageria, infra, observabilidade).

#### D. Perguntas Frequentes de Entrevistadores
Lista de 20 perguntas comuns de follow-up em entrevistas de system design e como responder cada uma apontando para o diagrama.

#### E. Recursos Complementares
Links para prática adicional: canais, livros, repositórios de referência.

---

## 4. Componentes Interativos (Especificação de Comportamento)

### 4.1 SolutionReveal (React Island)

```
Estado: collapsed | expanded
Transição: click no botão → slide down com ease-out 300ms
Botão colapsado: ícone de olho fechado + "Tente resolver antes de ver a solução"
Botão expandido: ícone de olho aberto + "Esconder solução"
Cor do container: bg amarelo claro (aviso) quando colapsado, bg branco quando expandido
Persiste estado em sessionStorage (chave = exercício ID)
```

### 4.2 TimerChallenge (React Island)

```
Estado: idle | running | paused | finished
Display: MM:SS contagem regressiva
Cor do timer: verde (>50% tempo), amarelo (25-50%), vermelho (<25%)
Ao finalizar: som sutil (opcional, toggle) + mensagem "Tempo esgotado! Verifique o checklist."
Fases: lista de checkboxes marcáveis durante o exercício
Botões: Iniciar, Pausar, Reiniciar
```

### 4.3 LayerFillExercise (React Island)

```
Canvas vazio com 4 faixas de camada.
Drag-and-drop de componentes pré-definidos para dentro das camadas.
Componentes errados na camada errada ficam com borda vermelha.
Botão "Verificar" compara com gabarito e mostra score.
Feedback: lista de erros com explicação.
```

### 4.4 Checklist (Astro + localStorage)

```
Checkboxes interativos que persistem em localStorage.
Botão "Limpar tudo" para resetar.
Barra de progresso mostrando % preenchido.
Funciona 100% client-side via <script> tag no Astro (sem React).
```

### 4.5 DiagramCritique (React Island)

```
Mostra um diagrama com problemas intencionais.
Aluno clica nos elementos problemáticos.
Para cada clique correto: popup com explicação do problema.
Marcador visual (X vermelho) nos problemas encontrados.
Score: X de Y problemas encontrados.
Botão "Revelar todos" para mostrar os que faltaram.
```

---

## 5. Design e UX

### 5.1 Landing Page

A landing page (`src/pages/index.astro`) deve:

- Hero com título principal: "System Design Visual Playbook"
- Subtítulo: "Pare de reprovar em entrevistas de System Design. Aprenda a comunicar visualmente suas soluções de arquitetura."
- CTA: "Começar o Playbook" (âncora para capítulo 0)
- Preview visual: o diagrama de 4 camadas animado (SVG com fade-in por camada)
- Seção "Para quem é este guia" (3 cards: Backend Sênior, Staff Engineer, Aspirante a Tech Lead)
- Seção "O que você vai aprender" (lista visual dos capítulos com ícones)
- Seção "O framework" (diagrama de 4 camadas estático com labels)
- Footer com créditos e link para repositório

### 5.2 Layout de Capítulo

Estrutura de 3 colunas em desktop:

```
[Sidebar 240px] [Conteúdo 720px] [TOC 200px]
```

- **Sidebar esquerda:** lista de capítulos com indicador do capítulo atual. Colapsável em mobile (hamburger)
- **Conteúdo central:** texto MDX renderizado com componentes. Max-width 720px para legibilidade
- **TOC direita:** table of contents do capítulo atual com scroll spy (destaca seção visível). Esconde em telas < 1280px

Navegação entre capítulos: botões "Anterior" e "Próximo" no rodapé do conteúdo.

Barra de progresso no topo: indica % do capítulo lido (baseado em scroll).

### 5.3 Responsividade

- Desktop (>1280px): 3 colunas
- Tablet (768-1280px): sidebar colapsável + conteúdo. TOC escondido
- Mobile (<768px): conteúdo full-width, sidebar via menu hamburger, TOC via dropdown

### 5.4 Dark Mode

Toggle no header. Persiste em localStorage. Respeita `prefers-color-scheme` do sistema como default. Todas as cores do design system têm variante dark (definidas em global.css).

### 5.5 Tipografia

- Títulos: variável com peso bold, tamanho responsivo (clamp)
- Corpo: 16px/1.6 line-height, max 72 caracteres por linha
- Código: JetBrains Mono, fundo levemente diferente do corpo
- Labels de diagrama: sans-serif condensada para caber em boxes pequenas

### 5.6 Performance

Target: 100 no Lighthouse em todas as páginas.
- Astro gera HTML estático (zero JS por padrão)
- React islands carregam apenas nas páginas que usam (`client:visible`)
- Fonts preloaded e font-display: swap
- Imagens em formato WebP com lazy loading
- SVGs inline (sem requests extras)

---

## 6. SEO e Metadados

### 6.1 Meta tags por página

```html
<title>{chapter.title} | System Design Visual Playbook</title>
<meta name="description" content="{chapter.subtitle}" />
<meta property="og:title" content="{chapter.title}" />
<meta property="og:description" content="{chapter.subtitle}" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="article" />
<link rel="canonical" href="https://system-design-playbook.dev/{slug}" />
```

### 6.2 Structured Data

JSON-LD de Book/Course em cada página para rich snippets.

### 6.3 Sitemap

Gerado automaticamente pelo Astro (`@astrojs/sitemap`).

---

## 7. Deploy e CI/CD

### 7.1 Deploy

Vercel ou Netlify com configuração zero para Astro.

```json
// vercel.json (se necessário)
{
  "framework": "astro"
}
```

### 7.2 CI/CD

GitHub Actions:
- Push em `main`: build + deploy em produção
- Pull request: build + preview deploy
- Lint: ESLint + Prettier
- Type check: `astro check`

### 7.3 Dependências principais

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

## 8. Métricas de Sucesso do Produto

### 8.1 Engajamento

- Tempo médio por capítulo > 10 minutos (indica leitura real)
- Taxa de conclusão do playbook > 40% (chegou ao capítulo 14)
- Exercícios completados: média > 6 dos 10 disponíveis

### 8.2 Técnico

- Lighthouse score: 100 em Performance, Accessibility, SEO
- First Contentful Paint < 1s
- Time to Interactive < 2s
- Bundle JS total < 50KB (islands only)

### 8.3 Comunidade

- Stars no GitHub > 500 em 3 meses
- Compartilhamentos em LinkedIn (público-alvo é ativo lá)
- Feedback qualitativo: "passei na entrevista usando o framework"

---

## 9. Fases de Desenvolvimento

### Fase 1: Fundação (MVP)
- Setup Astro + Tailwind + MDX
- Layouts (Base, Chapter, Exercise)
- Componentes UI (Sidebar, TOC, ThemeToggle, Footer)
- Landing page
- Capítulos 0-4 (fundamentos)
- Deploy inicial

### Fase 2: Conteúdo Core
- Capítulos 5-9 (camadas em profundidade)
- Componentes de diagrama (LayerDiagram SVG, ArrowLegend, BeforeAfter)
- Capítulo 10 (anti-padrões)
- Capítulo 11 (narração)

### Fase 3: Exercícios
- React islands (SolutionReveal, TimerChallenge, LayerFillExercise, DiagramCritique)
- Capítulo 12 (exercícios guiados com diagramas incrementais)
- Capítulo 13 (exercícios livres)

### Fase 4: Polish
- Capítulos 14-15 (checklist + apêndices)
- SEO + structured data
- Dark mode refinamento
- Responsividade final
- Lighthouse optimization
- README do repositório

---

## 10. Instruções para o Claude Code

### 10.1 Contexto

Este PRD descreve um site Astro que funciona como ebook interativo. O conteúdo é em português brasileiro. O público é técnico (devs backend seniores). O design deve ser limpo, profissional e focado em legibilidade.

### 10.2 Prioridades

1. **Conteúdo em primeiro lugar.** Os textos dos capítulos são o coração do produto. Escreva conteúdo rico, direto e prático. Sem enrolação. O leitor é sênior e não precisa de explicações básicas.
2. **Diagramas SVG de alta qualidade.** Os diagramas de 4 camadas são o diferencial. Devem ser SVGs inline responsivos, com as cores do design system, setas diferenciadas, legendas e labels claros.
3. **Interatividade apenas onde agrega.** React islands apenas para SolutionReveal, TimerChallenge, LayerFillExercise e DiagramCritique. Todo o resto é Astro estático.
4. **Mobile-first.** Os diagramas precisam funcionar em tela pequena (scroll horizontal ou versão simplificada).

### 10.3 Regras de escrita

- Idioma: português brasileiro
- Tom: direto, técnico, sem condescendência. "Você já sabe o que é Kafka. O que você precisa é saber ONDE colocar ele no diagrama."
- Nunca usar travessão "—"
- Usar "você" (informal)
- Exemplos sempre contextualizados em fintechs brasileiras
- Jargões técnicos em inglês quando são padrão da indústria (bounded context, circuit breaker, rate limiting)
- Títulos de capítulo curtos e diretos

### 10.4 Padrões de código

- TypeScript strict em todo o projeto
- Componentes Astro para tudo que não precisa de estado client-side
- React (com hooks) apenas para islands interativos
- Tailwind utility classes, sem CSS custom exceto variáveis globais
- Nomes de arquivo em kebab-case
- Commits semânticos (feat:, fix:, docs:, style:)

### 10.5 Ordem de implementação sugerida

1. `npm create astro@latest system-design-playbook` com template mínimo
2. Instalar dependências: `@astrojs/react`, `@astrojs/tailwind`, `@astrojs/mdx`, `@astrojs/sitemap`, `mermaid`
3. Configurar `astro.config.mjs` com integrações
4. Criar `src/styles/global.css` com design tokens
5. Criar layouts na ordem: BaseLayout -> ChapterLayout -> ExerciseLayout
6. Criar componentes UI: Sidebar, TOC, ThemeToggle, Breadcrumb, Footer
7. Criar `src/content/config.ts` com schema
8. Escrever e deployar capítulos 0-4 como MVP
9. Criar componentes de diagrama: LayerDiagram (SVG), ArrowLegend, BeforeAfter
10. Escrever capítulos 5-11
11. Criar React islands: SolutionReveal, TimerChallenge
12. Escrever capítulo 12 (exercícios guiados com diagramas incrementais)
13. Criar React islands restantes: LayerFillExercise, DiagramCritique
14. Escrever capítulo 13 (exercícios livres)
15. Escrever capítulos 14-15
16. Landing page com hero animado
17. SEO, sitemap, structured data
18. Lighthouse audit e otimização
19. README com instruções de contribuição

---

## Anexo: Exemplo de Diagrama SVG (Referência Visual)

O componente `LayerDiagram` deve gerar SVGs seguindo esta estrutura:

```
┌─────────────────────────────────────────────────────────┐
│  CAMADA 1: ENTRADA (fundo azul claro)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │App Mobile│  │Web Portal│  │Webhook   │              │
│  │          │  │          │  │BACEN     │              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│───────┼──────────────┼─────────────┼────────────────────│
│  CAMADA 2: SERVIÇOS DE DOMÍNIO (fundo teal claro)       │
│       │              │             │                    │
│       ▼              ▼             ▼                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │Payment   │  │Account   │  │Notific.  │              │
│  │Service   │──│Service   │  │Service   │              │
│  │Processa  │  │Gerencia  │  │Push +    │              │
│  │transações│  │saldos    │  │in-app    │              │
│  └────┬─────┘  └────┬─────┘  └──────────┘              │
│───────┼──────────────┼──────────────────────────────────│
│  CAMADA 3: DADOS (fundo roxo claro)                     │
│       │              │                                  │
│       ▼              ▼                                  │
│  ╔══════════╗  ╔══════════╗  ┌~~~~~~~~~~┐  ☁──────☁   │
│  ║PostgreSQL║  ║  Redis   ║  │  Kafka   │  │  S3  │   │
│  ║Transações║  ║  Cache   ║  │  Eventos │  │ Docs │   │
│  ╚══════════╝  ╚══════════╝  └~~~~~~~~~~┘  ☁──────☁   │
│─────────────────────────────────────────────────────────│
│  CAMADA 4: TRANSVERSAL (fundo cinza, borda tracejada)   │
│  ┊ Observabilidade │ Auth/mTLS │ Rate Limit │ CB  ┊    │
│─────────────────────────────────────────────────────────│
│                                                         │
│  LEGENDA:  ──── Síncrono (REST/gRPC)                    │
│            ╌╌╌╌ Assíncrono (Kafka/Filas)                │
└─────────────────────────────────────────────────────────┘
```

Cada camada deve ter:
- Fundo com cor suave da paleta (light variant)
- Label da camada no canto superior esquerdo em bold
- Boxes com border-radius leve, stroke da cor da camada (variante escura)
- Setas SVG com marker-end (arrowhead) e estilo correto (solid vs dashed)
- Labels de seta posicionados no ponto médio da seta
- Legenda no canto inferior direito com amostras de seta

---