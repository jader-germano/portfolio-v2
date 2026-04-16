# Application Structure Migration Plan

Atualizado em `2026-04-13`.

Documento complementar obrigatório para a trilha de dados e persistência:

- [`APPLICATION_DATA_BOUNDARY_EXECUTION_PLAN.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/APPLICATION_DATA_BOUNDARY_EXECUTION_PLAN.md)

## Status

- documento canônico de planejamento e governança
- trilha de portfólio segue em `no-code-change` até fechar a migração
  estrutural para `GitLab`
- repositórios-alvo da Onda 0 já foram provisionados no `GitLab`, receberam o
  `remote` local e estão com branches canônicos protegidos
- o upstream local das branches canônicas da Onda 0 já aponta para `gitlab/*`
- o isolamento mínimo de worktree da Onda 0 já foi executado sem abrir MR:
  `portfolio-backend` ficou preservado em branch local,
  `jpglabs-portfolio` voltou a ficar limpo em `main` e `portfolio-mobile`
  ficou preservado em branch auxiliar publicada
- o naming legado foi removido das decisões ativas desta trilha
- a arquitetura alvo deixa de assumir backend único e passa a operar por
  contexto de aplicação

## Premissas Explícitas

1. A prioridade imediata continua sendo a migração estrutural dos projetos de
   portfólio para `GitLab`.
2. Até o fechamento dessa migração, não entra alteração de código de produto.
3. Depois da migração estrutural, a próxima entrega obrigatória é o contrato
   fixo para criação de novos projetos planejados.
4. Scripts não planejados e MVPs curtos seguem em lane separada no `GitHub`.
5. A futura trilha com código do `TSE` deve nascer com padrão alto de
   auditabilidade, segurança, rastreabilidade e revisão.

## Decisões Canônicas

1. O naming legado deixa de ser referência arquitetural, documental ou de
   naming para esta trilha.
2. A arquitetura alvo não terá um backend único para tudo.
3. Cada aplicação planejada deve manter contexto próprio de frontend, API e
   dados.
4. Cada aplicação planejada nasce, por default, com `1` boundary próprio de
   dados no `Supabase`, usando como base a conta única e a base canônica atual,
   com isolamento lógico explícito por schemas de negócio; quando o contexto
   da implementação exigir, esse boundary pode evoluir para projeto ou banco
   dedicado via `ADR`.
5. Frontends seguem desacoplados e podem ser implementados em `React` ou
   `Angular`, conforme o contrato do projeto.
6. APIs podem ser implementadas em `Node + Express`, `Node + NestJS`,
   `Java + Spring` ou `Java + Quarkus`, conforme perfil da aplicação.
7. APIs devem ser `stateless` por default; componentes `stateful` só entram
   quando houver justificativa explícita de sessão, workflow, fila, streaming
   ou orquestração.
8. O mínimo aceitável de organização de backend é `MVC`, com layering claro.
9. `Controllers` são estritamente superfície de contrato; regra operacional:
   proibição extrema de lógica de negócio nessa camada.
10. `DTOs` são obrigatórios para entrada, saída e mapeamento entre contrato e
    domínio.
11. `Services` sempre possuem interface e concentram controle negocial,
    orquestração de caso de uso e conversa com `repositories`.
12. `Repositories` são interfaces da camada de persistência e devem isolar a
    aplicação do ORM para facilitar migração futura de tecnologia.
13. `ORM` é detalhe de implementação; a modelagem de domínio não pode ficar
    refém do provider.
14. Contratos HTTP e eventos devem ser versionados e auditáveis; `OpenAPI`
    passa a ser a baseline mínima para APIs HTTP planejadas.
15. Frontend não acessa dado de negócio diretamente no `Supabase/Postgres` no
    estado final; toda mutação e leitura de domínio passa pela API da própria
    aplicação.
16. `TDD`, `BDD`, `DDD`, `SOLID`, `Clean Code` e `Clean Architecture` são
    requisitos mandatórios para a lane planejada.
17. Toda alteração planejada de código deve passar por revisão técnica
    especializada entre pedido e entregue, com gate de `lint` técnico,
    testes e contrato.
18. Se a skill especializada de revisão/lint ainda não estiver instalada no
    runtime, a fase de implementação planejada fica bloqueada até o gate ser
    operacionalizado.
19. Nomenclatura de repositório, serviço e pacote deve refletir domínio e
    função, não branding transitório.
20. A definição de template fixo de contrato e arquitetura mínima obrigatória
    fica explicitamente posicionada como primeira entrega pós-migração.

## Artefatos Canônicos Já Preparados

- template fixo de contrato:
  [`PLANNED_PROJECT_CONTRACT_TEMPLATE.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PLANNED_PROJECT_CONTRACT_TEMPLATE.md)
- checklist arquitetural mínimo:
  [`PLANNED_PROJECT_ARCHITECTURE_CHECKLIST.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PLANNED_PROJECT_ARCHITECTURE_CHECKLIST.md)
- inventário operacional da Onda 0:
  [`PORTFOLIO_GITLAB_MIGRATION_INVENTORY.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PORTFOLIO_GITLAB_MIGRATION_INVENTORY.md)

## Escopo Imediato

### Onda 0 — migração estrutural para `GitLab`

- migrar repositórios, remotes, namespace e ownership
- concluir provisionamento dos repositórios-alvo no `GitLab`
- alinhar branches canônicos default/protected por repositório
- concluir o cutover metadata-only de upstream para `gitlab/*`
- fechar a estrutura-alvo dos projetos planejados
- consolidar documentação canônica e naming neutro
- consolidar inventário local repo a repo antes do primeiro ciclo de sync
- isolar diffs úteis em branches auxiliares quando a worktree canônica não
  puder seguir limpa
- bloquear `pull --ff-only` e sincronização contínua enquanto existir branch
  auxiliar estacionada sem decisão de merge
- manter branches canônicas de portfólio em modo `no-code-change`

### Onda 1 — contrato de criação de projetos planejados

- definir template fixo de contrato para novos projetos
- definir arquitetura mínima obrigatória antes de qualquer implementação
- revisar, aprovar e operacionalizar o template fixo de contrato já preparado
- revisar, aprovar e operacionalizar o checklist arquitetural já preparado
- definir critérios de escolha entre `React` e `Angular`
- definir critérios de escolha entre `Express`, `NestJS`, `Spring` e
  `Quarkus`
- definir o gate técnico obrigatório de revisão/lint/testes

### Onda 2 — implementação planejada

- só começa depois de aprovados:
  - contrato do projeto
  - arquitetura mínima
  - boundary de dados
  - stack da API
  - estratégia de testes
  - gate técnico de revisão

## Estado Atual Resumido

### Legado de portfólio

- `portfolio-backend` ainda concentra responsabilidades demais
- há forte evidência de acoplamento entre frontend, API e persistência
- esse formato não atende o modelo alvo por contexto de aplicação

### Frontends já mapeados

- `jpglabs-portfolio` segue como candidato forte para frontend público
- `portfolio-v2` continua servindo como referência visual/funcional, não como
  runtime final
- `jpglabs-dashboard` permanece como superfície a reavaliar depois da migração
  estrutural

### Dados e persistência

- o estado legado ainda vaza responsabilidade de persistência para superfícies
  que não deveriam ser donas do dado
- a direção nova elimina a hipótese de banco compartilhado com backend único e
  substitui isso por ownership por aplicação

## Arquitetura Alvo

```text
planned-application/
├── frontend-web           React or Angular
├── api                    Express | NestJS | Spring | Quarkus
└── data-boundary          Supabase base canônica + app-owned schemas
```

### Exemplo de aplicação planejada

```text
portfolio/
├── frontend-web           React
├── api                    NestJS ou Spring
└── data-boundary          Supabase base canônica com schemas de domínio
```

```text
knowledge-hub/
├── frontend-web           React ou Angular
├── api                    Express | NestJS | Spring | Quarkus
└── data-boundary          Supabase base canônica com schemas de domínio
```

## Matriz De Escolha Tecnológica

### Frontend

- `React`
  - preferir quando a aplicação exigir composição flexível, ecossistema amplo e
    menor atrito para times TypeScript
- `Angular`
  - preferir quando a aplicação exigir convenção forte, estrutura rígida de
    módulos e operação enterprise mais padronizada

### API

- `Node + Express`
  - usar para APIs pequenas, superfícies simples e casos claramente
    `stateless`
- `Node + NestJS`
  - usar quando a aplicação em TypeScript exigir modularidade mais forte,
    contratos maiores e estrutura mais disciplinada
- `Java + Spring`
  - usar quando o domínio pedir ecossistema enterprise, integrações pesadas,
    compliance maior ou bibliotecas maduras específicas do stack Java
- `Java + Quarkus`
  - usar quando a aplicação precisar de footprint menor, startup mais rápido e
    boa eficiência em ambiente containerizado sem abrir mão de Java

## Contrato Arquitetural Mínimo Do Backend

1. `Controller`
   - recebe request
   - valida contrato
   - chama serviço
   - devolve response
   - não contém regra de negócio
2. `DTO`
   - explicita entrada e saída
   - desacopla contrato externo de modelo interno
3. `Service interface`
   - define contrato de caso de uso
4. `Service implementation`
   - executa regra de negócio
   - orquestra domínio
   - conversa com `repositories`
5. `Repository interface`
   - abstrai persistência
   - protege o domínio de lock-in do ORM
6. `Repository implementation`
   - encapsula ORM, SQL ou client de banco escolhido

## Contrato De Dados

1. Cada aplicação planned possui boundary próprio de dados.
2. Cada boundary usa naming em English para schemas, tabelas e contratos
   técnicos.
3. `Supabase` pode prover banco, auth, storage e automação, mas o dado de
   negócio continua sendo responsabilidade da API da aplicação.
4. `service_role` ou credencial equivalente não vai para frontend.
5. `RLS`, roles técnicas, migrations e rollback pertencem ao boundary da
   própria aplicação.
6. Integração entre aplicações ocorre por contrato, evento ou API; não por
   compartilhamento ad-hoc de tabela.

## Quality Gates

1. Nenhuma implementação planejada começa sem contrato do projeto aprovado.
2. Nenhuma implementação planejada começa sem definição explícita de stack,
   boundary de dados e estratégia de testes.
3. `git status --short`, `git pull --ff-only` quando aplicável e suíte unitária
   básica são preflight obrigatórios antes de editar código em repo Git.
4. `100%` de cobertura continua sendo a barra padrão do workspace por slice
   alterado.
5. `TDD` e `BDD` deixam de ser opcionais na lane planejada.
6. Toda entrega planejada precisa de revisão técnica especializada:
   - `lint` técnico
   - testes
   - revisão de contrato
   - revisão de arquitetura quando tocar boundary ou integração
7. Integração final sem mock continua sendo regra para a lane planejada.

## Roadmap Recomendado

### Sprint 0 — estrutura e governança

- concluir migração estrutural para `GitLab`
- normalizar naming e ownership
- consolidar os documentos canônicos desta trilha
- usar o inventário operacional da Onda 0 como ordem oficial de execução local
- consolidar remotes `gitlab`, branches canônicos protegidos e upstream local
  apontando para `GitLab`, sem abrir sync antes da limpeza das worktrees
- manter pronto o template fixo de contrato pós-migração

### Sprint 1 — template e arquitetura obrigatória

- definir template de criação de projeto planejado
- definir checklist arquitetural obrigatório
- aprovar os artefatos já preparados e adaptar ao primeiro projeto real
- definir matriz de escolha tecnológica
- definir gate operacional da skill de revisão/lint técnico

### Sprint 2 — boundaries e scaffolds autorizados

- escolher a stack por aplicação
- definir boundary de dados no `Supabase`
- definir contratos iniciais e modelo de DTO
- só então abrir scaffolds reais

## Team Plan Para `/teams`

### Objetivo

Planejar a migração estrutural e a governança pós-migração para projetos
planejados, sem alterar código de produto antes do fechamento da estrutura em
`GitLab`.

### Teammates E Responsabilidades

- `lead`
  - aprova contrato, arquitetura e gates
- `researcher`
  - inventaria legado, naming, remotes e blast radius
- `architecture-owner`
  - define matriz de stack, layering e boundaries
- `reviewer`
  - define e aplica gates de revisão técnica, `lint`, testes e rollback
- `doc-owner`
  - mantém plano, handoff e diário coerentes

### Quality Constraints

1. nenhum teammate escreve código de produto antes do fechamento da migração
   estrutural
2. nenhuma aplicação planejada nasce sem boundary de dados próprio
3. nenhum `controller` carrega regra de negócio
4. nenhum `repository` acopla domínio de forma irreversível ao ORM
5. nenhuma entrega planejada passa sem revisão técnica especializada

## Fora De Escopo Desta Rodada

- criar scaffolds reais de API ou frontend
- escolher a stack final de cada aplicação específica
- criar migrations reais
- executar deploys
- implementar features de produto

## Próximo Passo Recomendado

Concluir a migração estrutural para `GitLab` e, imediatamente depois, abrir a
fatia de aprovação e uso do contrato fixo para novos projetos planejados, com
template, checklist arquitetural e gate técnico de revisão antes da primeira
linha de código.
