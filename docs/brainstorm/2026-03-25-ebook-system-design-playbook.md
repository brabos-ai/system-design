# Brainstorm: System Design Playbook — Ebook Interativo

**Data:** 2026-03-25
**Participantes:** Fundador + Claude

---

## Contexto

O projeto já possui um PRD (`docs/system-design-playbook.md`) bem detalhado, mas com escopo focado exclusivamente em comunicação visual para nicho de fintechs brasileiras com stack JVM/C#. A conversa redefiniu o posicionamento: o ebook deve ser **generalista** (sem foco em linguagem ou segmento), **híbrido** (raciocínio + metodologia visual), e manter a essência do framework de 4 camadas como ferramenta central — mas não como conteúdo único.

---

## O que o Usuário Quer

### Necessidade Principal
Um site Astro (SSG com ilhas React) funcionando como ebook interativo que ensine profissionais (SSE, Tech Lead, Principal Engineer) a **raciocinar, planejar e apresentar** system design em entrevistas técnicas — com base teórica como referência e foco total na metodologia prática.

### Público-alvo Redefinido
- Profissionais de software que almejam cargos de SSE, Tech Lead, Principal Engineer
- Qualquer stack/linguagem — conteúdo agnóstico de tecnologia
- Já possuem experiência e conhecimento de arquitetura
- Precisam de um sistema repetível para decompor problemas e apresentar soluções visuais em entrevistas

### Casos de Uso
- **Preparação para entrevista:** profissional estuda o ebook 1-2 semanas antes, pratica os exercícios guiados, usa o checklist no dia
- **Referência rápida:** consulta o framework mental (quick win) e o checklist minutos antes da entrevista
- **Prática simulada:** usa os exercícios cronometrados para simular pressão real de entrevista
- **Consulta de fundamentos:** revisa conceitos teóricos pontuais quando necessário

---

## Descobertas

### O que o PRD já resolve bem
- Framework de 4 camadas (Entrada, Domínio, Dados, Transversal) — modelo visual sólido
- Vocabulário visual (formas, setas, legendas) — catálogo completo
- Anti-padrões visuais — 8 erros comuns com before/after
- Narração ao vivo — templates de fala enquanto desenha
- Componentes interativos — SolutionReveal, TimerChallenge, LayerFillExercise
- Checklist final — validação rápida do diagrama
- Arquitetura técnica (Astro + MDX + Tailwind + React islands)

### O que falta no PRD
- **Bloco de raciocínio** — como decompor o enunciado, extrair requisitos, estimar escala, tomar decisões ANTES de desenhar
- **Framework mental quick win** — versão enxuta do raciocínio em 1 página para consulta rápida
- **Exercícios generalistas** — os 4 exercícios atuais são todos fintech; faltam os clássicos do mercado
- **Referência de fundamentos** — seção de consulta rápida de conceitos teóricos (sem ser aula)
- **Generalização** — remover amarração com stack JVM/C# e segmento fintech como foco exclusivo

---

## Estrutura Redefinida do Ebook

O ebook se organiza em **3 blocos principais** + exercícios:

### Bloco 1: Referência de Fundamentos (Prefácio/Guia)

**Propósito:** Não é aula. É referência de consulta. O profissional já sabe, mas pode precisar de um refresh. Funciona como um glossário expandido que no futuro pode virar capítulos isolados aprofundados.

**Tópicos sugeridos (referência rápida, não curso):**
- CAP Theorem — consistência, disponibilidade, tolerância a partição
- Escalabilidade horizontal vs vertical
- Load balancing — estratégias e quando usar cada uma
- Caching strategies — cache-aside, write-through, write-behind
- Database sharding e partitioning
- Consistência eventual vs forte
- SQL vs NoSQL — critérios de decisão
- Message queues vs event streaming
- Padrões de resiliência — circuit breaker, retry, bulkhead, timeout
- CQRS e Event Sourcing (quando aplicar)
- Idempotência
- Rate limiting

**Formato:** Cada tópico em 1-2 parágrafos + diagrama simples + "quando isso aparece em entrevista". Sem deep dive. Links para recursos externos para quem quiser aprofundar.

**Evolução futura:** Cada tópico pode virar um capítulo completo isolado, expandindo o ebook ao longo do tempo.

---

### Bloco 2: O Raciocínio — Como Pensar Antes de Desenhar

Este é o bloco que o PRD original ignora completamente. É o que acontece na cabeça do candidato entre receber o enunciado e começar a desenhar.

#### Versão Completa (capítulos dedicados)

**Capítulo: Decompondo o Enunciado**
- Como ler um enunciado de system design e extrair o que importa
- Separar requisitos funcionais de não-funcionais
- Identificar o que é explícito vs o que precisa ser perguntado
- Exercício: dado um enunciado cru, listar requisitos extraídos vs perguntas que faria ao entrevistador

**Capítulo: As Perguntas Certas**
- Perguntas de escopo: "Quem são os usuários? Quantos? Qual a distribuição geográfica?"
- Perguntas de escala: "Quantas requisições por segundo? Qual o volume de dados? Qual o crescimento esperado?"
- Perguntas de prioridade: "O que é mais crítico: latência ou consistência? Disponibilidade ou durabilidade?"
- Perguntas de restrição: "Existe SLA definido? Há requisitos regulatórios? Integrações obrigatórias?"
- Como as respostas dessas perguntas direcionam decisões de arquitetura
- Exercício: dado um cenário, formular as 10 perguntas mais importantes

**Capítulo: Estimando Escala (Back-of-the-Envelope)**
- Como fazer cálculos rápidos de QPS, storage, bandwidth
- Números que todo candidato deveria ter na cabeça (latência de disco, rede, memória)
- Como a estimativa de escala influencia escolhas (preciso de cache? preciso de sharding? preciso de CDN?)
- Exercício: estimar escala para 3 cenários diferentes

**Capítulo: Tomando Decisões de Arquitetura**
- Como decidir entre SQL vs NoSQL para cada tipo de dado
- Como decidir sync vs async para cada comunicação
- Como decidir monolito vs microsserviços (nível de entrevista, não de produção)
- Trade-offs como ferramenta de argumentação — o entrevistador quer ver que você pesa prós e contras
- Exercício: dado um cenário com 5 decisões, justificar cada escolha

**Capítulo: Organizando as Ideias Antes do Quadro**
- O minuto de silêncio intencional — pensar antes de agir
- Técnica de rascunho mental: listar componentes, agrupar por camada, definir fluxo principal
- Como montar um "esqueleto" mental antes de tocar no canvas
- A transição: do raciocínio para o desenho — quando você sabe que está pronto para começar

#### Versão Quick Win (1 página — Framework Mental)

Um modelo repetível de 5 passos que o profissional aplica em qualquer enunciado:

1. **ESCOPO** — Ler o enunciado. Listar 3-5 requisitos funcionais. Listar 2-3 não-funcionais. Fazer 3-5 perguntas de esclarecimento.
2. **ESCALA** — Estimar usuários, QPS, volume de dados. Isso define se precisa de cache, sharding, CDN.
3. **COMPONENTES** — Listar os 4-6 componentes principais e classificar em qual camada cada um vai.
4. **FLUXO** — Definir o happy path. Qual ator inicia? O que acontece passo a passo?
5. **TRADE-OFFS** — Para cada decisão (storage, comunicação, granularidade), ter 1 argumento a favor e 1 contra.

Formato: cabe em uma tela, imprimível, consultável em 2 minutos antes da entrevista.

---

### Bloco 3: A Metodologia Visual — O Framework de 4 Camadas

Este bloco é o que o PRD já cobre bem. Mantém a essência com ajustes de generalização.

**Capítulos (adaptados do PRD):**
- O Framework de 4 Camadas — modelo mental para qualquer system design
- Vocabulário Visual — formas, setas, cores, legendas
- O Fluxo de Desenho — processo passo a passo (sem limite fixo de steps)
- Comunicação Síncrona vs Assíncrona — representação visual e critérios de decisão
- Camada de Entrada em Profundidade
- Camada de Serviços em Profundidade
- Camada de Dados em Profundidade
- Camada Transversal em Profundidade
- Modelo de Dados Separado — ERD como diagrama complementar
- Anti-padrões Visuais — 8 erros comuns com before/after
- Narração ao Vivo — falar enquanto desenha

**Ajustes em relação ao PRD:**
- Remover exemplos exclusivamente de fintech — usar exemplos variados de diferentes domínios
- Remover referências a stacks específicas (JVM, C#) — manter agnóstico
- Exemplos de componentes genéricos (em vez de "Pix Gateway", usar exemplos que qualquer dev entende)
- Manter o framework de 4 camadas como ferramenta, não como dogma

---

### Bloco 4: Exercícios Práticos

#### Exercícios Guiados (passo a passo com solução incremental)

Cada exercício segue o formato:
- **Enunciado** com requisitos claros
- **Passo a passo orgânico** — quantos passos o problema precisar (sem limite fixo)
- **Cada passo contém:** o que desenhar + diagrama SVG acumulativo + narração sugerida + justificativa das decisões
- **Diagrama final completo**
- **Trade-offs para discussão**

**Mix de cenários — clássicos do mercado + domínio financeiro + mundo real:**

1. **URL Shortener** — clássico de entrevista, ótimo pra ensinar estimativa de escala e decisão de storage
2. **Chat / Messaging System** — WebSockets, presença online, entrega de mensagens, histórico
3. **Notification System** — multi-canal (push, email, SMS), throttling, preferências do usuário
4. **Rate Limiter** — algoritmos (token bucket, sliding window), distribuído vs local
5. **News Feed / Timeline** — fan-out on write vs fan-out on read, ranking, cache
6. **Processamento de Pix em Tempo Real** — adaptado do PRD, domínio financeiro
7. **Sistema de Antifraude em Tempo Real** — scoring, regras, ML, bureaus externos
8. **Emissão de Faturas PDF + Envio por Email via SFTP** — cenário real de integração com fornecedor legacy que entrega faturas por SFTP. Força o candidato a lidar com: geração de PDF, integração com sistema externo arcaico (polling SFTP), reconciliação, retry, tratamento de falhas de um canal não-confiável
9. **Autorização de Débito com SLA de 2 segundos** — cenário onde cada milissegundo conta. Força decisões sobre: timeout em cada hop, circuit breaker, fallback, cache agressivo, o que pode ser async vs o que tem que ser sync dentro do budget de 2s, particionamento do tempo entre componentes
10. **Onboarding e KYC Digital** — adaptado do PRD, fluxo com saga e integrações externas

#### Exercícios Livres (sem solução imediata)

Cenários com apenas enunciado + requisitos + checklist de validação. Solução escondida em SolutionReveal.

- Carteira Digital Multi-moeda
- Gateway de Pagamentos Multi-adquirente
- Sistema de Cashback Programável
- Plataforma de Empréstimo P2P
- Sistema de Cobrança Recorrente (Subscription Billing)
- Open Banking / Open Finance Hub

---

## Decisões Tomadas

| Questão | Decisão | Justificativa |
|---------|---------|---------------|
| Escopo do ebook | Híbrido: raciocínio + metodologia visual | Só metodologia visual não resolve se o candidato não sabe decompor o problema antes |
| Público-alvo | Generalista — SSE, Tech Lead, Principal Engineer de qualquer stack | Não limitar a JVM/C# ou fintech amplia o alcance e a utilidade |
| Fundamentos teóricos | Referência de consulta rápida, não curso | O público já sabe; precisa de refresh, não de aula. Expande no futuro |
| Raciocínio pré-desenho | Versão completa (capítulos) + versão quick win (1 página) | Atende quem quer estudar a fundo e quem precisa de consulta rápida |
| Exercícios guiados | Mix de clássicos + fintech + mundo real | Cobre o que o mercado pede + cenários reais que ninguém ensina |
| Passo a passo dos exercícios | Orgânico — sem limite fixo de steps | A complexidade do problema define a quantidade de passos, não um número arbitrário |
| Stack do site | Astro (SSG) com ilhas React | Confirmado pelo fundador; PRD original já detalha a arquitetura |
| Linguagem/stack nos exemplos | Agnóstico — sem referência a linguagens específicas | Generalista por decisão do fundador |
| Cenário de faturas SFTP | Incluído como exercício guiado | Cenário real que o fundador conhece; força integração com sistemas legacy |
| Cenário de autorização de débito 2s | Incluído como exercício guiado | Força raciocínio sobre latência, SLA, timeout budget e trade-offs de tempo |

### Premissas Validadas
- O público já domina conceitos de arquitetura — não precisa de curso, precisa de metodologia
- O framework de 4 camadas é ferramenta central mas não é o ebook inteiro
- O gap real é: saber arquitetura mas não saber decompor o problema e apresentar visualmente
- Exercícios passo a passo incremental (diagrama sendo construído) é o grande diferencial

### Trade-offs Aceitos
- **Referência de fundamentos superficial:** aceitar que não será completa agora em troca de foco no core (raciocínio + visual). Expande no futuro com capítulos isolados
- **Generalização dos exemplos:** perder a especificidade de fintech (que o PRD explorava bem) em troca de alcance maior. Compensar com exercícios de domínio financeiro no mix

---

## Estrutura Final de Capítulos

```
PREFÁCIO / REFERÊNCIA
  00. Introdução — O gap invisível + como usar o ebook
  01. Guia de Fundamentos — Referência rápida de conceitos (CAP, sharding, cache, etc.)

BLOCO 1: O RACIOCÍNIO
  02. Decompondo o Enunciado — Extrair requisitos funcionais e não-funcionais
  03. As Perguntas Certas — O que perguntar ao entrevistador para definir escopo e escala
  04. Estimando Escala — Back-of-the-envelope calculations
  05. Tomando Decisões de Arquitetura — SQL vs NoSQL, sync vs async, trade-offs
  06. Organizando as Ideias — Do raciocínio ao canvas
  [Quick Win: Framework Mental de 5 Passos — página única consultável]

BLOCO 2: A METODOLOGIA VISUAL
  07. O Framework de 4 Camadas — Modelo mental visual
  08. Vocabulário Visual — Formas, setas, cores, legendas
  09. O Fluxo de Desenho — Processo passo a passo orgânico
  10. Comunicação Síncrona vs Assíncrona — Representação e decisão
  11. Camada de Entrada em Profundidade
  12. Camada de Serviços em Profundidade
  13. Camada de Dados em Profundidade
  14. Camada Transversal em Profundidade
  15. Modelo de Dados Separado — ERD complementar
  16. Anti-padrões Visuais — 8 erros com before/after
  17. Narração ao Vivo — Falar enquanto desenha

BLOCO 3: EXERCÍCIOS PRÁTICOS
  18. Exercícios Guiados (passo a passo incremental)
      18.1 URL Shortener
      18.2 Chat / Messaging System
      18.3 Notification System
      18.4 Rate Limiter
      18.5 News Feed / Timeline
      18.6 Processamento de Pix
      18.7 Antifraude em Tempo Real
      18.8 Emissão de Faturas PDF + SFTP
      18.9 Autorização de Débito (SLA 2s)
      18.10 Onboarding e KYC Digital
  19. Exercícios Livres (simulação de entrevista)
      19.1-19.6 (6 cenários sem solução imediata)

APÊNDICES
  20. Checklist Final de Validação
  21. Framework Mental Quick Win (1 página)
  22. Template de Diagrama em Branco
  23. Glossário de Ícones e Formas
  24. Perguntas Frequentes de Entrevistadores
  25. Recursos Complementares
```

---

## Próximos Passos

- [ ] Atualizar o PRD (`docs/system-design-playbook.md`) com a nova estrutura, público e escopo
- [ ] Criar os capítulos do Bloco 1 (raciocínio) — conteúdo novo que não existe no PRD
- [ ] Adaptar os capítulos do Bloco 2 (visual) — generalizar exemplos do PRD existente
- [ ] Criar os novos exercícios guiados (URL shortener, chat, notification, rate limiter, news feed, faturas SFTP, autorização de débito)
- [ ] Criar o Framework Mental Quick Win como página standalone

---

## Para `/add.new`

> Ebook interativo em Astro que ensina profissionais de software (SSE/Tech Lead/Principal) a raciocinar, planejar e apresentar system design em entrevistas — com referência de fundamentos, metodologia visual de 4 camadas, e exercícios guiados passo a passo incremental com mix de cenários clássicos e mundo real.

---

## Arquivos Relacionados

| Arquivo | O que faz |
|---------|-----------|
| `docs/system-design-playbook.md` | PRD original — base para Bloco 2 e arquitetura técnica |
