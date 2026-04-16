# Portfolio GitLab Migration Inventory

Atualizado em `2026-04-13`.

Documento operacional da Onda 0 para transformar a migração estrutural do
portfólio para `GitLab` em execução local controlada.

## Objetivo

- inventariar o estado local real dos repositórios do portfólio
- registrar alvo recomendado de `GitLab` por repositório
- explicitar bloqueios antes do primeiro ciclo de sincronização contínua no
  `GitLab`
- definir ordem de execução com menor risco arquitetural e operacional

## Premissas Explícitas

1. o repositório documental canônico desta trilha é
   `/Users/philipegermano/code/jpglabs/docs`
2. nenhuma worktree suja deve sofrer `pull` cego, rebase automático ou
   sincronização contínua de migração depois do cutover para `GitLab`
3. o namespace alvo recomendado é `gitlab.com/jader-germano/*`, porque:
   - o repositório `docs` já opera com `origin + gitlab`
   - `jpglabs-saas` já foi aberto nesse namespace
4. se o namespace definitivo divergir de `jader-germano`, a migração deve ser
   replanejada antes de alterar os repositórios locais
5. `portfolio-v2` não deve voltar a ser tratado como runtime final do
   portfólio

## Decisão Executiva

- migrar na Onda 0:
  - `portfolio-backend`
  - `jpglabs-portfolio`
  - `portfolio-mobile`
- manter fora do corte principal:
  - `portfolio-v2` como referência visual/funcional
  - `jpglabs-dashboard` como superfície local-first de coordenação, fora do
    caminho crítico do release do portfólio

## Inventário Local

| Repo | Papel atual | Path local | Branch atual | Remotes atuais | Estado local | GitLab target | Status GitLab | Decisão |
|---|---|---|---|---|---|---|---|
| `portfolio-backend` | backend/BFF canônico do portfólio | `/Users/philipegermano/code/jpglabs/portfolio-backend` | `wip/resume-parse-contract` | `origin = git@github.com:jader-germano/jpglabs-portfolio-backend.git`<br>`gitlab = git@gitlab.com:jader-germano/portfolio-backend.git` | `isolada + publicada em origin` | `git@gitlab.com:jader-germano/portfolio-backend.git` | provisionado + `main` default/protected + `develop` protected + upstream canônico local em `gitlab/*` | preservar WIP publicada, sem MR |
| `jpglabs-portfolio` | candidato forte para frontend público | `/Users/philipegermano/code/jpglabs/jpglabs-portfolio` | `main` | `origin = git@github.com:jader-germano/jpglabs-portfolio.git`<br>`gitlab = git@gitlab.com:jader-germano/jpglabs-portfolio.git` | `limpa` | `git@gitlab.com:jader-germano/jpglabs-portfolio.git` | provisionado + `main` default/protected + upstream local em `gitlab/main` | manter limpo em `main` |
| `portfolio-mobile` | cliente mobile do portfólio | `/Users/philipegermano/code/jpglabs/portfolio-mobile` | `chore/node-pin-and-async-storage` | `origin = git@github.com:jader-germano/jpglabs-portifolio-mobile.git`<br>`gitlab = git@gitlab.com:jader-germano/portfolio-mobile.git` | `isolada + publicada em origin/gitlab` | `git@gitlab.com:jader-germano/portfolio-mobile.git` | provisionado + `main` default/protected + branch `chore/node-pin-and-async-storage` publicada sem MR | preservar branch publicada, sem MR |
| `portfolio-v2` | referência visual/funcional, não runtime final | `/Users/philipegermano/code/jpglabs/portfolio-v2` | `feature/gitlab-cicd-pipeline` | `origin = git@github.com:jader-germano/portfolio-v2.git` | `dirty` | `n/a nesta onda` | não provisionar nesta onda | congelar como referência |
| `jpglabs-dashboard` | cockpit local-first de coordenação | `/Users/philipegermano/code/jpglabs/jpglabs-dashboard` | `main` | `sem remote configurado` | `dirty` | `n/a nesta onda` | fora da Onda 0 | reavaliar depois |

## Bloqueios Reais Observados

### Provisionamento e proteção já concluídos

- os repositórios `portfolio-backend`, `jpglabs-portfolio` e
  `portfolio-mobile` já foram criados no namespace `jader-germano` no GitLab
- o `remote` secundário `gitlab` já foi adicionado localmente nesses três
  repositórios
- os branches canônicos já foram publicados no GitLab:
  - `portfolio-backend`: `main` e `develop`
  - `jpglabs-portfolio`: `main`
  - `portfolio-mobile`: `main`
- as branches canônicas no GitLab já estão protegidas e alinhadas com o
  default esperado:
  - `portfolio-backend`: `main` = default/protected; `develop` = protected
  - `jpglabs-portfolio`: `main` = default/protected
  - `portfolio-mobile`: `main` = default/protected
- as branches canônicas locais já apontam para `gitlab/*` como upstream:
  - `portfolio-backend`: `main -> gitlab/main`; `develop -> gitlab/develop`
  - `jpglabs-portfolio`: `main -> gitlab/main`
  - `portfolio-mobile`: `main -> gitlab/main`
- o `remote.pushDefault` local já foi alinhado para `gitlab` nos três
  repositórios da Onda 0
- o isolamento operacional das worktrees úteis já foi executado sem abrir MR:
  - `portfolio-backend`: branch `wip/resume-parse-contract`, commit `3c96a0b`,
    publicada em `origin` sem `merge request`
  - `jpglabs-portfolio`: worktree limpa em `main`
  - `portfolio-mobile`: branch `chore/node-pin-and-async-storage`, commit
    `f4183e2`, publicada em `gitlab + origin` sem `merge request`
- o próximo bloqueio real deixou de ser provisionamento e passou a ser:
  sincronização contínua segura, decisão de merge das branches auxiliares e
  canonicalização final de remotes

### `portfolio-backend`

- a worktree útil foi isolada na branch local `wip/resume-parse-contract`
- o commit local preservado é `3c96a0b`
- a branch WIP também já foi publicada em `origin`, mas segue sem `upstream`
  local nem `merge request`, por escolha explícita do usuário
- o repo ainda carrega naming legado no `origin`
- é a superfície que define contrato de backend/BFF; qualquer erro aqui
  propaga para web e mobile

### `jpglabs-portfolio`

- a worktree foi saneada e o repo voltou a ficar limpo em `main`
- o `remote` `gitlab` já existe e o branch `main` já está default/protected no
  GitLab
- não ficou branch auxiliar pendente nesta rodada

### `portfolio-mobile`

- a worktree útil foi isolada na branch `chore/node-pin-and-async-storage`
- o commit preservado é `f4183e2`
- a branch auxiliar já foi publicada em `gitlab + origin`, sem abrir `merge request`
- o `origin` atual já foi normalizado explicitamente em SSH para o slug real
  existente no GitHub: `jpglabs-portifolio-mobile`
- o typo legado em `portifolio` continua existindo no repositório GitHub e
  segue como pendência de naming fora desta rodada

### `portfolio-v2`

- worktree suja
- o repo está explicitamente classificado como referência, não runtime final
- mover este repo como se fosse lane principal reabriria ambiguidade

### `jpglabs-dashboard`

- worktree suja e sem `remote`
- o projeto é útil para coordenação operacional, mas não é dependência direta
  da migração estrutural do portfólio
- não deve competir com o split front/back nem com o release do portfólio

## Ordem Recomendada De Execução

1. `portfolio-backend`
   - motivo: é o boundary canônico do backend/BFF e precisa estabilizar
     naming, ownership e destino antes das superfícies consumidoras
2. `jpglabs-portfolio`
   - motivo: representa a lane provável do frontend público e depende da
     clareza do backend
3. `portfolio-mobile`
   - motivo: cliente fino; deve migrar já apontando para naming e contratos
     estáveis
4. `portfolio-v2`
   - motivo: manter somente como referência até existir decisão explícita de
     arquivamento ou absorção
5. `jpglabs-dashboard`
   - motivo: revisar só depois que o caminho crítico do portfólio estiver fora
     de risco

## Checklist Local Antes De Abrir Sync Contínuo

- [x] confirmar se a worktree do repo-alvo da Onda 0 está limpa ou isolada por
      branch/commit
- [x] confirmar se o branch canônico do repo está identificado e publicado no
      `GitLab`, mesmo quando a worktree ativa estiver estacionada em branch
      auxiliar
- [x] confirmar se o projeto já existe no namespace alvo do `GitLab`
- [ ] confirmar se o nome final do repositório elimina naming legado
- [x] registrar ownership e objetivo do repo no hub antes do corte
- [x] adicionar `remote` `gitlab` somente depois das verificações acima
- [x] validar `remote -v` após o corte
- [x] publicar o branch canônico inicial no GitLab
- [x] proteger os branches canônicos no GitLab
- [x] alinhar upstream local das branches canônicas para `gitlab/*`
- [x] alinhar `remote.pushDefault = gitlab`
- [ ] só então iniciar `pull --ff-only` e sincronização contínua quando a
      worktree estiver limpa e a estratégia de sync estiver aprovada

## Sequência Operacional Recomendada

```bash
# 1. inspeção obrigatória
git -C <repo> status --short
git -C <repo> remote -v

# 2. corte local de remote após confirmar repo existente no GitLab
git -C <repo> remote add gitlab git@gitlab.com:jader-germano/<repo>.git

# 3. validação local
git -C <repo> remote -v

# 4. publicação inicial quando o repo remoto existir e o branch canônico estiver aprovado
git -C <repo> push gitlab <branch>:<branch>

# 5. alinhamento de default/protection no GitLab
glab repo update jader-germano/<repo> --defaultBranch <default-branch>
glab api projects/<project-id>/protected_branches -X POST -f name=<branch>

# 6. cutover metadata-only do tracking local
git -C <repo> branch --set-upstream-to=gitlab/<branch> <branch>
git -C <repo> config remote.pushDefault gitlab

# 7. sync só quando a worktree estiver limpa
git -C <repo> pull --ff-only
```

## Riscos E Trade-offs

- cortar `remote` em worktree suja reduz rastreabilidade e aumenta risco de
  merge sobre base errada
- manter `portfolio-backend` para depois economiza esforço imediato, mas
  prolonga a ambiguidade central do portfólio
- migrar `portfolio-v2` nesta onda simplificaria a lista de repositórios, mas
  reintroduziria a leitura errada de que ele ainda é runtime válido
- deixar `portfolio-mobile` com o naming legado no `origin` diminui atrito de
  curto prazo, mas cristaliza um erro de nomenclatura no destino novo
- publicar branch auxiliar sem MR preserva retomada rápida, mas exige disciplina
  para não confundir branch de estacionamento com branch pronta para merge

## Recomendação Direta

1. não rodar `pull`, rebase automático nem sincronização contínua de nenhum
   repo do portfólio enquanto existir branch auxiliar estacionada sem decisão
   de merge
2. tratar `portfolio-backend` como primeiro repositório a retomar, partindo da
   branch local `wip/resume-parse-contract`
3. manter `jpglabs-portfolio` limpo em `main` e usar `portfolio-mobile` como
   branch auxiliar já publicada, ainda sem MR
4. considerar provisionamento GitLab, proteção de branch e isolamento mínimo
   das worktrees como concluídos na
   Onda 0, deixando o risco remanescente concentrado em limpeza de worktree,
   decisão de merge das branches auxiliares, primeiro ciclo de sync e
   canonicalização final de remotes
5. manter `portfolio-v2` fora da Onda 0 e registrar isso explicitamente na
   governança

## Referências

- [`APPLICATION_STRUCTURE_MIGRATION_PLAN.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/APPLICATION_STRUCTURE_MIGRATION_PLAN.md)
- [`ROADMAP.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs/ROADMAP.md)
- [`projects/portfolio-backend/PROJECT_CONTEXT.md`](/Users/philipegermano/code/jpglabs/docs/projects/portfolio-backend/PROJECT_CONTEXT.md)
- [`projects/portfolio-mobile/PROJECT_CONTEXT.md`](/Users/philipegermano/code/jpglabs/docs/projects/portfolio-mobile/PROJECT_CONTEXT.md)
- [`projects/jpglabs-dashboard/PROJECT_CONTEXT.md`](/Users/philipegermano/code/jpglabs/docs/projects/jpglabs-dashboard/PROJECT_CONTEXT.md)
