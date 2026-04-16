# Planned Project Architecture Checklist

Atualizado em `2026-04-13`.

Checklist mínimo para aprovar a arquitetura de qualquer projeto planejado antes
de iniciar implementação.

## 1. Escopo E Lane

- [ ] é um projeto planejado de `GitLab`, não um experimento curto de `GitHub`
- [ ] o problema, o ator principal e o critério de sucesso estão explícitos
- [ ] o que ficou fora do escopo está registrado

## 2. Topologia

- [ ] frontend definido como `React` ou `Angular`
- [ ] API definida como `Express`, `NestJS`, `Spring` ou `Quarkus`
- [ ] qualquer exceção fora dessa matriz foi registrada em `ADR`
- [ ] o projeto não depende de backend único compartilhado por default
- [ ] a aplicação mantém contexto próprio de frontend, API e dados

## 3. Backend

- [ ] `MVC` mínimo definido
- [ ] `controllers` limitados à superfície de contrato
- [ ] `DTOs` definidos para entrada e saída
- [ ] `service interfaces` definidas para os casos de uso principais
- [ ] `repositories` definidos como interface de persistência
- [ ] o domínio não está acoplado de forma irreversível ao ORM

## 4. Dados

- [ ] o boundary de dados foi explicitamente definido
- [ ] a decisão registra se o projeto começa na base canônica atual ou em
      isolamento dedicado
- [ ] ficou claro que a conta do `Supabase` é única no estado atual
- [ ] ficou claro que a base canônica atual é o default vigente
- [ ] ficou claro que projeto ou banco dedicado dependem do contexto da
      implementação
- [ ] os gatilhos de promoção para isolamento dedicado foram registrados
- [ ] schemas de negócio propostos foram nomeados
- [ ] migrations, rollback, `RLS` e secrets têm direção definida
- [ ] frontend não acessa dado de negócio diretamente

## 5. Contratos

- [ ] estratégia de `OpenAPI` ou contrato versionado foi definida
- [ ] estratégia de versionamento foi definida
- [ ] regra de breaking change foi definida
- [ ] frontend consome contrato explícito, não chamadas ad-hoc

## 6. Qualidade

- [ ] `TDD` previsto desde o primeiro slice
- [ ] `BDD` previsto para fluxos relevantes
- [ ] `DDD` previsto quando o domínio justificar
- [ ] `SOLID`, `Clean Code` e `Clean Architecture` foram aceitos como barra
      mínima
- [ ] cobertura alvo do slice foi registrada
- [ ] integração final sem mock foi aceita como gate

## 7. Revisão Técnica

- [ ] preflight Git foi incluído como regra antes de editar código
- [ ] gate de `lint` técnico foi incluído
- [ ] gate de testes foi incluído
- [ ] gate de revisão de contrato foi incluído
- [ ] gate de revisão arquitetural foi incluído para mudanças de boundary

## 8. Segurança E Compliance

- [ ] risco de LGPD e dados pessoais foi classificado
- [ ] necessidade de auditoria foi classificada
- [ ] dependências externas críticas foram mapeadas
- [ ] contexto regulatório ou institucional foi registrado quando aplicável

## 9. Aprovação

- [ ] o contrato do projeto foi preenchido
- [ ] exceções viraram `ADR`
- [ ] a aprovação humana explícita foi registrada
- [ ] a implementação ainda não começou antes deste checklist estar verde

## Referências

- [`PLANNED_PROJECT_CONTRACT_TEMPLATE.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/PLANNED_PROJECT_CONTRACT_TEMPLATE.md)
- [`APPLICATION_STRUCTURE_MIGRATION_PLAN.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/APPLICATION_STRUCTURE_MIGRATION_PLAN.md)
- [`APPLICATION_DATA_BOUNDARY_EXECUTION_PLAN.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/APPLICATION_DATA_BOUNDARY_EXECUTION_PLAN.md)
