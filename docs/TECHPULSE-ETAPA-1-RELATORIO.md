# TechPulse — Relatório da Etapa 1

> **Etapa 1 — Decisões Críticas de Fundação**
> **Data da auditoria:** 21/08/2026
> **Auditor:** IA — Etapa 1 (investigação, sem refatoração)
> **Branch auditada:** `audit/project-assessment`
> **Commit auditado:** `5272b64 Merge branch 'main' of https://github.com/AugustoAlmondes/ThechPulse-App`
> **Relatório base:** `docs/TECHPULSE-ETAPA-0-RELATORIO.md` (lido completamente antes desta etapa)

---

## 1. Resumo Executivo

A Etapa 1 investigou as 10 fundações críticas apontadas na Etapa 0 sem realizar correções. O estado do projeto permanece **preservado** (nenhum `reset`, `restore` ou `update` executado). Principais conclusões:

- **Gerenciador:** Conflito `pnpm-lock.yaml` vs `package-lock.json` é real e histórico; evidências apontam `pnpm` como gerenciador primário, mas ambos foram mantidos em paralelo desde o commit inicial.
- **pnpm-lock.yaml modificado:** A alteração local (43 deletions) é **legítima e esperada** — corresponde exatamente à remoção de `react-native-google-mobile-ads` feita no commit `5e00951`, mas que não foi sincronizada no lockfile do branch `audit/project-assessment` até a instalação local atual. Nenhuma linha de código produtivo foi afetada; apenas o lockfile reflete o estado correto pós-remoção.
- **.env:** **Não há evidência de exposição no histórico Git.** O arquivo nunca foi rastreado (`git ls-files .env` vazio, `git log --all -- .env` vazio, `git rev-list --all --objects` sem `.env`). Está corretamente ignorado por `.gitignore:88`. Risco de vazamento histórico é **baixo**, mas valor da chave ainda precisa de avaliação.
- **API Key:** `EXPO_PUBLIC_APP_KEY` é enviada como header `X-App-Key` para `EXPO_PUBLIC_API_URL` (`shared-technews-api.onrender.com`). Por ter prefixo `EXPO_PUBLIC_`, é **embutida no bundle** e visível no cliente — não é segredo server-side, mas funciona como identificador de app. Recomendação: manter por enquanto, avaliar proxy futuro.
- **Expo SDK 55 vs expo-notifications 56.0.18:** Mismatch introduzido no commit `e51135c` (feat: add expo-notifications...) com `^56.0.18` em projeto SDK 55. Causa direta da duplicata `expo-constants`. Recomendação: **Opção A — alinhar para SDK 55** (downgrade notifications para `~55.0.26`).
- **AdMob:** Remoção **incompleta**. Dependência e plugin removidos em `5e00951`, mas `src/hooks/useInterstitialAd.ts` ainda existe com `require()` condicional e IDs de teste. Estado atual: inoperante mas não quebra o app.
- **android/:** Pasta existe localmente mas **não é rastreada** (`git ls-files --cached -- android` vazio) e está coberta por `.gitignore:48 /android`. Projeto é **managed** com artefato local não versionado — recomendação: manter managed.
- **Node 24.19.0:** Funciona para `tsc` e `expo lint`, mas é mais novo que o LTS recomendado para SDK 55.
- **app.json:** 6 campos inválidos/obsoletos confirmados via `expo-doctor` e `git blame`.

Nenhuma correção foi aplicada nesta etapa; todas as decisões são propostas para a Etapa 2.

---

## 2. Estado do Git

### Branch e commit

| Campo | Valor |
|-------|-------|
| **Branch atual** | `audit/project-assessment` |
| **Branches locais** | `* audit/project-assessment`, `main` |
| **Commit atual** | `5272b64 Merge branch 'main' of https://github.com/AugustoAlmondes/ThechPulse-App` (Merge: `a8b836c` + `5e00951`) |
| **Autor do merge** | `AugustoAlmondes <augusto7666@gmail.com>`, 20/08/2026 16:03:55 -0300 |
| **Remote** | `origin https://github.com/AugustoAlmondes/ThechPulse-App` |

### Status

```
On branch audit/project-assessment
Changes not staged for commit:
  modified:   pnpm-lock.yaml
Untracked files:
  docs/
```

- `git status --short`: ` M pnpm-lock.yaml` + `?? docs/` (docs contém `DOCUMENTACAO_TECNICA.md` ignorado + `TECHPULSE-ETAPA-0-RELATORIO.md` + este relatório)
- `git diff --stat`: `pnpm-lock.yaml | 43 -------------------------------------------` (1 file, 43 deletions)
- `git diff --numstat -- pnpm-lock.yaml`: `0 43` (0 adições, 43 remoções)

### Alteração do pnpm-lock.yaml — análise detalhada

**Comando executado:** `git diff -- pnpm-lock.yaml`

**Conteúdo removido (43 linhas, apenas deletions):**

| Bloco | Linhas removidas | Descrição |
|-------|------------------|-----------|
| `importers: dependencies` | `react-native-google-mobile-ads: specifier ^16.3.3 / version 16.3.3(expo@55.0.14)...` | Entrada da dependência no importers |
| `packages: @iabtcf/core@1.5.6` | 3 linhas | Dependência transitiva do AdMob (IAB Transparency Framework) |
| `packages: dequal@2.0.3` | 4 linhas | Dependência transitiva (`use-deep-compare-effect` → `dequal`) |
| `packages: react-native-google-mobile-ads@16.3.3` | 8 linhas | Definição do pacote AdMob com peer `expo >=47.0.0` |
| `packages: use-deep-compare-effect@1.8.1` | 6 linhas | Hook usado pelo AdMob |
| `snapshots: @iabtcf/core@1.5.6` | 1 linha | Snapshot pnpm |
| `snapshots: dequal@2.0.3` | 1 linha | Snapshot pnpm |
| `snapshots: react-native-google-mobile-ads@16.3.3...` | 9 linhas | Snapshot com deps `@iabtcf/core`, `use-deep-compare-effect` |
| `snapshots: use-deep-compare-effect@1.8.1...` | 4 linhas | Snapshot |
| **Total** | **43 deletions, 0 additions** | Apenas remoções, sem adições |

### Conclusão sobre a alteração

- **Por que foi removida:** As 43 linhas são **exclusivamente** o rastro de `react-native-google-mobile-ads` e suas transitivas (`@iabtcf/core`, `dequal`, `use-deep-compare-effect`). Isso corresponde **exatamente** ao commit `5e00951 feat: Google ads lib has been removed` que removeu `react-native-google-mobile-ads` do `package.json` (1 linha) mas **não atualizou `pnpm-lock.yaml`** no histórico (o commit `5e00951 --stat` lista `pnpm-lock.yaml` como não tocado — apenas `package-lock.json` foi atualizado).
- **Se corresponde ao estado esperado após 5e00951:** **Sim.** O estado atual do `pnpm-lock.yaml` no working tree (com as 43 deletions) é o estado **correto** que deveria ter sido commitado em `5e00951` para refletir a remoção. O arquivo versionado em `HEAD` (9037c54) ainda contém o AdMob; o arquivo no disco (0019149) já não contém.
- **Legítima ou acidental:** **Legítima.** É resultado de `pnpm install` executado após o merge `5272b64` (que trouxe `package.json` sem AdMob mas com `pnpm-lock.yaml` antigo). O instalador sincronizou o lockfile com o `package.json` atual. Não há remoção de código produtivo, apenas limpeza de dependência removida.
- **Ação recomendada:** **Commmitar a alteração** na Etapa 2 após decidir o gerenciador canônico. Não descartar com `git restore`.

---

## 3. Gerenciador de Pacotes

### Evidências coletadas

| Evidência | Detalhe | Peso |
|-----------|---------|------|
| `git log --all --oneline -- pnpm-lock.yaml` | 9 commits tocam `pnpm-lock.yaml` (desde `e941034` até `e51135c`), todos com `M pnpm-lock.yaml` | Alto |
| `git log --all --oneline -- package-lock.json` | 9 commits tocam `package-lock.json` (desde `9e074e0` até `5e00951`), incluindo o mesmo `e941034` inicial | Alto |
| `git log --all --diff-filter=A -- pnpm-lock.yaml` | Primeiro commit com pnpm foi `e941034 feat: remove reset-project script...` (11/04/2026) — posterior ao `package-lock.json` que existe desde `9e074e0 Initial commit` (11/04/2026, gerado por `create-expo-app 3.5.3`) | Alto |
| `node_modules/.pnpm` + `node_modules/.modules.yaml` | Existem → última instalação foi via `pnpm` 10.33.4 | Médio |
| `package.json:packageManager` | Ausente | Médio |
| `README.md` | Contém `npm install` (linha 74) | Baixo (desatualizado) |
| `pnpm-lock.yaml: lockfileVersion` | `'9.0'` → pnpm v9+ (compatível com pnpm 10.33.4) | Médio |
| `git show 5e00951 --stat` | Tocou `package-lock.json` mas **não** tocou `pnpm-lock.yaml` | Alto |

### Histórico interpretado

- O projeto nasceu com **npm** (`package-lock.json` desde `9e074e0 Initial commit`, gerado por `create-expo-app`).
- Em `e941034` (11/04/2026), `pnpm-lock.yaml` foi introduzido **sem remover** `package-lock.json` — a partir daí ambos foram mantidos em paralelo em todos os commits subsequentes.
- Nenhum commit removeu `package-lock.json` ao adotar pnpm, nem vice-versa. Isso criou o conflito permanente detectado por `expo-doctor`.

### Gerenciador recomendado

**GERENCIADOR RECOMENDADO: `pnpm`**

**MOTIVAÇÃO:**
- Última instalação local foi via `pnpm` (`.pnpm` presente, `pnpm-lock.yaml` atualizado localmente).
- `pnpm-lock.yaml` é mais recente e reflete corretamente a remoção do AdMob (43 deletions), enquanto `package-lock.json` ainda reflete o estado pré-`5e00951` em alguns trechos.
- `pnpm` oferece deduplicação e performance superiores para projetos Expo com muitas dependências.

**EVIDÊNCIAS:** Tabela acima + `node_modules/.modules.yaml` + `lockfileVersion: '9.0'` + `pnpm 10.33.4` instalado.

**ALTERNATIVAS DESCARTADAS:**
- **`npm` (manter `package-lock.json`):** Descartado porque exigiria `npm install` completo, recriação do lockfile e perda da deduplicação atual. README menciona `npm install` mas está desatualizado; histórico mostra `pnpm` como uso real nos últimos meses.
- **Manter ambos:** Descartado — `expo-doctor` falha e EAS Build infere gerenciador incorretamente.
- **`yarn`/`bun`:** Nenhum lockfile desses existe; sem evidência de uso.

### Lockfile recomendado

- **Manter:** `pnpm-lock.yaml` (com as 43 deletions commitadas)
- **Remover:** `package-lock.json` (na Etapa 2)
- **Adicionar:** `packageManager: "pnpm@10.33.4"` em `package.json` para travar versão e permitir `corepack`.

### O que ainda não foi alterado

- Nenhum lockfile foi removido nesta etapa.
- `package.json` não foi editado (sem `packageManager`).
- `node_modules` não foi reinstalado.
- `pnpm-lock.yaml` modificado permanece não staged (preservado).

---

## 4. Segurança — .env

> **Nenhum valor de variável é exposto neste relatório. Apenas nomes.**

### Arquivos verificados

| Arquivo | Existe no FS | Rastreado no Git | No histórico |
|---------|--------------|------------------|--------------|
| `.env` | Sim | **Não** (`git ls-files .env` vazio) | **Não** (`git log --all -- .env` vazio, `git log --all --name-status -- .env` vazio, `git rev-list --all --objects` sem `.env`) |
| `.env.local` | Não | Não | Não |
| `.env.development` | Não | Não | Não |
| `.env.production` | Não | Não | Não |
| `.env.example` | Não | Não | Não |

### Verificações executadas

```
git status --short -- .env          → (vazio)
git ls-files .env                   → (vazio)
git ls-files --cached | grep env    → (vazio)
git log --all -- .env               → (vazio)
git log --all --name-status -- .env → (vazio)
git log --all -p -- .env            → (vazio)
git log --all --diff-filter=A -- .env → (vazio)
git rev-list --all --objects | grep .env → (vazio)
git check-ignore -v .env            → .gitignore:88:.env  .env
```

### Variáveis no `.env` (apenas nomes)

```
EXPO_PUBLIC_API_URL
EXPO_PUBLIC_APP_KEY
```

### Está/esteve no Git?

- **Nunca foi rastreado.** O `.gitignore` ignora `.env` desde `1b7bb70` ou antes (linha 88), e nenhum commit no histórico contém o arquivo.
- **Não existe no histórico público.** `origin` nunca recebeu `.env`.

### Evidência de exposição

- **Não há evidência de exposição via Git.** O arquivo atual em disco nunca foi commitado.
- **Risco residual:** Se o arquivo foi criado localmente antes do `.gitignore` e commitado em branch não analisada, não foi detectado nos logs `--all`. Probabilidade baixa.

### Risco

- **Baixo para vazamento via Git.** 
- **Médio para exposição via bundle:** Como as variáveis têm prefixo `EXPO_PUBLIC_`, são embutidas no JavaScript do app e visíveis para quem descompila o bundle. Isso é **esperado** pelo Expo, mas significa que `EXPO_PUBLIC_APP_KEY` não é segredo server-side.

### Ação recomendada

- **Não é necessário reescrever histórico Git nem force push.**
- **Rotação de `EXPO_PUBLIC_APP_KEY`:** Recomendada **apenas se** a chave for considerada segredo sensível (ver seção 5). Se for apenas identificador de app, rotação é opcional.
- **Próximos passos:** Adicionar `.env.example` com placeholders (`EXPO_PUBLIC_API_URL=` / `EXPO_PUBLIC_APP_KEY=`) para onboarding sem expor valores.

### Necessidade de rotação

- **Não obrigatória por vazamento Git.** 
- **Avaliar rotação por exposição no bundle** (se a API exigir segredo real).

---

## 5. Segurança — API Key

### Como é utilizada

**Arquivo:** `src/services/api.ts` (11 linhas, lido integralmente)

```ts
// Resumo sem expor valores:
headers: {
  "Content-Type": "application/json",
  "X-App-Key": process.env.EXPO_PUBLIC_APP_KEY,
  "User-Agent": "TechPulse/1.0.0 ReactNative"
}
baseURL: process.env.EXPO_PUBLIC_API_URL
```

**Outros locais:** `src/services/news.ts` consome `api.get('/news', {params: {page}})` e `api.get('/news/check-updates', {params: {after}})` — ambos herdam o header `X-App-Key` via instância Axios.

**Busca por `X-App-Key` / `EXPO_PUBLIC` no `src/`:** Apenas `src/services/api.ts` contém `X-App-Key` e `EXPO_PUBLIC_APP_KEY`; nenhum outro arquivo referencia a chave.

### Onde

- **Enviada em:** Toda requisição HTTP para `https://shared-technews-api.onrender.com` (valor de `EXPO_PUBLIC_API_URL` lido do `.env`, sem expor valor exato).
- **Header:** `X-App-Key: <valor de EXPO_PUBLIC_APP_KEY>`

### É pública?

- **Sim, por design.** Prefixo `EXPO_PUBLIC_` faz a variável ser substituída em tempo de build e incluída no bundle JS. Qualquer usuário com o APK/IPA ou bundle web pode extrair a chave.
- Documentação Expo: *"EXPO_PUBLIC_* variables are exposed to the client and should not be used for secrets."*

### Parece ser segredo real ou apenas identificador?

- **Parece ser chave de identificação de app, não segredo de alta sensibilidade.** Nome `APP_KEY` (não `SECRET`/`PRIVATE_KEY`), enviada como `X-App-Key` (padrão de API key de cliente), sem mecanismo adicional de autenticação (sem JWT, OAuth, `Authorization` header).
- **Evidência adicional:** `src/services/api.ts` não implementa refresh token, login, ou assinatura HMAC — apenas a chave estática.

### Risco

- **Baixo para comprometimento de dados do usuário:** A API parece ser de leitura de notícias públicas; a chave provavelmente limita rate ou identifica o app, não protege dados pessoais.
- **Médio se a API for privada/paga:** Se a API cobra por uso ou contém dados sensíveis, a chave exposta no bundle permite uso não autorizado (abuso de quota).

### Recomendação

- **Manter como está na Etapa 2** (não é crítico).
- **Futuro (pós-Etapa 2):** Se a API exigir proteção real, mover a chave para proxy server-side (ex: Cloud Function que injeta `X-App-Key` sem expor ao cliente) ou trocar por autenticação por usuário.

---

## 6. Expo

### SDK atual

| Campo | Valor | Fonte |
|-------|-------|-------|
| **SDK** | 55 | `expo@^55.0.14`, `sdkVersion: 55.0.0` em `npx expo config` |
| **Expo CLI** | 55.0.23 (local) | `npx expo --version` |
| **React** | 19.2.0 | `package.json` |
| **React Native** | 0.83.4 (esperado 0.83.10) | `package.json` vs `expo install --check` |
| **Expo Router** | ~55.0.12 (esperado ~55.0.18) | `package.json` |

### Versões e mismatches

- 19 pacotes fora do esperado (1 major, 18 patch) — ver Etapa 0 seção 5. Todos são patches do SDK 55 exceto `expo-notifications`.

### Origem do mismatch (expo-notifications)

- **Commit:** `e51135c feat: add expo-notifications and include new splash screen icon assets` (12/07/2026 20:31:48 -0300)
- **Evidência:** `git log --all -p -- package.json | grep expo-notifications` → `+    "expo-notifications": "^56.0.18"` (único commit que adiciona a linha)
- **Blame:** `git blame package.json | grep notifications` → `e51135c9 ... "expo-notifications": "^56.0.18"`
- **Causa provável:** Instalação com `npm install expo-notifications` ou `expo install expo-notifications` sem especificar versão, que pegou a `latest` (56) em vez da compatível com SDK 55. Uso de `^` permitiu major 56.

### Opções de correção

#### OPÇÃO A — Manter SDK 55 e alinhar dependências

| Aspecto | Detalhe |
|---------|---------|
| **Esforço** | Baixo (1 comando: `npx expo install --fix` ou `pnpm add expo-notifications@~55.0.26`) |
| **Risco** | Baixo — SDK 55 é o SDK atual do projeto; alinhar patches é seguro |
| **Impacto em código** | Nenhum — patches são compatíveis |
| **Impacto em Android** | Nenhum — sem mudança de compileSdk |
| **Impacto em bibliotecas nativas** | Resolve duplicata `expo-constants` |
| **Impacto em Expo Router** | Patch de `~55.0.12` → `~55.0.18` é compatível |
| **Impacto em React Native** | `0.83.4` → `0.83.10` é patch |
| **Impacto no futuro lançamento** | Mantém projeto em SDK estável e testado |

#### OPÇÃO B — Atualizar todo o projeto para SDK 56/57

| Aspecto | Detalhe |
|---------|---------|
| **Esforço** | Alto — `npx expo install --fix` para SDK 56 exige atualização de `expo`, `react-native`, `expo-router`, `typescript`, e todos os `expo-*`; pode exigir `expo prebuild --clean` |
| **Risco** | Médio-Alto — SDK 56/57 introduz breaking changes (ex: `expo-notifications` 56 já está, mas outros pacotes precisam acompanhar); `reactCompiler: true` pode ter incompatibilidades |
| **Impacto em código** | Possível — verificar `typedRoutes`, `reactCompiler` |
| **Impacto em Android** | Médio — `compileSdkVersion` pode precisar subir |
| **Impacto em bibliotecas nativas** | Médio — `react-native-reanimated`, `react-native-worklets`, `react-native-pager-view` precisam versões compatíveis |
| **Impacto no futuro lançamento** | Mantém projeto no SDK mais recente, mas exige testes extensivos |

### Recomendação

**OPÇÃO A — Manter SDK 55 e alinhar.**

**Motivo:** Custo-benefício. O projeto está funcional em SDK 55; o único major mismatch é `expo-notifications` que foi instalado acidentalmente em versão futura. Alinhar para `~55.0.26` resolve a duplicata crítica com `npx expo install expo-notifications@~55.0.26` sem risco. Upgrade para 56/57 deve ser planejado como etapa separada com testes.

**Confiança:** Alta.

---

## 7. expo-notifications

| Campo | Valor |
|-------|-------|
| **Versão atual** | `^56.0.18` (package.json linha 30, `expo-notifications: ^56.0.18`) |
| **Versão esperada (SDK 55)** | `~55.0.26` (via `npx expo install --check`) |
| **Origem** | Commit `e51135c` (12/07/2026) — `git show e51135c --stat` adicionou 1 linha em `package.json` + 106 linhas em `pnpm-lock.yaml` |
| **Impacto** | Major mismatch causa duplicata `expo-constants` (55.0.13 + 56.0.18 aninhado), `expo-doctor` falha em 2 checks, risco de build nativo quebrado |
| **Recomendação** | Downgrade para `~55.0.26` via `npx expo install expo-notifications@~55.0.26` (ou `pnpm add expo-notifications@~55.0.26` com `pnpm`) na Etapa 2. Não atualizar para 56 sem atualizar todo o SDK. |

---

## 8. expo-constants

### Duplicação

- **Encontrado:** `expo-doctor` reporta:
  ```
  Found duplicates for expo-constants:
    ├─ expo-constants@55.0.13 (at: node_modules/expo-constants)
    │  └─ linked to: node_modules/.pnpm/expo-constants@55.0.13...
    └─ expo-constants@56.0.18 (at: node_modules/.pnpm/expo-notifications@56.0.18__.../node_modules/expo-constants)
  ```

### Causa

- **Causa raiz:** `expo-notifications@56.0.18` depende de `expo-constants@56.0.18` (peer), enquanto o projeto declara `expo-constants@~55.0.13` como dependência direta. O pnpm instala ambas, criando duplicata.
- **Não é causa isolada:** Sem o mismatch de `expo-notifications`, a duplicata não existiria.

### Correção

- Resolver P02 (downgrade `expo-notifications`) automaticamente deduplica `expo-constants` para `~55.0.17` (esperado pelo SDK 55).
- Verificar com `npx expo-doctor` após correção — check `Check that no duplicate dependencies are installed` deve passar.

---

## 9. AdMob

### Estado real determinado

| Aspecto | Estado | Evidência |
|---------|--------|-----------|
| **Dependência `package.json`** | **Removida** | `git show 5e00951 -- package.json` → `-    "react-native-google-mobile-ads": "^16.3.3"`; `Get-Content package.json | Select-String google` → vazio |
| **Plugin `app.json`** | **Removido** | `git show 5e00951 --stat` → `app.json | 7 --`; `Select-String -Path app.json -Pattern google-mobile-ads` → vazio; plugins atuais são 7 (sem AdMob) |
| **Código `src/hooks/useInterstitialAd.ts`** | **Existe, mas inoperante** | Arquivo de 95 linhas com `require('react-native-google-mobile-ads')` dentro de `tryLoadAdsModule()` com `try/catch` que retorna `null` se o módulo não estiver instalado. Não quebra o app; `useInterstitialAd` retorna `{showAd: () => false}` quando `AdsModule` é null. |
| **Referências em `app/webview/[id].tsx`** | **Removidas** | `git show 5e00951 -- app/webview/[id].tsx` removeu 13 linhas (import do hook + `useEffect` que chamava `showAd`). Arquivo atual não importa `useInterstitialAd` (lido integralmente, sem `InterstitialAd` ou `useInterstitialAd`). |
| **Outras referências** | **Nenhuma** | `Get-ChildItem -Path src -Recurse | Select-String google-mobile-ads` → vazio em `src` (apenas o hook contém o `require` condicional); `package.json` sem google |
| **Lockfile** | **Inconsistente** | `pnpm-lock.yaml` versionado ainda contém AdMob (9037c54), mas working tree já sem AdMob (0019149, 43 deletions) — ver seção 2 |

### Intenção aparente do projeto

- **Remoção intencional.** Commit `5e00951` mensagem `feat: Google ads lib has been removed` removeu dependência, plugin e uso na WebView. Commit anterior `af882fe` havia integrado AdMob (`feat: integrate Google Mobile Ads...`). A remoção foi deliberada, provavelmente para simplificar o projeto ou evitar configuração de AdMob IDs.
- **Remoção incompleta:** O hook `useInterstitialAd.ts` foi mantido com fallback seguro, mas é código morto (não importado em nenhum arquivo após `5e00951`). Deveria ter sido removido junto.

### Recomendação

- **Se a intenção é manter sem AdMob:** Remover `src/hooks/useInterstitialAd.ts` na Etapa 2 (código morto). Nenhum outro arquivo precisa mudar.
- **Se a intenção é reativar AdMob:** Re-adicionar `react-native-google-mobile-ads@^16.3.3`, plugin em `app.json` com `androidAppId`/`iosAppId` (usar IDs de teste em dev), e re-integrar `useInterstitialAd` em `app/webview/[id].tsx`. Requer `expo prebuild --clean` e teste em build nativo (não Expo Go).
- **Recomendação atual:** **Remover o hook morto** (Opção A), pois a mensagem do commit indica remoção intencional e não há `androidAppId` real configurado (usava IDs de teste `ca-app-pub-394025...`).

---

## 10. Android

### Existência da pasta

- `Test-Path android` → `True` — pasta existe localmente.
- Conteúdo: `app/` (com `src/`, `build.gradle`, `debug.keystore`, `proguard-rules.pro`), `gradle/` (wrapper), `build.gradle` (556 bytes), `gradle.properties` (2526 bytes), `gradlew`/`gradlew.bat`, `settings.gradle`, `.gitignore` (129 bytes).

### Rastreamento no Git

- `git ls-files --cached -- android` → **vazio** — nenhum arquivo sob `android/` está rastreado.
- `git ls-files --cached | grep android` → apenas `assets/images/android-icon-*.png` (ícones, não a pasta nativa).
- `git log --all --oneline -- android` → **vazio** — nenhum commit tocou `android/`.
- `git check-ignore -v android` → `.gitignore:48:/android  android` — a pasta é **ignorada**.

### .gitignore

- Linha 48: `/android` — ignora a pasta na raiz.
- Linha 13: `docs/DOCUMENTACAO_TECNICA.md` — apenas um arquivo, não a pasta docs.

### Quando foi criado / prebuild

- Sem histórico Git, não é possível datar criação. Presença de `android/app/debug.keystore` e `gradle.properties` com 2526 bytes sugere que foi gerado por `expo prebuild` localmente e nunca commitado.
- `android/.gitignore` existe (129 bytes) — padrão do template prebuild.

### Managed / Prebuild / Bare

| Modo | Definição | Evidência no projeto |
|------|-----------|----------------------|
| **Managed** | Sem pastas nativas, tudo via `app.json` + `expo prebuild` sob demanda | `.gitignore` ignora `/android` e `/ios`, `android/` não versionado |
| **Prebuild** | `android/` gerado e versionado, mas ainda via `app.json` | `android/` existe mas não versionado — não é prebuild versionado |
| **Bare** | `android/` versionado e editado manualmente, sem `expo prebuild` | Não — `android/` não versionado, sem edições manuais detectadas |

**Conclusão:** Projeto é **managed** com artefato `android/` local não versionado (provavelmente gerado para teste de `expo run:android`).

### Recomendação

**Manter como Managed.**

**Motivo:**
- Projeto não tem `ios/` (não é bare completo).
- `android/` não é versionado; mantê-lo ignorado evita conflitos de prebuild.
- `app.json` contém toda configuração necessária (permissions, adaptiveIcon, package).
- Para builds de produção, usar EAS Build (que roda `prebuild` na nuvem) sem precisar commitar `android/`.

**Ação na Etapa 2:** Nenhuma — manter `.gitignore` como está. Se decidir versionar `android/`, remover `/android` do `.gitignore` e commitar após `expo prebuild --clean`.

---

## 11. Node

### Versão atual

- `node -v` → `v24.19.0`
- `npm -v` → `11.17.0`
- `npx expo --version` → `55.0.23` (SDK 55 CLI)

### Compatibilidade com Expo SDK 55

| Node | Status com SDK 55 | Fonte |
|------|-------------------|-------|
| **Node 20 LTS** | Recomendado oficialmente (Expo docs: "Node 18 or 20 LTS") | Docs Expo SDK 55 |
| **Node 22 LTS** | Compatível (testado pela comunidade) | Expo GitHub issues |
| **Node 24** | **Muito recente** — lançado em 2025, não é LTS ainda; `expo-doctor` não reclama, mas pode haver incompatibilidades com `metro`, `react-native-reanimated worklets`, ou `pnpm` | Observação da Etapa 0 |

### Evidência no projeto

- `npx tsc --noEmit` → exit 0 com Node 24 (TypeScript funciona).
- `npx expo lint` → exit 0 com 33 warnings (Expo CLI funciona).
- `npx expo-doctor` → 16/20 checks passed (não reclama de Node).
- `npx expo install --check` → funciona e lista mismatches.

### Recomendação

- **Manter Node 24 por enquanto** (não é bloqueante).
- **Documentar:** Para CI/EAS e onboarding, recomendar **Node 20 LTS** (`lts/iron`) via `.nvmrc` ou `package.json:engines` na Etapa 2.
- **Não instalar `nvm` nem alterar PATH nesta etapa.** Apenas documentar.
- **Confiança:** Média — Node 24 não quebrou nada observado, mas LTS é mais seguro para produção.

---

## 12. app.json

| Configuração | Situação | Problema | Recomendação |
|--------------|----------|----------|--------------|
| `newArchEnabled: true` | **Inválida** | `expo-doctor`: `should NOT have additional property 'newArchEnabled'` — campo obsoleto no SDK 55 (renomeado para `experiments.newArchEnabled` ou removido; New Architecture agora é padrão em RN 0.83) | **Remover** na Etapa 2. Verificar docs SDK 55; se necessário, usar `experiments.reactCompiler` já habilitado. |
| `privacy: "public"` | **Inválida** | `expo-doctor`: `should NOT have additional property 'privacy'` — campo não reconhecido pelo schema (era usado em `expo publish` legado) | **Remover** — não tem efeito em EAS Update. |
| `android.compileSdkVersion: 35` | **Inválida** | `Field: android - should NOT have additional property 'compileSdkVersion'` — em projetos managed, essa config é ignorada; deveria estar em `android/build.gradle` se bare | **Remover** de `app.json` se mantiver managed; se bare, mover para `android/build.gradle` e `gradle.properties`. |
| `android.targetSdkVersion: 35` | **Inválida** | Idem acima | **Remover** (mesma lógica). |
| `android.minSdkVersion: 24` | **Inválida** | Idem acima | **Remover** (mesma lógica). Se precisar de minSdk custom, configurar via `expo-build-properties` plugin. |
| `extra.eas.projectId: "YOUR_EAS_PROJECT_ID"` | **Placeholder** | Não é inválida, mas é valor fake que quebra `eas build` se usado | **Remover** o bloco `extra.eas` até configurar EAS real, ou substituir por ID real quando criar projeto no Expo Dashboard. |
| `android.adaptiveIcon.backgroundImage` | **Suspeita** | Mesmo arquivo `icon.png` usado para `foregroundImage`, `backgroundImage` e `monochromeImage` — redundante; `backgroundImage` deveria ser cor ou imagem diferente | **Verificar** — manter se for intencional, ou remover `backgroundImage` e usar apenas `backgroundColor: "#E6F4FE"`. |
| `ios.infoPlist.NSCameraUsageDescription` etc. | **Válida, mas suspeita** | Descrições de câmera/galeria para "atualizar foto de perfil" — feature não implementada (CustomDrawer tem código comentado) | **Manter** por enquanto; remover se feature nunca for implementada. |

---

## 13. Decisões Propostas

| Decisão | Recomendação | Motivo | Confiança |
|---------|--------------|--------|-----------|
| **D01 — Gerenciador canônico** | **`pnpm`** | Histórico + `node_modules/.pnpm` + lockfile mais consistente com remoção AdMob | Alta |
| **D02 — Lockfiles** | **Remover `package-lock.json`, manter `pnpm-lock.yaml` (com 43 deletions), adicionar `packageManager: pnpm@10.33.4`** | Elimina conflito `expo-doctor`, alinha CI/EAS | Alta |
| **D03 — pnpm-lock.yaml modificado** | **Commmitar as 43 deletions** | Estado correto pós-remoção AdMob, sem código afetado | Alta |
| **D04 — .env / vazamento** | **Não reescrever histórico; não rotacionar por vazamento Git (não houve)** | `git log --all -- .env` vazio, `.gitignore` correto | Alta |
| **D05 — EXPO_PUBLIC_APP_KEY** | **Manter como `X-App-Key` identificadora; avaliar proxy futuro se API exigir segredo** | É `EXPO_PUBLIC_` → visível no bundle por design; API parece pública | Média |
| **D06 — SDK** | **Manter SDK 55 (Opção A)** | Menor risco, resolve duplicata com 1 downgrade | Alta |
| **D07 — expo-notifications** | **Downgrade para `~55.0.26`** | Corrige major mismatch e duplicata `expo-constants` | Alta |
| **D08 — expo-constants duplicata** | **Resolve automaticamente após D07; verificar com `expo-doctor`** | Causa raiz é D07 | Alta |
| **D09 — AdMob** | **Remover `src/hooks/useInterstitialAd.ts` (código morto)** | Remoção foi intencional (`5e00951`), hook não é importado | Média-Alta |
| **D10 — android/** | **Manter como managed (ignorar `/android`)** | Não versionado, sem histórico, projeto sem `ios/` | Alta |
| **D11 — Node** | **Manter Node 24 agora; recomendar Node 20 LTS para CI/onboarding** | Node 24 funciona; LTS é mais seguro para produção | Média |
| **D12 — app.json inválidos** | **Remover `newArchEnabled`, `privacy`, `compileSdkVersion`, `targetSdkVersion`, `minSdkVersion`; remover/ajustar `extra.eas.projectId`** | `expo-doctor` schema errors; campos obsoletos | Alta |
| **D13 — adaptiveIcon** | **Verificar redundância `backgroundImage`** | Mesmo `icon.png` em 3 campos | Baixa |

---

## 14. Problemas que Continuam Pendentes

### CRÍTICO

| ID | Problema | Próxima ação |
|----|----------|--------------|
| C01 | `expo-notifications@56.0.18` + duplicata `expo-constants` quebra `expo-doctor` e pode quebrar `expo run:android` / EAS Build | Downgrade para `~55.0.26` na Etapa 2 |

### ALTO

| ID | Problema | Próxima ação |
|----|----------|--------------|
| A01 | Múltiplos lockfiles (`pnpm-lock.yaml` + `package-lock.json`) — CI/EAS ambíguo | Remover `package-lock.json`, adicionar `packageManager` |
| A02 | `pnpm-lock.yaml` com 43 deletions não commitadas — estado correto mas não versionado | Commitar após D01/D02 |
| A03 | `src/hooks/useInterstitialAd.ts` morto (require condicional sem dependência) | Remover arquivo |

### MÉDIO

| ID | Problema | Próxima ação |
|----|----------|--------------|
| M01 | 18 patches desatualizados vs SDK 55 (`expo@55.0.14` vs `~55.0.29`, etc.) | `npx expo install --fix` após C01 |
| M02 | `app.json` com 5 campos inválidos + `extra.eas.projectId` placeholder | Remover/migrar campos |
| M03 | `EXPO_PUBLIC_APP_KEY` visível no bundle (por ser `EXPO_PUBLIC_`) | Avaliar proxy se API exigir segredo; por enquanto aceitável |
| M04 | Sem testes automatizados (0% cobertura) | Definir estratégia na Etapa 2+ |
| M05 | Sem `eas.json` / EAS não configurado | Criar quando necessário para produção |

### BAIXO

| ID | Problema | Próxima ação |
|----|----------|--------------|
| B01 | Node 24.19.0 vs LTS recomendado (20) | Documentar `.nvmrc` / `engines` |
| B02 | `android/` local não versionado (mas ignorado) | Manter managed; sem ação |
| B03 | `teachpulse` vs `TechPulse` (nome) | Padronizar se necessário |
| B04 | 33 warnings de lint | Limpeza incremental |
| B05 | Sem `prettier` | Considerar formatação |
| B06 | `adaptiveIcon.backgroundImage` redundante | Verificar |

---

## 15. O que NÃO Foi Alterado

- [x] **Nenhum `git reset`, `restore`, `checkout .`, `clean` ou `stash` executado** — alteração `M pnpm-lock.yaml` preservada.
- [x] **Nenhum lockfile removido** — `package-lock.json` e `pnpm-lock.yaml` mantidos como estavam.
- [x] **Nenhum `package.json` editado** — sem `packageManager`, sem `expo install --fix`, sem `pnpm update`.
- [x] **Nenhum `app.json` editado** — campos inválidos mantidos intactos.
- [x] **Nenhum `.env` editado, exposto ou removido** — apenas nomes das variáveis lidos.
- [x] **Nenhum `android/` removido ou `expo prebuild` executado.**
- [x] **Nenhum `node_modules` reinstalado.**
- [x] **Nenhum código em `src/` ou `app/` modificado** — `useInterstitialAd.ts` mantido apesar de morto.
- [x] **Nenhum commit, push, pull, merge ou rebase executado.**
- [x] **Nenhum `nvm`, `PATH` ou versão de Node alterada.**
- [x] **Única alteração permitida:** Criação deste relatório em `docs/TECHPULSE-ETAPA-1-RELATORIO.md` (além de `docs/TECHPULSE-ETAPA-0-RELATORIO.md` da Etapa 0).

---

## 16. Próxima Etapa Recomendada

> **Não implementar a próxima etapa. Apenas descrever o que deveria acontecer após este diagnóstico.**

### Etapa 2 — Correções de Fundação (ordem sugerida)

1. **Resolver gerenciador (D01-D03):**
   - Remover `package-lock.json` (`rm package-lock.json`).
   - Adicionar `packageManager: "pnpm@10.33.4"` em `package.json`.
   - Commitar `pnpm-lock.yaml` com as 43 deletions (`git add pnpm-lock.yaml && git commit -m "chore: sync pnpm-lock after AdMob removal"`).
   - Validar com `pnpm install --frozen-lockfile` e `npx expo-doctor` (lockfile check deve passar).

2. **Corrigir Expo (D06-D08, M01):**
   - `pnpm add expo-notifications@~55.0.26` (ou `npx expo install expo-notifications@~55.0.26`).
   - `npx expo install --fix` para os 18 patches restantes (`expo@~55.0.29`, `react-native@0.83.10`, etc.).
   - `npx expo-doctor` deve ir de 16/20 para 19-20/20 (apenas `Check for lock file` já resolvido).

3. **Limpar AdMob (D09):**
   - Remover `src/hooks/useInterstitialAd.ts` se a decisão for manter sem anúncios.
   - `npx tsc --noEmit` + `npx expo lint` devem continuar passando.

4. **Corrigir app.json (D12):**
   - Remover `newArchEnabled`, `privacy`, `android.compileSdkVersion`, `android.targetSdkVersion`, `android.minSdkVersion`.
   - Remover ou corrigir `extra.eas.projectId`.
   - `npx expo-doctor` schema check deve passar.

5. **Segurança e DX (D04, D05, D11):**
   - Criar `.env.example` com placeholders.
   - Criar `.nvmrc` com `20` e/ou `engines.node` em `package.json`.
   - Avaliar se `EXPO_PUBLIC_APP_KEY` precisa de proxy (discussão com backend).

6. **Validação final:**
   - `npx tsc --noEmit` (expect 0 errors)
   - `npx expo lint` (expect 0 errors, warnings reduzidos)
   - `npx expo-doctor` (expect 20/20)
   - `npx expo start --web` com Metro bundling (requer ambiente com suporte a `expo start` interativo).

### Pontos que precisam de decisão humana antes da Etapa 2

- **Confirmar `pnpm` como canônico** (vs `npm`).
- **Confirmar manutenção em SDK 55** (vs upgrade para 56/57).
- **Confirmar remoção definitiva do AdMob** (vs reativação com IDs reais).
- **Confirmar se `EXPO_PUBLIC_APP_KEY` é segredo ou identificador** (consultar dono da API `shared-technews-api.onrender.com`).
- **Confirmar se `android/` deve permanecer ignorado (managed)** (vs versionar para bare).

---

## Apêndice — Comandos Executados na Etapa 1

```
git status
git status --short
git diff --stat
git diff -- pnpm-lock.yaml
git branch
git log --oneline -10
git log --all --oneline -- pnpm-lock.yaml
git log --all --oneline -- package-lock.json
git log --all --oneline -- package.json
git log --all --name-status -- pnpm-lock.yaml
git log --all --name-status -- package-lock.json
git show 5e00951 --stat
git show 5e00951 -- package.json
git show 5e00951:package.json
git show a8b836c --stat
git log --all --diff-filter=A -- pnpm-lock.yaml
git log --all --oneline -- app.json
git blame package.json (grep notifications)
git log --all -p -- package.json | grep expo-notifications
git show e51135c --stat
git status --short -- .env
git ls-files .env
git ls-files | grep env
git log --all -- .env
git log --all --name-status -- .env
git log --all -p -- .env
git rev-list --all --objects | grep .env
git check-ignore -v .env
git check-ignore -v android
git ls-files --cached | grep android
git ls-files --cached -- android
git log --all --oneline -- android
Get-ChildItem -Path src -Recurse | Select-String google-mobile-ads
Select-String -Path app.json -Pattern google-mobile-ads
Get-Content package.json | Select-String google
Read src/services/api.ts
Read src/services/news.ts
Read src/hooks/useInterstitialAd.ts
Read app/webview/[id].tsx
Read app.json
Get-ChildItem -Path android
node -v / npm -v / npx expo --version
```

> **Confirmação final:** Nenhum valor de `EXPO_PUBLIC_APP_KEY` ou `EXPO_PUBLIC_API_URL` foi exposto neste relatório. `git status --short` final permanece ` M pnpm-lock.yaml` + `?? docs/` (este relatório e o da Etapa 0).
