# Application Data Boundary Execution Plan

Atualizado em `2026-04-13`.

## Objetivo

Definir o corte técnico de dados para aplicações planejadas após a migração
estrutural para `GitLab`, alinhado ao modelo aprovado pelo usuário:

- boundary de dados próprio por aplicação
- uso do `Supabase` como base operacional canônica, com abertura para
  isolamento dedicado quando o contexto exigir
- frontends desacoplados sem acesso direto a dado de negócio
- APIs donas da persistência, do contrato e das regras de mutação

## Escopo Deste Corte

- definir a topologia mínima de boundary de dados por aplicação
- fixar regras de modelagem, segurança, migrations e rollback
- alinhar o contrato entre `controllers`, `services` e `repositories`
- posicionar backlog executável para a primeira fase pós-migração

## Fora De Escopo

- criar migrations reais nesta sessão
- provisionar projetos reais no `Supabase` nesta sessão
- escolher o ORM final de cada aplicação nesta sessão
- migrar dados legados nesta sessão

## Decisão Canônica

### Direção aprovada

- cada aplicação planejada terá `1` boundary próprio de dados
- o boundary próprio usa o `Supabase` como base operacional por default,
  partindo da conta única e da base canônica atual; quando a necessidade de
  isolamento, compliance, escala ou operação justificar, esse boundary pode
  evoluir para projeto ou banco dedicado
- dentro desse boundary, o dado de negócio fica organizado em schemas
  explícitos e versionados
- a API da aplicação é a única dona da mutação e leitura de domínio
- frontend não recebe credencial de banco para dado de negócio

### Direção rejeitada

- banco monolítico compartilhado por múltiplas aplicações planejadas
- backend único para tudo
- `controller` com regra de negócio
- acoplamento irreversível entre domínio e ORM
- compartilhamento ad-hoc de tabelas entre aplicações

## Recomendação Direta

- tratar o `Supabase` como boundary operacional da aplicação, não como atalho
  de acesso direto pelo frontend
- preferir migrations `SQL-first`, versionadas e revisáveis
- manter o domínio acima do ORM por meio de `repository interfaces`
- qualificar schemas explicitamente em SQL, policies e automações
- preservar contratos de entrada e saída com `DTOs`

## Topologia Recomendada Por Aplicação

### Estrutura mínima

```text
<application>-data/
├── schema_core
├── schema_access
├── schema_content
└── schema_audit
```

### Regras

1. O prefixo do schema deve refletir a aplicação e o domínio funcional.
2. `public` não é destino padrão de novas tabelas de negócio.
3. Schemas gerenciados pelo `Supabase`, como `auth` e `storage`, só entram
   quando houver necessidade explícita e sem misturar negócio arbitrário.

### Exemplos

- `portfolio_core`
- `portfolio_access`
- `portfolio_content`
- `portfolio_audit`
- `knowledge_hub_core`
- `knowledge_hub_access`
- `knowledge_hub_content`
- `knowledge_hub_audit`

## Contrato Arquitetural Entre API E Persistência

1. `Controllers`
   - recebem e devolvem contratos
   - não executam negócio
2. `DTOs`
   - mapeiam request/response
   - isolam contrato externo de modelo interno
3. `Service interfaces`
   - definem casos de uso
4. `Service implementations`
   - concentram regra negocial
   - coordenam transação, consistência e colaboração entre repositórios
5. `Repository interfaces`
   - abstraem o provider de persistência
6. `Repository implementations`
   - encapsulam ORM, SQL ou client específico

## Regras De Modelagem

1. Toda entidade de negócio entra em schema explícito da própria aplicação.
2. Toda tabela nova precisa de owner funcional claro.
3. Chaves e referências devem privilegiar `UUID`.
4. Cruzamento entre schemas deve ser intencional, raro e documentado.
5. Compartilhamento entre aplicações deve acontecer por contrato, não por join
   informal entre bancos.
6. Modelo de domínio não pode depender diretamente de decorators ou tipos do
   ORM.

## Regras De Segurança

1. frontend público ou painel web não recebe credencial privilegiada de banco
2. `service_role` ou equivalente fica restrita à API da aplicação
3. `RLS` deve ser ativada quando houver acesso sob contexto de usuário
4. tabelas internas sem `RLS` exigem justificativa técnica explícita
5. secrets e chaves ficam fora do cliente
6. logs e auditoria precisam identificar origem, ator e mutação

## Convenção De Migrations

### Recomendação

- migrations `SQL-first`
- versionamento por release
- rollback explícito para mudanças críticas
- diretório organizado por schema e ambiente

### Estrutura sugerida

```text
<application>-api/
└── database/
    ├── migrations/
    │   ├── schema_core/
    │   ├── schema_access/
    │   ├── schema_content/
    │   └── schema_audit/
    ├── seeds/
    └── policies/
```

### Regra de naming

- `YYYYMMDDHHMM__schema__short_description.sql`

## Estratégia De Cutover

### Padrão preferencial

- `expand -> migrate -> contract`

### Tradução prática

1. criar estrutura nova
2. habilitar escrita controlada pela API nova
3. medir consistência e comportamento
4. cortar leitura legada
5. cortar escrita legada
6. remover compatibilidade temporária

## Critérios De Aceite

- boundary de dados da aplicação aprovado
- schemas da aplicação definidos
- regra “frontend sem acesso direto ao dado de negócio” fixada como contrato
- migrations, rollback e roles técnicas documentadas
- `repository interface` desacoplada do ORM
- `Risks And Gaps` explícitos antes de scaffold real

## Backlog Executável Pós-Migração

### `P0`

- definir o boundary de dados da primeira aplicação planejada
- escolher o stack da API com justificativa arquitetural
- definir `repository interfaces`
- definir `DTOs` iniciais dos primeiros casos de uso
- criar o scaffold de `database/`
- definir roles técnicas mínimas

### `P1`

- mapear entidades legadas que precisam migrar
- mapear buckets, documentos e assets persistidos
- desenhar a primeira trilha de `expand -> migrate -> contract`
- definir a política inicial de `RLS`

### `P2`

- definir retenção e expurgo de auditoria
- definir critérios para stateful components quando existirem
- revisar necessidade de schemas extras antes de ampliar o boundary

## Risks And Gaps

### Riscos

- o legado ainda não foi completamente inventariado
- aplicações podem tentar compartilhar banco cedo demais por conveniência
- escolha de ORM sem interface adequada pode recriar lock-in rapidamente
- migração de auth e sessão continua sendo área sensível

### Gaps

- skill operacional de `lint` técnico ainda precisa estar validada para a fase
  de implementação planejada
- catálogo real de entidades legadas ainda não está fechado
- política final de `RLS` por tabela ainda não foi aprovada
- estratégia final de auth por aplicação ainda depende do contrato do projeto

## Recomendação Final

O próximo corte técnico correto, depois da migração estrutural para `GitLab`,
é:

- escolher a primeira aplicação planejada
- definir o boundary de dados próprio dela no `Supabase`
- fixar `DTOs`, `service interfaces` e `repository interfaces`
- criar o scaffold de migrations e policies
- só então autorizar implementação real

Isso mantém a separação por aplicação desde a origem, reduz acoplamento e
evita reconstruir um monólito distribuído com nomes diferentes.
