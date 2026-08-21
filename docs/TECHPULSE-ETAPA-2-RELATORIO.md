# TechPulse — Relatório da Etapa 2

> **Etapa 2 — Correção e Estabilização da Fundação**
> **Data:** 21/08/2026
> **Branch:** `audit/project-assessment`
> **Commit base:** `5272b64 Merge branch 'main' of https://github.com/AugustoAlmondes/ThechPulse-App`
> **Checkpoint criado:** `276a123 chore: checkpoint Etapa 1 - preserva pnpm-lock sincronizado (AdMob 43 deletions) + relatorios Etapa 0 e 1`
> **Relatórios base:** `docs/TECHPULSE-ETAPA-0-RELATORIO.md` + `docs/TECHPULSE-ETAPA-1-RELATORIO.md` (lidos completamente)

---

## 1. Objetivo

Estabilizar a fundação sem novas funcionalidades: adotar um único gerenciador (`pnpm`), um único lockfile, alinhar todas as dependências Expo ao **SDK 55**, eliminar duplicação nativa, validar `app.json`, remover código morto de AdMob, criar `.env.example`, e garantir `tsc`, `lint` e `expo-doctor` sem os 4 erros da Etapa 0. Nenhuma refatoração de UI, testes, backend, auth ou monetização foi realizada.

---

## 2. Estado Antes das Alterações

| Item | Estado antes (Etapa 1) |
|------|------------------------|
| **Branch** | `audit/project-assessment`, commit `5272b64` |
| **Alteração pendente** | `M pnpm-lock.yaml` — 43 deletions (AdMob) não commitadas |
| **Gerenciador** | Conflito: `pnpm-lock.yaml` (9.0) + `package-lock.json` (508k) ambos presentes; `packageManager` ausente |
| **node_modules** | `.pnpm` + `.modules.yaml` → último install via `pnpm 10.33.4` |
| **Expo SDK** | 55 (`expo@55.0.14`), mas 19 pacotes desalinhados; `expo-notifications@^56.0.18` (major mismatch) |
| **Duplicata** | `expo-constants@55.0.13` + `56.0.18` (via notifications 56) |
| **app.json** | 5 campos inválidos + `extra.eas.projectId: YOUR_EAS_PROJECT_ID` placeholder |
| **AdMob** | Dependência/plugin removidos em `5e00951`, mas `src/hooks/useInterstitialAd.ts` ainda existia (95 linhas, `require` condicional) |
| **android/** | Existe localmente, não rastreado, `/android` no `.gitignore:48` → managed |
| **.env** | Existe em disco, nunca rastreado, 2 vars `EXPO_PUBLIC_*`; `.env.example` inexistente |
| **tsc** | `npx tsc --noEmit` → 0 erros |
| **lint** | `npx expo lint` → 0 errors, 33 warnings |
| **expo-doctor** | 16/20 (4 falhas: lockfile múltiplo, schema app.json, duplicata, mismatch SDK) |
| **expo install --check** | 19 pacotes desatualizados (1 major + 18 patch) |

---

## 3. Alterações Realizadas

| Arquivo | Alteração | Motivo |
|---------|-----------|--------|
| `package.json` | Adicionado `"packageManager": "pnpm@10.33.4"` | Travar gerenciador canônico (corepack) |
| `package.json` | `expo: ^55.0.14 → ^55.0.29`, `expo-constants: ~55.0.13 → ~55.0.17`, `expo-font: ~55.0.6 → ~55.0.8`, `expo-haptics: ~55.0.14 → ~55.0.17`, `expo-image: ~55.0.8 → ~55.0.11`, `expo-linking: ~55.0.12 → ~55.0.17`, `expo-navigation-bar: ~55.0.12 → ~55.0.16`, `expo-notifications: ^56.0.18 → ^55.0.26`, `expo-router: ~55.0.12 → ~55.0.18`, `expo-secure-store: ~55.0.13 → ~55.0.17`, `expo-splash-screen: ~55.0.17 → ~55.0.24`, `expo-status-bar: ~55.0.5 → ~55.0.6`, `expo-symbols: ~55.0.7 → ~55.0.9`, `expo-system-ui: ~55.0.15 → ~55.0.21`, `expo-web-browser: ~55.0.14 → ~55.0.19`, `react-native: 0.83.4 → 0.83.10`, `react-native-pager-view: ^8.0.1 → ^8.0.0`, `react-native-worklets: 0.7.2 → 0.7.4`, `eslint-config-expo: ~55.0.0 → ~55.0.1`, + `@expo/dom-webview@55.0.6` e `@expo/metro-runtime@55.0.12` como deps diretas | Alinhar todo SDK 55 via `npx expo install --fix`; `dom-webview`/`metro-runtime` adicionados para satisfazer peer deps de `expo@55.0.29`/`expo-router@55.0.18` |
| `package-lock.json` | **Removido** (13279 linhas) | Deixar `pnpm-lock.yaml` como único lockfile |
| `pnpm-lock.yaml` | Atualizado: AdMob 43 deletions preservadas + 780 inserções / ~1429 alterações (SDK 55 patches, notifications 55.0.26, dom-webview/metro-runtime) | Sincronizar com `package.json` SDK 55 |
| `app.json` | Removido `newArchEnabled: true` (linha 13) | Campo inválido SDK 55 (new Arch agora padrão) |
| `app.json` | Removido `privacy: "public"` | Campo não reconhecido (legado `expo publish`) |
| `app.json` | Removido `android.compileSdkVersion: 35`, `targetSdkVersion: 35`, `minSdkVersion: 24` | Inválidos em managed; devem ficar em nativo ou `expo-build-properties` |
| `app.json` | Removido bloco `extra.eas: {projectId: YOUR_EAS_PROJECT_ID}` | Placeholder fake que quebra EAS |
| `src/hooks/useInterstitialAd.ts` | **Removido** (95 linhas) | Código morto — `require('react-native-google-mobile-ads')` condicional, não importado após `5e00951` |
| `.env.example` | **Criado** com `EXPO_PUBLIC_API_URL=` e `EXPO_PUBLIC_APP_KEY=` (sem valores) | Onboarding sem expor secrets |
| `pnpm-lock.yaml` (via `pnpm install`) | Sincronizado após cada etapa | Garantir `--frozen-lockfile` OK |

**Checkpoint de segurança criado antes de tudo:**
```
276a123 chore: checkpoint Etapa 1 - preserva pnpm-lock sincronizado (AdMob 43 deletions) + relatorios Etapa 0 e 1
  3 files: docs/TECHPULSE-ETAPA-0-RELATORIO.md, docs/TECHPULSE-ETAPA-1-RELATORIO.md, pnpm-lock.yaml (43 deletions)
```
O que foi preservado: o `pnpm-lock.yaml` já com as 43 deletions (AdMob) + ambos relatórios. Nenhum `reset/restore/clean` foi executado.

---

## 4. Gerenciador de Pacotes

- **Gerenciador adotado:** `pnpm`
- **Versão:** `10.33.4` (`pnpm -v` 10.33.4, `packageManager: pnpm@10.33.4`)
- **Lockfiles:**
  - `pnpm-lock.yaml` → **mantido** (único, `lockfileVersion: '9.0'`, atualizado)
  - `package-lock.json` → **removido** (`Test-Path` = False)
  - `yarn.lock`/`bun.lockb` → inexistentes (inalterado)
- **Resultado `pnpm install --frozen-lockfile`:**
  ```
  Lockfile is up to date, resolution step is skipped
  Already up to date
  Done in 1.5s using pnpm v10.33.4
  EXIT_CODE:0
  ```
  Sem alterações pendentes; `--frozen-lockfile` passa.

---

## 5. Expo

- **SDK mantido:** 55 (não atualizado para 56/57, conforme regra)
- **Versão final `expo`:** `^55.0.29` (era `^55.0.14`, esperado `~55.0.29`)
- **Dependências alinhadas (via `npx expo install --fix` em 2 rodadas):**
  - Rodada 1: `expo@55.0.29` (81 pacotes +81/-42)
  - Rodada 2: `expo-constants@55.0.17`, `expo-font@55.0.8`, `expo-haptics@55.0.17`, `expo-image@55.0.11`, `expo-linking@55.0.17`, `expo-navigation-bar@55.0.16`, `expo-router@55.0.18`, `expo-secure-store@55.0.17`, `expo-splash-screen@55.0.24`, `expo-status-bar@55.0.6`, `expo-symbols@55.0.9`, `expo-system-ui@55.0.21`, `expo-web-browser@55.0.19`, `react-native@0.83.10`, `react-native-pager-view@8.0.0`, `react-native-worklets@0.7.4` (57 +57/-92)
  - Rodada 3: `eslint-config-expo@55.0.1` (12 +12/-5)
  - Manual: `expo-notifications@55.0.26` via `pnpm add expo-notifications@~55.0.26` (-56.0.18 +55.0.26)
  - Extra: `@expo/dom-webview@55.0.6` + `@expo/metro-runtime@55.0.12` adicionados para satisfazer peers

- **`expo-notifications`:**
  - Antes: `^56.0.18` (major mismatch, commit `e51135c`)
  - Depois: `^55.0.26` (compatível SDK 55, via `pnpm add`)
  - Método: `pnpm add expo-notifications@~55.0.26` → `pnpm-lock.yaml` atualizado, `package.json` com `^55.0.26`

- **`expo-constants`:**
  - Antes: duplicata `55.0.13` + `56.0.18` (via notifications 56)
  - Depois: **deduplicado** → única versão `55.0.17` (`pnpm why expo-constants` mostra 1 versão, 55.0.17)

- **`npx expo install --check` após:** `Dependencies are up to date` (0 mismatches, EXIT 0)

---

## 6. app.json

| Campo removido | Motivo | Evidência |
|----------------|--------|-----------|
| `newArchEnabled: true` | `expo-doctor`: `should NOT have additional property 'newArchEnabled'` — New Architecture é padrão em RN 0.83/SDK 55; campo obsoleto (era `experiments.newArchEnabled`) | Etapa 0/1 relatório, `git blame app.json:13` desde `9e074e0` |
| `privacy: "public"` | `should NOT have additional property 'privacy'` — campo legado `expo publish` | `app.json:16`, `git blame 1b7bb70` |
| `android.compileSdkVersion: 35` | `Field: android - should NOT have additional property 'compileSdkVersion'` — em managed é ignorado; se bare, vai em `android/build.gradle` | `app.json:36`, `git blame 1b7bb70` |
| `android.targetSdkVersion: 35` | Idem | `app.json:37` |
| `android.minSdkVersion: 24` | Idem — se precisar custom, usar `expo-build-properties` | `app.json:38` |
| `extra.eas.projectId: "YOUR_EAS_PROJECT_ID"` | Placeholder fake; quebra `eas build`; removido até configurar EAS real | `app.json:96-100` |

Campos mantidos: `name`, `slug`, `version`, `orientation`, `icon`, `scheme`, `userInterfaceStyle`, `description`, `primaryColor`, `owner`, `platforms`, `githubUrl`, `ios` bundle, `android` package/permissions/adaptiveIcon, `web`, `plugins` (7), `updates`, `experiments`.

Após correção: `npx expo-doctor` schema check **passa** (era 1 das 4 falhas).

---

## 7. AdMob

- **Hook removido:** `src/hooks/useInterstitialAd.ts` (95 linhas) — `Remove-Item -Force` confirmado `Test-Path` = False.
- **Referências verificadas (busca global):**
  ```
  Get-ChildItem -Recurse | Select-String "useInterstitialAd|google-mobile-ads" → apenas src/hooks/useInterstitialAd.ts (removido)
  Select-String -Path app.json -Pattern google-mobile-ads → vazio
  Get-Content package.json | Select-String google → vazio
  ```
  Nenhum import ativo em `app/webview/[id].tsx` (já removido em `5e00951`, lido integralmente) ou outro arquivo.
- **Dependência não reintroduzida:** `package.json` sem `react-native-google-mobile-ads` (confirmado após `pnpm add` operations); plugin AdMob não adicionado.
- **Intenção preservada:** Remoção intencional do commit `5e00951` mantida; código morto eliminado sem reintroduzir monetização.

---

## 8. Segurança

- **`.env`:**
  - Mantido **ignorado** (`Check-Ignore -v .env` → `.gitignore:88:.env`), não rastreado (`git ls-files .env` vazio, `git log --all -- .env` vazio).
  - Não editado, não commitado, não exposto (apenas nomes `EXPO_PUBLIC_API_URL` / `EXPO_PUBLIC_APP_KEY` documentados).
  - Conteúdo não alterado em disco (2 linhas, sem valores neste relatório).

- **`.env.example`:**
  - **Criado** com:
    ```
    EXPO_PUBLIC_API_URL=
    EXPO_PUBLIC_APP_KEY=
    ```
  - Sem valores reais, apenas placeholders. `git status` mostra `?? .env.example` (untracked, intencional — não ignorado).

- **Secrets:**
  - Nenhum secret commitado. `EXPO_PUBLIC_APP_KEY` continua como `X-App-Key` em `src/services/api.ts` (visível no bundle por ser `EXPO_PUBLIC_` — por design Expo). Nenhuma rotação foi feita (não houve vazamento Git, conforme Etapa 1).

- **`EXPO_PUBLIC_APP_KEY`:**
  - Uso: `src/services/api.ts:8` → `headers: { "X-App-Key": process.env.EXPO_PUBLIC_APP_KEY }` para `EXPO_PUBLIC_API_URL` (`shared-technews-api.onrender.com`).
  - Tipo: identificadora de app, não segredo server-side; mantida como está.

---

## 9. Android

- **Estado da pasta:** `Test-Path android` → True; conteúdo `app/`, `gradle/`, `build.gradle`, `gradle.properties` (2526 bytes), `gradlew`, `settings.gradle`, `.gitignore` (129 bytes) — não versionado.
- **`.gitignore`:** Linha 48 `/android` mantida — pasta continua ignorada.
- **Managed:** Projeto permanece **managed** (sem `android/` versionado, sem `ios/`, config 100% via `app.json`).
- **Prebuild:** Não executado (`expo prebuild --clean` não rodado, conforme regra).
- **Alterações:** Nenhuma na pasta `android/`; apenas `app.json` removidos os 3 campos `*SdkVersion` que seriam ignorados em managed.

---

## 10. TypeScript

**Comando:** `npx tsc --noEmit`

**Resultado:** **PASS**

```
EXIT_TSC:0
(sem saída — 0 erros)
```

Strict `true` mantido; alias `@/*` intacto; remoção de `useInterstitialAd.ts` não quebrou imports (nenhum arquivo o importava).

---

## 11. Lint

**Comando:** `npx expo lint` (→ `expo lint` via `package.json: lint`)

**Resultado:**

- **Erros:** 0
- **Warnings:** **32** (era 33 na Etapa 0; -1 devido à remoção de `useInterstitialAd.ts` que tinha `no-require-imports`)
- Lista inclui: `no-unused-vars` (COLORS, imports não usados), `import/no-duplicates` (ThemeProvider), `react-hooks/exhaustive-deps` (LoadingScreen, ThemeProvider), `no-named-as-default-member` (axios) — todos pré-existentes, não introduzidos nesta etapa.

**Exit:** 0

---

## 12. Expo Doctor

| Momento | Resultado | Detalhe |
|---------|-----------|---------|
| **Antes (Etapa 0)** | **16/20** | 4 falhas: lockfile múltiplo, schema app.json (5 campos), duplicata `expo-constants`, mismatch SDK (19 pacotes) |
| **Após correções** | **20/20** | `Running 20 checks... 20/20 checks passed. No issues detected!` |

**Checks que passaram após correção:**
- `Check for lock file` → agora único `pnpm-lock.yaml`
- `Check Expo config schema` → `newArchEnabled`/`privacy`/`*SdkVersion` removidos
- `Check that no duplicate dependencies are installed` → `expo-constants` deduplicado (era `@expo/log-box` duplicado também, mas resolvido com `dom-webview`/`metro-runtime` adicionados)
- `Check that packages match versions required` → `Dependencies are up to date`
- `Check for overridden dependencies` → `@expo/metro-runtime@55.0.12` now satisfies `expo-router`

**Nota:** Para atingir 20/20, foi necessário adicionar `@expo/dom-webview@55.0.6` e `@expo/metro-runtime@55.0.12` como deps diretas (via `pnpm add`) para satisfazer peers de `expo@55.0.29`/`expo-router@55.0.18`. Sem isso, ficava 17/20 (peer warnings). Isso é ajuste de fundação, não feature.

---

## 13. Execução

- **Comando testado:** `pnpm start --help` (via `pnpm start` → `expo start --help`)
  ```
  > teachpulse@1.0.0 start
  > expo start "--help"
  Info: Start a local dev server for the app — Usage: $ npx expo start <dir> ...
  EXIT:-1 (help retorna -1, normal)
  ```
  `pnpm` como gerenciador funciona; `expo start` responde.

- **Comando validado:** `npx expo config --type public` (implícito via doctor) + `npx expo-doctor` 20/20 → config legível.

- **Metro/bundle:** Não foi executado `pnpm start` com Metro persistente (requer emulador/dispositivo; limitação de ambiente Windows/PowerShell com múltiplos `node` processos, conforme Etapa 0). Mesma limitação documentada: *"Não foi possível validar completamente que o projeto gera o bundle inicial"* — mas `expo-doctor` 20/20 e `tsc` 0 indicam que deve iniciar.

- **Dispositivo/emulador:** Não disponível — não foi instalado Android SDK/emulador (conforme regra "NÃO instale um ambiente inteiro").

- **Erros:** Nenhum erro de dependência imediato. `pnpm why expo`/`expo-notifications`/`expo-constants` todos em linha 55.

---

## 14. Dependências

**`pnpm why expo` (trecho):**
```
expo@55.0.29
├─ @expo/cli@55.0.35
└─ teachpulse@1.0.0 (dependencies) → expo@55.0.29
```

**`pnpm why expo-notifications`:**
```
expo-notifications@55.0.26
└── teachpulse@1.0.0 (dependencies)
Found 1 version of expo-notifications
```

**`pnpm why expo-constants`:**
```
expo-constants@55.0.17
├─ @expo/router-server@55.0.19 → expo@55.0.29
├─ expo-router@55.0.18 → teachpulse
└─ teachpulse@1.0.0 (direct) → 55.0.17
Found 1 version (deduplicated, era 2 versões 55.0.13+56.0.18)
```

**`pnpm why @expo/metro-runtime` / `@expo/dom-webview`:**
```
@expo/metro-runtime@55.0.12 → teachpulse + expo@55.0.29
@expo/dom-webview@55.0.6 → teachpulse + expo
```

Todas em linha 55, sem duplicata crítica.

---

## 15. Alterações Inesperadas

| Item | Esperado | Ocorrido | Ação |
|------|----------|----------|------|
| `pnpm-lock.yaml` diff | 43 deletions (AdMob) | **780 inserções + ~1429 alterações** além das 43 deletions | **Esperado** — `expo install --fix` atualizou 18 pacotes + 2 peers; pnpm-lock reflete novo SDK 55 alinhado. Não é inesperado, é o resultado do alinhamento. |
| `@expo/dom-webview` + `@expo/metro-runtime` como deps diretas | Não previsto na Etapa 1 | Adicionados para atingir 20/20 (peer deps de `expo@55.0.29`) | **Documentado** — sem eles, doctor ficava 17/20; são peers oficiais do SDK 55. |
| `react-native-pager-view` downgrade `8.0.1 → 8.0.0` | Patch mismatch | Corrigido via `expo install --fix` (esperado 8.0.0) | OK |
| `pnpm install` peer warnings (`@expo/dom-webview`, `react-native-worklets`) | - | Apareceram após `expo@55.0.29` mas resolvidos | Resolvidos com deps diretas |
| `.env.example` | Criado com 2 placeholders | `git status` mostra `?? .env.example` (untracked) | **Esperado** — será commitado quando o responsável decidir |

Nenhuma alteração não relacionada à fundação foi introduzida (sem UI, sem arquitetura).

---

## 16. Pendências

### CRÍTICO

*Nenhum.* Todos os críticos da Etapa 1 (C01) resolvidos (20/20).

### ALTO

*Nenhum.* A01 (lockfiles), A02 (pnpm 43 deletions), A03 (AdMob morto) resolvidos.

### MÉDIO

| ID | Pendência | Próxima etapa |
|----|-----------|---------------|
| M01 | Sem testes automatizados (0% cobertura) | Definir Jest + RNTL |
| M02 | Sem `eas.json` / EAS não configurado (removido placeholder) | Criar quando for publicar |
| M03 | `EXPO_PUBLIC_APP_KEY` visível no bundle (por ser `EXPO_PUBLIC_`) | Avaliar proxy se API exigir segredo |

### BAIXO

| ID | Pendência | Próxima etapa |
|----|-----------|---------------|
| B01 | Node 24.19.0 vs LTS 20 recomendado | Adicionar `.nvmrc`/`engines` |
| B02 | `teachpulse` vs `TechPulse` nome divergente | Padronizar se necessário |
| B03 | 32 warnings de lint | Limpeza incremental |
| B04 | Sem `prettier` | Considerar formatação |
| B05 | `android/adaptiveIcon.backgroundImage` redundante (mesmo `icon.png` em 3 campos) | Verificar |

---

## 17. Estado Final

| Pergunta | Resposta |
|----------|----------|
| **O projeto está usando um único gerenciador?** | **Sim.** `pnpm@10.33.4` via `packageManager`, `pnpm-lock.yaml` único, `package-lock.json` removido, `pnpm install --frozen-lockfile` OK. |
| **Existe um único lockfile?** | **Sim.** Apenas `pnpm-lock.yaml` (`lockfileVersion: '9.0'`), `package-lock.json` não existe, `yarn.lock`/`bun.lockb` inexistentes. |
| **Expo está coerente?** | **Sim.** SDK 55, `expo@55.0.29` (esperado `~55.0.29`), `npx expo install --check` → `Dependencies are up to date`. |
| **expo-notifications está coerente?** | **Sim.** `55.0.26` (era `56.0.18`, esperado `~55.0.26`). |
| **expo-constants está deduplicado?** | **Sim.** Única versão `55.0.17` (`pnpm why` 1 versão; antes 2). |
| **app.json está válido?** | **Sim.** 5 campos inválidos + `extra.eas` placeholder removidos; `expo-doctor` schema check passa. |
| **AdMob morto foi removido?** | **Sim.** `src/hooks/useInterstitialAd.ts` removido; `package.json`/`app.json` sem AdMob; `pnpm-lock.yaml` sem rastros. |
| **TypeScript passa?** | **Sim.** `npx tsc --noEmit` → PASS (0 erros). |
| **Lint passa?** | **Sim.** `npx expo lint` → 0 errors, 32 warnings (era 33). |
| **Expo Doctor passa?** | **Sim.** 20/20 (era 16/20; +4 checks corrigidos). |
| **O projeto inicia?** | **Parcialmente validado.** `pnpm start --help` OK, `expo config` OK, `expo-doctor` 20/20. Metro persistente não testado com emulador (limitação ambiente, mesma da Etapa 0). |
| **O projeto está pronto para a próxima etapa?** | **Sim.** Fundação estável, sem bloqueios críticos/altos. Próxima etapa pode focar em DX/testes/EAS sem risco de lockfile ou SDK mismatch. |

---

## 18. Recomendações

> **Não implementar a próxima etapa. Apenas recomendar.**

1. **Consolidar Git:** `git add app.json package.json pnpm-lock.yaml .env.example` + `git rm --cached package-lock.json` (já removido) + `git add src/hooks/useInterstitialAd.ts` deletion + commit com mensagem descritiva (ex: `chore: estabiliza fundacao SDK 55 - pnpm unico, expo 55.0.29, app.json valido, remove AdMob`). Não fazer push até revisão humana.

2. **Padronizar ambiente:** Criar `.nvmrc` com `20` e/ou `engines: {node: ">=20"}` em `package.json` para CI; documentar `pnpm@10.33.4` via `corepack enable`.

3. **EAS:** Quando for publicar, criar `eas.json` (`eas build:configure`) e substituir `extra.eas.projectId` removido por ID real do Expo Dashboard.

4. **Testes:** Adicionar Jest + `@testing-library/react-native` para stores (`useFavoriteStore`, `historicStore`) — cobertura 0% atual.

5. **Lint:** Limpar os 32 warnings restantes incrementalmente (não bloqueante).

6. **Segurança:** Se `shared-technews-api` exigir proteção real, mover `EXPO_PUBLIC_APP_KEY` para proxy server-side; por enquanto aceitável como identificadora.

7. **Verificação humana:** Revisar `pnpm-lock.yaml` diff (1429 alterações) e `package.json` diff (43 linhas) antes do commit final; confirmar que SDK permanece 55 (não 56/57).

---

## Apêndice — Comandos Executados (Etapa 2)

```
git status
git branch
git log --oneline -5
git add pnpm-lock.yaml docs/TECHPULSE-ETAPA-*.md
git commit -m "chore: checkpoint Etapa 1..."
git diff -- pnpm-lock.yaml --stat (via Select-Object)
# Gerenciador
Get-Content package.json | Select-String packageManager
pnpm -v / node -v / npx expo --version
Edit package.json → add packageManager pnpm@10.33.4
Remove-Item package-lock.json -Force
pnpm install --frozen-lockfile
pnpm add expo-notifications@~55.0.26
npx expo install --check
npx expo install --fix (3 rodadas, 120s timeout na 2a)
pnpm add @expo/metro-runtime@55.0.12 @expo/dom-webview@55.0.6
# app.json
Read app.json
Edit app.json → remove newArchEnabled, privacy, compileSdkVersion, targetSdkVersion, minSdkVersion, extra.eas
# AdMob / env
Get-ChildItem -Recurse | Select-String useInterstitialAd|google-mobile-ads
Remove-Item src/hooks/useInterstitialAd.ts -Force
Write .env.example (EXPO_PUBLIC_API_URL= / EXPO_PUBLIC_APP_KEY=)
# Validacoes
npx tsc --noEmit
npx expo lint
npx expo-doctor (2x)
pnpm why expo / expo-notifications / expo-constants / @expo/metro-runtime / @expo/dom-webview
pnpm list @expo/metro-runtime
pnpm start --help
git status --short
git diff --stat
git diff -- package.json / app.json / .env.example / pnpm-lock.yaml
```

> **Confirmação:** Nenhum `git reset/clean/restore/push/force push/pull/merge/rebase` foi executado. Nenhum secret exposto. Nenhum SDK 56/57 instalado. Nenhum `expo prebuild --clean` ou `android/` removido. `git status` final mostra 5 alterações pendentes (app.json, package.json, pnpm-lock.yaml, useInterstitialAd.ts deletion, .env.example) — aguardando decisão humana para commit.
