# JPGLabs Roadmap

Atualizado em `02/04/2026`.

## Escopo

Este documento consolida o roadmap geral do ciclo atual da JPG Labs.

Foco imediato aprovado:

- redesenhar UI/UX das superfícies ativas do portfólio e da operação interna
- separar com clareza as camadas de front-end e back-end do portfólio
- subir o portfólio com as últimas atualizações sem misturar superfície pública,
  operador interno e superfícies auxiliares

Superfícies de execução:

- `Jira`: tasks, prioridade e status
- `Confluence`: roadmap narrativo, especificações e decisões
- `Notion`: diário apenas
- `ROADMAP.md` local: mirror de trabalho do workspace

## North Star Do Ciclo

Ao fim deste ciclo, a JPG Labs deve ter:

- um `portfolio-backend` assumido explicitamente como backend/BFF
- uma trilha clara para o frontend visual do portfólio, separada do backend
- superfícies ativas do portfólio e da operação com UI/UX coerente entre web,
  mobile e shell interno, sem drift de navegação e hierarquia
- backlog e roadmap operando em `Jira + Confluence`, sem regressão para board
  de task no `Notion`

## Barra Técnica Transversal

Todas as trilhas deste ciclo devem perseguir a mesma barra técnica:

- `100%` de cobertura de testes como meta padrão
- evolução por desacoplamento, layering, SOLID, clean architecture e TDD
- nenhuma entrega considerada pronta apenas com validação manual
- gaps de cobertura precisam ficar explícitos no handoff e no próximo corte

## Trilhas Paralelas

### Trilha A — Governança De Execução (`P0`, paralela)

Objetivo:

- parar de tratar `Notion` como task board
- consolidar `Jira + Confluence` como superfícies de execução

Entregáveis:

- contrato de LLMs atualizado
- mirrors locais de roadmap alinhados aos sistemas reais
- política explícita para reduzir duplicação de discovery entre agentes

Critério de saída:

- qualquer nova task ou roadmap passa a nascer em `Jira + Confluence`
- `Notion` fica restrito ao diário

### Trilha B — Split Arquitetural Do Portfólio (`P0`, paralela)

Objetivo:

- separar o portfólio público da camada backend/BFF antes de novo deploy

Entregáveis:

- backend/BFF com contratos explícitos e sem ambiguidade de frontend primário
- decisão formal sobre a nova lane do frontend visual
- fronteiras claras de auth, sessão, upload, APIs e persistência
- inventário operacional de migração para `GitLab` com status repo a repo,
  alvo recomendado e bloqueios locais explícitos em
  [`PORTFOLIO_GITLAB_MIGRATION_INVENTORY.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PORTFOLIO_GITLAB_MIGRATION_INVENTORY.md)
- plano de execução de banco com `schema` por aplicativo documentado em
  [`APPLICATION_DATA_BOUNDARY_EXECUTION_PLAN.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/APPLICATION_DATA_BOUNDARY_EXECUTION_PLAN.md)
- template fixo de contrato e checklist arquitetural prontos para a fase
  pós-migração:
  [`PLANNED_PROJECT_CONTRACT_TEMPLATE.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PLANNED_PROJECT_CONTRACT_TEMPLATE.md)
  e
  [`PLANNED_PROJECT_ARCHITECTURE_CHECKLIST.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PLANNED_PROJECT_ARCHITECTURE_CHECKLIST.md)

Dependência:

- nenhuma das demais trilhas depende de começar por aqui, mas o release do
  portfólio depende do fechamento desta trilha

Critério de saída:

- o backend deixa de competir com o frontend visual
- existe uma topologia clara de deploy e ownership por camada

### Trilha C — Redesign UI/UX Das Superfícies Ativas (`P0`, paralela)

Objetivo:

- alinhar as superfícies ativas do portfólio e da operação em torno de padrões
  atuais de UI/UX, sem reabrir dependências legadas fora do escopo

Sistemas-alvo:

- `jpglabs-portfolio`
- `portfolio-mobile`
- `knowledge-hub-app`
- `jpglabs-dashboard`

Entregáveis:

- linguagem visual e estrutural coerente entre as superfícies
- redução de drift entre web, desktop e mobile
- separação mais nítida entre shell de operador, superfícies autenticadas e
  portfólio público

Critério de saída:

- existe uma direção única de navegação, estados e hierarquia visual
- clientes finos deixam de carregar decisões conflitantes de produto

### Trilha D — Release Do Portfólio (`P1`, dependente da Trilha B)

Objetivo:

- subir o portfólio com as últimas atualizações depois que a separação
  front/back estiver clara

Entregáveis:

- build validado do backend/BFF
- frontend visual apontando para contratos corretos
- observabilidade, health checks e checklist de release mínimos

Critério de saída:

- deploy atualizado do portfólio em ambiente alvo
- sem ambiguidade de runtime entre superfície pública e superfície autenticada

## Sequenciamento Recomendado

1. Fechar governança `Jira + Confluence + Notion só diário`.
2. Rodar split arquitetural do portfólio.
3. Em paralelo, desenhar a linguagem nova de UI/UX para as superfícies ativas.
4. Consolidar os roadmaps por sistema.
5. Só então fechar o release do portfólio.

## Contextos E Roadmaps Por Sistema

- [`portfolio-backend/ROADMAP.md`](/Users/philipegermano/code/jpglabs/docs/projects/portfolio-backend/ROADMAP.md)
- [`portfolio-mobile/ROADMAP.md`](/Users/philipegermano/code/jpglabs/docs/projects/portfolio-mobile/ROADMAP.md)
- [`knowledge-hub-app/ROADMAP.md`](/Users/philipegermano/code/jpglabs/docs/projects/knowledge-hub-app/ROADMAP.md)
- `jpglabs-portfolio`
  - ainda não há roadmap específico no hub; usar
    [`PORTFOLIO_GITLAB_MIGRATION_INVENTORY.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PORTFOLIO_GITLAB_MIGRATION_INVENTORY.md)
    como referência canônica desta fase

## Fora Do Foco Imediato

- `jpglabs-saas` continua como trilha comercial importante, mas não é a lane
  técnica prioritária deste ciclo
- `imap-server` e `FrankMD` seguem como capacidades úteis, mas não devem
  disputar prioridade com o split do portfólio nem com a reorganização das
  superfícies ativas

## Próximas Ações

1. Formalizar em `Jira` os épicos do split front/back e do redesign das
   superfícies ativas.
2. Espelhar em `Confluence` a decisão de fronteira entre backend/BFF, frontend
   público e superfícies de operador.
3. Consolidar o isolamento operacional da Onda 0, mantendo
   `portfolio-backend` em `wip/resume-parse-contract`, `jpglabs-portfolio`
   limpo em `main` e `portfolio-mobile` em
   `chore/node-pin-and-async-storage`, sem abrir MR nesta rodada.
4. Auditar o `portfolio-backend` para separar o que permanece como backend do
   que deve sair para a lane visual.
