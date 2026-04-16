# Planned Project Contract Template

Atualizado em `2026-04-13`.

Use este template para qualquer projeto planejado que vá nascer na lane de
`GitLab`.

Objetivo:

- impedir início de implementação sem contrato explícito
- congelar decisões mínimas de arquitetura antes do primeiro scaffold
- evitar voltar a um modelo de backend único, banco difuso ou frontend acoplado

## Como usar

1. duplicar este documento para o contexto do projeto
2. preencher todos os campos obrigatórios
3. abrir `ADR` quando houver exceção relevante
4. só iniciar scaffold ou implementação depois da aprovação humana

## Identificação

- Nome do projeto:
- Tipo de projeto:
  - produto planejado
  - capability interna planejada
  - plataforma compartilhada
- Owner principal:
- Área de negócio:
- Repositório alvo no `GitLab`:
- Status do contrato:
  - draft
  - em revisão
  - aprovado
  - bloqueado

## Lane

- Lane aprovada:
  - `GitLab` planejado
  - `GitHub` curto/MVP/script
- Justificativa da lane:

Regra:

- se o trabalho for planejado, recorrente, com operação duradoura, risco
  regulatório, integração crítica ou uso futuro de dados sensíveis, a lane
  correta é `GitLab`
- se for script não planejado, automação curta, experimento rápido ou MVP
  descartável, a lane pode ser `GitHub`

## Objetivo E Escopo

- Problema que o projeto resolve:
- Usuário ou ator principal:
- Escopo inicial:
- Fora de escopo explícito:
- Critério de sucesso:
- Risco principal se nada for feito:

## Classificação De Risco

- Criticidade:
  - baixa
  - média
  - alta
  - regulada
- Há uso de dados pessoais?
  - sim
  - não
- Há obrigação potencial de LGPD, trilha de auditoria ou compliance setorial?
  - sim
  - não
- Há possibilidade de uso de código, dados ou integrações sensíveis como `TSE`?
  - sim
  - não
- Observações de segurança e compliance:

## Topologia Do Projeto

- Frontend:
  - `React`
  - `Angular`
  - outro via `ADR`
- API:
  - `Node + Express`
  - `Node + NestJS`
  - `Java + Spring`
  - `Java + Quarkus`
  - outro via `ADR`
- Há componente `stateful`?
  - não
  - sim
- Se sim, qual e por quê:
- Repositórios previstos:
  - frontend:
  - api:
  - infra/config:

Regra:

- cada aplicação planejada mantém contexto próprio de frontend, API e dados
- `controller` não carrega negócio
- `service` possui interface e controla a lógica negocial
- `repository` protege o domínio do provider de persistência

## Boundary De Dados

### Decisão obrigatória

- Modelo escolhido nesta fase:
  - base canônica atual no `Supabase` + schemas dedicados
  - projeto `Supabase` dedicado
  - banco dedicado fora do `Supabase`
- Justificativa:

### Regra default

- o default atual parte da conta única existente no `Supabase` e da base
  canônica atual
- o isolamento mínimo obrigatório é lógico e explícito, por schemas de negócio
  próprios da aplicação
- projeto ou banco dedicado não são o default imediato; entram quando o
  contexto exigir

### Gatilhos para promover isolamento dedicado

- exigência regulatória ou contratual
- blast radius inaceitável na base canônica
- volume, concorrência ou custo operacional que justifiquem separação
- necessidade de autonomia forte de deploy, backup ou retenção
- restrição de acesso por time, fornecedor ou domínio de negócio

### Contrato de dados

- Nome proposto dos schemas:
- Estratégia de migrations:
- Estratégia de rollback:
- Política de `RLS`:
- Política de secrets:
- Frontend acessa dado de negócio diretamente?
  - não
  - exceção via `ADR`

## Contrato Da API

- Padrão de contrato:
  - `OpenAPI`
  - evento versionado
  - ambos
- DTOs obrigatórios?
  - sim
- Validação de entrada e saída:
- Estratégia de versionamento:
- Estratégia de breaking change:

## Contrato Do Frontend

- O frontend consome:
  - SDK gerado
  - client typed manual
  - outro via `ADR`
- Pode falar direto com o banco para dado de negócio?
  - não
- Estratégia de auth:
- Estratégia de estado:
- Requisitos mínimos de acessibilidade:

## Padrões Mandatórios

- `MVC` mínimo com layering claro
- `DTO` para entrada e saída
- `TDD`
- `BDD`
- `DDD` quando houver domínio relevante
- `SOLID`
- `Clean Code`
- `Clean Architecture`
- logs e auditoria proporcionais ao risco

## Quality Gates

- Preflight Git obrigatório antes de editar:
  - `git status --short`
  - `git pull --ff-only` quando aplicável
  - suíte unitária do repo
- Cobertura alvo por slice:
  - `100%`
- Revisão técnica especializada obrigatória:
  - `lint` técnico
  - testes
  - contrato
  - arquitetura quando tocar boundary ou integração
- Integração final sem mock:
  - obrigatória

## Checklist De Aprovação

- [ ] lane correta definida
- [ ] stack de frontend definida
- [ ] stack de API definida
- [ ] boundary de dados definido
- [ ] distinção entre base canônica atual e isolamento dedicado registrada
- [ ] gatilhos de promoção para boundary dedicado registrados
- [ ] quality gates registrados
- [ ] riscos e compliance registrados
- [ ] `ADR` aberta quando houver exceção
- [ ] aprovação humana explícita registrada

## Aprovação

- Aprovado por:
- Data:
- Comentários finais:

## Referências

- [`APPLICATION_STRUCTURE_MIGRATION_PLAN.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/APPLICATION_STRUCTURE_MIGRATION_PLAN.md)
- [`APPLICATION_DATA_BOUNDARY_EXECUTION_PLAN.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/APPLICATION_DATA_BOUNDARY_EXECUTION_PLAN.md)
- [`PLANNED_PROJECT_ARCHITECTURE_CHECKLIST.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PLANNED_PROJECT_ARCHITECTURE_CHECKLIST.md)
