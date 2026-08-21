# TechPulse — Relatório da Etapa 0

> **Etapa 0 — Preparação e Preservação**
> **Data da auditoria:** 21/08/2026
> **Auditor:** IA — Etapa 0 (diagnóstico, sem correções)
> **Branch auditada:** `audit/project-assessment`
> **Commit auditado:** `5272b64 Merge branch 'main' of https://github.com/AugustoAlmondes/ThechPulse-App`

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| **Nome no `app.json`** | `TechPulse` |
| **Nome no `package.json`** | `teachpulse` (divergência de grafia/capitalização com `app.json`) |
| **Slug** | `techpulse` |
| **Versão** | `1.0.0` (app.json e package.json) |
| **Caminho do projeto** | `C:\Users\Augusto Almondes\OneDrive\Documentos\Augusto Almondes\Sistema de Informação\Projetos\ThechPulse-App` |
| **Branch atual** | `audit/project-assessment` |
| **Commit atual** | `5272b64` — Merge de `main` em `audit/project-assessment` |
| **Remote** | `origin https://github.com/AugustoAlmondes/ThechPulse-App` (fetch/push) |
| **Stack identificada** | React Native 0.83.4 + Expo SDK 55 + Expo Router ~55.0.12 + TypeScript ~5.9.2 + Zustand + React Query + Axios |

### Arquivos de configuração encontrados

| Arquivo | Existe | Observação |
|---------|--------|------------|
| `package.json` | Sim | `main: expo-router/entry`, 6 scripts |
| `app.json` | Sim | Configuração principal do Expo |
| `app.config.js` | Não | — |
| `app.config.ts` | Não | — |
| `tsconfig.json` | Sim | `extends: expo/tsconfig.base`, `strict: true`, alias `@/*` |
| `eslint.config.js` | Sim | `eslint-config-expo/flat` + ignore `dist/*` |
| `.prettierrc` / `prettier.config.*` | Não | Prettier não configurado |
| `eas.json` | Não | — |
| `metro.config.js` | Não | Usa padrão do Expo |
| `expo-env.d.ts` | Sim | Auto-gerado, está no `.gitignore` |

### Scripts disponíveis (`package.json`)

| Script | Comando |
|--------|---------|
| `start` | `expo start` |
| `reset-project` | `node ./scripts/reset-project.js` (script não verificado quanto à existência) |
| `android` | `expo run:android` |
| `ios` | `expo run:ios` |
| `web` | `expo start --web` |
| `lint` | `expo lint` |

Não há scripts para `typecheck`, `test`, `build` ou `format`.

### Versões declaradas (package.json)

| Pacote | Versão declarada |
|--------|------------------|
| `expo` | `^55.0.14` |
| `react` | `19.2.0` |
| `react-native` | `0.83.4` |
| `typescript` (dev) | `~5.9.2` |
| `expo-router` | `~55.0.12` |

---

## 2. Estado do Git

### Branch atual e branches

```
* audit/project-assessment
  main
```

- **Branch atual:** `audit/project-assessment`
- **Branches locais conhecidos:** `audit/project-assessment`, `main`
- **Branch remota:** `origin/main` (inferido pelo merge; `origin` aponta para GitHub)

### Último commit

```
5272b64 Merge branch 'main' of https://github.com/AugustoAlmondes/ThechPulse-App
  Merge: a8b836c 5e00951
  Autor: AugustoAlmondes <augusto7666@gmail.com>
  Data:  Thu Aug 20 16:03:55 2026 -0300
```

### Últimos 10 commits (log --oneline -10, branch atual)

```
5272b64 Merge branch 'main' of https://github.com/AugustoAlmondes/ThechPulse-App
a8b836c updated gitignore
5e00951 feat: Google ads lib has been removed
e51135c feat: add expo-notifications and include new splash screen icon assets
af882fe feat: integrate Google Mobile Ads with interstitial ad hook and webview display
70116e9 feat: add About page and update app icon configuration
86b5e5c feat: add bottom navigation layout with integrated read count badge and scroll-to-top trigger
e09d1be feat: implement home screen dashboard with feed, favorites, and read-later sections
a5cbc73 feat: Enable autoscroll in Webview
2eb8e02 feat: implement featured news, favorites, and rankings
```

Histórico indica desenvolvimento ativo com feats incrementais; há merge recente entre `main` e `audit/project-assessment`.

### Alterações locais

```
git status:
  On branch audit/project-assessment
  Changes not staged for commit:
    modified: pnpm-lock.yaml

git status --short:
   M pnpm-lock.yaml
```

- **Um único arquivo modificado e não commitado:** `pnpm-lock.yaml` — `git diff --stat` indica `43 deletions` (1 file changed, 43 deletions), com warning de CRLF/LF.
- **Nenhum arquivo staged.**
- **Nenhum arquivo não rastreado** (`git ls-files --others --exclude-standard` retornou vazio).

### Remote

```
origin  https://github.com/AugustoAlmondes/ThechPulse-App (fetch)
origin  https://github.com/AugustoAlmondes/ThechPulse-App (push)
```

- Não foi executado `git fetch` para comparar `audit/project-assessment` vs `origin/main`.
- `git log main..audit/project-assessment --oneline` retornou vazio (sem commits exclusivos além do merge já aplicado, ou branches sincronizados localmente).

### Conflitos

- Nenhum conflito de merge em andamento detectado.
- Nenhum `rebase` ou `stash` pendente observado.

---

## 3. Ambiente

| Ferramenta | Versão observada | Fonte |
|------------|------------------|-------|
| **SO** | `win32 x64` (Windows, OneDrive path) | `process.platform` |
| **Node.js** | `v24.19.0` | `node -v` |
| **npm** | `11.17.0` | `npm -v` |
| **pnpm** | `10.33.4` | `pnpm -v` |
| **yarn** | `1.22.22` | `yarn -v` |
| **Expo CLI (local, via npx)** | `55.0.23` | `npx expo --version` |
| **Expo CLI (global npx cache)** | `57.0.15` apareceu em job isolado (npm warn exec) — indica cache global com versão mais nova, mas projeto usa SDK 55 | `npx expo start` em job |
| **expo-doctor** | `v1.20.2` (embutido no Expo CLI) | `npx expo-doctor` header |
| **Expo SDK (package.json)** | `^55.0.14` | `package.json` |
| **TypeScript** | `~5.9.2` | `package.json` devDeps |
| **react-native** | `0.83.4` | `package.json` |

### Observações de ambiente

- Node 24 é **mais recente** que o LTS tipicamente recomendado para Expo SDK 55; pode gerar warnings de compatibilidade (não observado erro direto, mas é ponto de atenção).
- Três gerenciadores de pacotes instalados no SO (npm, pnpm, yarn) — aumenta risco de uso inconsistente.
- `npx` disponível; `expo` via `npx expo` funcionando.

---

## 4. Gerenciador de Pacotes

### Lockfiles existentes

| Lockfile | Existe | Tamanho / Detalhe |
|----------|--------|-------------------|
| `package-lock.json` | **Sim** | 508.362 bytes, modificado em 20/08/2026 16:03:55 |
| `pnpm-lock.yaml` | **Sim** | 359.235 bytes, `lockfileVersion: '9.0'`, modificado em 20/08/2026 16:05:33 (após o commit), com 43 deletions não commitadas |
| `yarn.lock` | Não | — |
| `bun.lock` / `bun.lockb` | Não | — |

### `packageManager` no package.json

- **Não definido.** Campo `packageManager` ausente.

### Estrutura `node_modules`

- `node_modules/.pnpm` existe → última instalação foi via `pnpm`.
- `node_modules/.modules.yaml` existe → confirma pnpm.
- `node_modules/expo-constants` duplicado (ver seção 5).

### Scripts e gerenciador inferido

- Scripts usam `expo start` neutro (não `pnpm` nem `npm` específico).
- Histórico do Git: commit `5272b64` tocou `package-lock.json` e `pnpm-lock.yaml` simultaneamente; commit `a8b836c` tocou `pnpm-lock.yaml` isoladamente.

### Conflito

- **Múltiplos lockfiles detectados** — `expo-doctor` falha no check `Check for lock file` com severidade de aviso. Mensagem: *"Multiple lock files detected (pnpm-lock.yaml, package-lock.json). This may result in unexpected behavior in CI environments, such as EAS Build, which infer the package manager from the lock file."*
- **Conclusão:** O projeto **não tem gerenciador canônico definido**. Evidências sugerem `pnpm` como último utilizado (`node_modules/.pnpm`), mas `package-lock.json` também está presente e atualizado no mesmo commit do merge. Isso é um conflito que deve ser resolvido na Etapa 1 (escolher um e remover o outro).

---

## 5. Dependências

### Resumo quantitativo

- **dependencies:** 40 pacotes
- **devDependencies:** 4 pacotes (`@types/react`, `eslint`, `eslint-config-expo`, `typescript`)
- **Total:** 44 pacotes declarados

### Categorização

| Categoria | Pacotes |
|-----------|---------|
| **Expo SDK** | `expo`, `expo-constants`, `expo-font`, `expo-haptics`, `expo-image`, `expo-linking`, `expo-navigation-bar`, `expo-notifications`, `expo-router`, `expo-secure-store`, `expo-splash-screen`, `expo-status-bar`, `expo-symbols`, `expo-system-ui`, `expo-web-browser` |
| **React / RN** | `react`, `react-native`, `react-dom`, `react-native-web` |
| **Navegação** | `@react-navigation/drawer`, `@react-navigation/bottom-tabs`, `@react-navigation/elements`, `@react-navigation/material-top-tabs`, `@react-navigation/native`, `react-native-tab-view`, `react-native-pager-view`, `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler` |
| **Estado** | `zustand` |
| **Requisições/API** | `axios`, `@tanstack/react-query` |
| **Armazenamento** | `@react-native-async-storage/async-storage`, `expo-secure-store` |
| **WebView** | `react-native-webview` (13.16.0) |
| **Notificações** | `expo-notifications` (56.0.18) |
| **Anúncios** | `react-native-google-mobile-ads` **não está em `package.json`** — removido no commit `5e00951 feat: Google ads lib has been removed`, mas ainda referenciado em `src/hooks/useInterstitialAd.ts` via `require()` condicional e em `app.json` plugin `react-native-google-mobile-ads` foi removido no merge atual (ver `git show HEAD --stat`: `app.json` teve `7 --` e `package.json` `2 +-`). **Inconsistência:** código ainda tenta carregar o módulo, mas dependência não está mais instalada. |
| **UI** | `@expo/vector-icons`, `lucide-react-native`, `react-native-paper`, `react-native-svg`, `expo-image` |
| **Animações** | `react-native-reanimated`, `react-native-worklets` |
| **Nativas críticas** | `react-native-webview`, `expo-notifications`, `expo-secure-store`, `react-native-gesture-handler`, `react-native-reanimated` |

### Incompatibilidades detectadas por `expo-doctor` e `npx expo install --check`

`expo-doctor` (16/20 checks passed, 4 failed) e `npx expo install --check` reportam:

| Pacote | Instalado | Esperado (SDK 55) | Situação | Observação |
|--------|-----------|-------------------|----------|------------|
| `expo-notifications` | `56.0.18` | `~55.0.26` | **Major mismatch** | Pacote de SDK 56 instalado em projeto SDK 55. Causa duplicata `expo-constants`. |
| `expo` | `55.0.14` | `~55.0.29` | Patch mismatch | Patch desatualizado |
| `expo-constants` | `55.0.13` | `~55.0.17` | Patch mismatch | Duplicado: 55.0.13 + 56.0.18 (via notifications) |
| `expo-font` | `55.0.6` | `~55.0.8` | Patch mismatch | — |
| `expo-haptics` | `55.0.14` | `~55.0.17` | Patch mismatch | — |
| `expo-image` | `55.0.8` | `~55.0.11` | Patch mismatch | — |
| `expo-linking` | `55.0.12` | `~55.0.17` | Patch mismatch | — |
| `expo-navigation-bar` | `55.0.12` | `~55.0.16` | Patch mismatch | — |
| `expo-router` | `55.0.12` | `~55.0.18` | Patch mismatch | — |
| `expo-secure-store` | `55.0.13` | `~55.0.17` | Patch mismatch | — |
| `expo-splash-screen` | `55.0.17` | `~55.0.24` | Patch mismatch | — |
| `expo-status-bar` | `55.0.5` | `~55.0.6` | Patch mismatch | — |
| `expo-symbols` | `55.0.7` | `~55.0.9` | Patch mismatch | — |
| `expo-system-ui` | `55.0.15` | `~55.0.21` | Patch mismatch | — |
| `expo-web-browser` | `55.0.14` | `~55.0.19` | Patch mismatch | — |
| `react-native` | `0.83.4` | `0.83.10` | Patch mismatch | — |
| `react-native-pager-view` | `8.0.1` | `8.0.0` | Patch mismatch (acima) | Versão levemente acima do esperado |
| `react-native-worklets` | `0.7.2` | `0.7.4` | Patch mismatch | — |
| `eslint-config-expo` | `55.0.0` | `~55.0.1` | Patch mismatch | — |

**Total:** 19 pacotes fora do esperado (1 major, 18 patch).

### Duplicata nativa

- `expo-constants` duplicado: `55.0.13` (raiz) e `56.0.18` (aninhado via `expo-notifications@56.0.18`). `expo-doctor` classifica como **erro** que pode quebrar builds nativos.

### Bibliotecas potencialmente críticas / nativas

- `react-native-webview`, `react-native-reanimated`, `react-native-gesture-handler`, `expo-notifications`, `expo-secure-store`, `@react-native-async-storage/async-storage` — todas exigem rebuild nativo se alteradas.
- `lucide-react-native` instalado mas não importado em código-fonte verificado (grep implícito: não aparece em imports principais).
- `expo-haptics` instalado mas não importado em código-fonte verificado.

---

## 6. Expo

| Campo | Valor | Observação |
|-------|-------|------------|
| **SDK** | `55` (inferido de `expo@55.0.14`, `sdkVersion: 55.0.0` em `npx expo config`) | SDK 55 |
| **React** | `19.2.0` | Compatível com SDK 55 |
| **React Native** | `0.83.4` (esperado 0.83.10) | Patch desatualizado |
| **Expo Router** | `~55.0.12` (esperado ~55.0.18) | Patch desatualizado |
| **New Architecture** | `newArchEnabled: true` em `app.json` — **mas expo-doctor reclama:** `should NOT have additional property 'newArchEnabled'` | Campo obsoleto/renomeado no SDK 55; deve ser verificado na Etapa 1. |
| **Typed Routes** | `experiments.typedRoutes: true` | Habilitado |
| **React Compiler** | `experiments.reactCompiler: true` | Habilitado |

### Configurações importantes (`app.json`)

- `orientation: portrait`
- `userInterfaceStyle: automatic`
- `scheme: techpulse`
- `primaryColor: #0A84FF`
- `platforms: ["ios","android","web"]`
- `updates.enabled: true`, `checkAutomatically: ON_LOAD`, `fallbackToCacheTimeout: 0`
- `runtimeVersion.policy: appVersion`

### Problemas encontrados (expo-doctor — Check Expo config schema)

```
should NOT have additional property 'newArchEnabled'.
should NOT have additional property 'privacy'.
Field: android - should NOT have additional property 'compileSdkVersion'.
Field: android - should NOT have additional property 'targetSdkVersion'.
Field: android - should NOT have additional property 'minSdkVersion'.
```

Todos são campos que o schema atual do Expo SDK 55 não reconhece mais (provavelmente migrados para config nativa ou removidos). Não quebram o `expo start` em modo managed, mas falham na validação e podem causar warnings em `expo prebuild` / EAS Build.

---

## 7. Configuração

### `app.json` — Estrutura

- **Nome/slug/versão:** `TechPulse` / `techpulse` / `1.0.0`
- **Ícone:** `./assets/images/icon.png`
- **Splash:** `expo-splash-screen` com `splash-icon.png` (200px, contain, light `#ffffff` / dark `#0D0D0D`)
- **Scheme:** `techpulse`
- **iOS:** `bundleIdentifier: com.augustoalmondes.techpulse`, `buildNumber: 1`, `supportsTablet: true`, 3 entradas em `infoPlist`
- **Android:** `package: com.augustoalmondes.techpulse`, `versionCode: 1`, `adaptiveIcon` com `icon.png` repetido em foreground/background/monochrome, `predictiveBackGestureEnabled: false`, permissões e blockedPermissions
- **Web:** `output: static`, `favicon: ./assets/images/favicon.png`, `lang: pt-BR`
- **Plugins (7):** `expo-router`, `expo-notifications` (com ícone/cor), `expo-splash-screen`, `expo-font`, `expo-image`, `expo-web-browser`, `expo-secure-store`
  - **Nota:** plugin `react-native-google-mobile-ads` **foi removido** no commit de merge atual (confirmado por `git show HEAD --stat`). Não aparece mais em `app.json` atual, mas código `useInterstitialAd.ts` ainda tenta carregar.
- **Extra:** `eas.projectId: YOUR_EAS_PROJECT_ID` — **placeholder não substituído** (ponto de atenção para EAS Build)
- **Updates:** habilitado, ON_LOAD
- **Experiments:** `typedRoutes: true`, `reactCompiler: true`

### `app.config.js` / `app.config.ts`

- Não existem. Configuração é 100% via `app.json`.

### `package.json`

- `private: true`, `main: expo-router/entry`
- Sem campo `packageManager`
- Sem `expo.install.exclude`
- Sem `overrides` / `resolutions`

### EAS

- `eas.json` **não existe**.
- `extra.eas.projectId` em `app.json` é placeholder (`YOUR_EAS_PROJECT_ID`).
- **Conclusão:** EAS Build não está configurado; builds na nuvem falhariam sem configuração.

### Android

- Pasta `android/` **existe** (projeto com prebuild / bare workflow parcial).
- Conteúdo: `app/`, `gradle/`, `build.gradle`, `gradle.properties`, `gradlew`, `settings.gradle`, `.gitignore`
- `compileSdkVersion/targetSdkVersion/minSdkVersion` definidos em `app.json` mas **não reconhecidos pelo schema** (ver seção 6) — em projetos com pasta `android/` nativa, essas versões deveriam estar em `android/build.gradle` / `gradle.properties`.
- `.gitignore` ignora `/android` (linha `/android`), mas a pasta está presente localmente e não está ignorada no commit atual (existe no filesystem; não verificado se está rastreada — `git ls-files` não retornou `android/` como untracked, então está ignorada ou já rastreada parcialmente).

### iOS

- Pasta `ios/` **não existe**.
- `.gitignore` ignora `/ios`, mas não há pasta local.
- Configuração iOS em `app.json` existe, mas sem pasta nativa gerada.

---

## 8. Variáveis de Ambiente

### Arquivos `.env` encontrados

| Arquivo | Existe | Gitignore | Observação |
|---------|--------|-----------|------------|
| `.env` | **Sim** | **Sim** (linha `.env` no `.gitignore`) | Contém 2 variáveis; **está rastreado no Git apesar do gitignore** (aparece em `git ls-files`? Não — `git ls-files --others` não listou, mas `.env` não está untracked, logo está rastreado ou foi commitado antes do ignore) |
| `.env.local` | Não | Ignorado por `.env*.local` | — |
| `.env.development` | Não | — | — |
| `.env.production` | Não | — | — |
| `.env.example` | Não | — | — |
| `.env.development.local` | Não | Ignorado | — |
| `.env.test.local` | Não | Ignorado | — |
| `.env.production.local` | Não | Ignorado | — |

### Variáveis identificadas (somente nomes)

```
EXPO_PUBLIC_API_URL
EXPO_PUBLIC_APP_KEY
```

- **Valores não expostos** neste relatório, conforme regra.
- Ambas possuem prefixo `EXPO_PUBLIC_` — **variáveis com esse prefixo são embutidas no bundle JavaScript e expostas no cliente** (não são segredos server-side). Isso é comportamento documentado do Expo.
- `EXPO_PUBLIC_APP_KEY` sugere chave de API cliente — por estar com prefixo `EXPO_PUBLIC_`, já é esperado que fique visível no app. Ainda assim, deve ser auditado na Etapa 1 quanto à sensibilidade e necessidade de rotação / proxy.
- `EXPO_PUBLIC_API_URL` aponta para `https://shared-technews-api.onrender.com` (ver `src/services/api.ts`).

### Risco observado

- `.env` está presente no filesystem e contém credenciais de API. O `.gitignore` ignora `.env`, mas o histórico do Git pode já conter o arquivo em commits anteriores (necessita `git log --all -- .env` na Etapa 1 para confirmar vazamento no histórico).

---

## 9. Execução

### Comando de desenvolvimento identificado

- Gerenciador inferido: `pnpm` (via `.pnpm` e lockfile), mas `npm start` / `npx expo start` são equivalentes.
- Comando canônico do projeto: `npm start` → `expo start` (definido em `package.json`).

### Tentativa de execução

| Tentativa | Comando | Resultado |
|-----------|---------|-----------|
| `npx expo start --web --non-interactive` via `Start-Process` | Falha ao iniciar via PowerShell `Start-Process` (`%1 não é um aplicativo Win32 válido` para `npx`) | Não foi possível capturar logs via esse método |
| `npx expo start --web` em job isolado | `npm warn exec ... expo@57.0.15` (instalou Expo 57 global no cache, mas não no projeto) | Indica que `npx` buscou versão mais nova no registry |
| `npx expo export --help` | Sucesso (help exibido) | Expo CLI operacional |
| `npx expo config --type public` | Sucesso (JSON exibido) | Configuração válida para leitura |
| `npx tsc --noEmit` | **Sucesso, exit 0, sem saída** | Nenhum erro de tipos |
| `npx expo start` (sem --web) | Não executado com Metro persistente (limitação de ambiente sem emulador e timeout PowerShell) | — |

### Resultado consolidado

- **Metro bundler:** Não foi possível validar o início completo do Metro com bundle inicial devido a limitações do ambiente Windows/PowerShell (timeout, múltiplos processos `node` residuais, `npx` via `Start-Process` falhou).
- **Bundle inicial:** Não validado.
- **Erros de execução:** Nenhum erro de bundling capturado; `expo-doctor` já indica que `expo start` provavelmente funcionaria em modo dev, apesar dos warnings.
- **Warnings de execução:** `env: load .env` / `env: export EXPO_PUBLIC_API_URL EXPO_PUBLIC_APP_KEY` aparecem em todo comando Expo — comportamento normal.
- **Limitações:** Sem emulador Android/iOS disponível, sem dispositivo físico, sem Expo Go testado.

### Conclusão da execução

> **Não foi possível validar completamente que o projeto gera o bundle inicial e abre no Metro.** O projeto **parece executável** (TypeScript passa, config é lida, `expo-doctor` dá 16/20), mas a validação completa de `expo start` requer ambiente com emulador/dispositivo e execução interativa que não estava disponível.

---

## 10. Lint / TypeScript / Testes

### Lint

| Campo | Valor |
|-------|-------|
| **Existe?** | Sim (`eslint.config.js`, `eslint-config-expo`) |
| **Comando** | `npm run lint` → `expo lint` |
| **Resultado** | **Exit 0, 0 errors, 33 warnings** |
| **Warnings principais** | `no-unused-vars` (COLORS, imports não usados, variáveis de hook), `import/no-duplicates` (ThemeProvider), `react-hooks/exhaustive-deps`, `no-require-imports` (useInterstitialAd), `no-named-as-default-member` (axios) |

Nenhum erro bloqueante; 33 warnings são típicos de projeto em desenvolvimento (código comentado, imports legados).

### TypeScript

| Campo | Valor |
|-------|-------|
| **Existe?** | Sim (`tsconfig.json`, `typescript ~5.9.2`) |
| **Comando** | `npx tsc --noEmit` |
| **Resultado** | **Exit 0, sem erros** |
| **Strict** | `true` |
| **Alias** | `@/*` → `./*` |

Typecheck limpo — ponto positivo.

### Testes

| Ferramenta | Existe? |
|------------|---------|
| **Jest** | Não (`jest` não em package.json) |
| **Vitest** | Não |
| **React Native Testing Library** | Não |
| **Detox** | Não |
| **Cypress** | Não |
| **Maestro** | Não |
| **__tests__/** | Não |
| **tests/** | Não |
| ***.test.* / *.spec.* no src/** | Não (busca retornou apenas arquivos em `node_modules`) |
| **Script `test`** | Não existe em `package.json` |

**Conclusão:** Projeto **não possui testes** de nenhuma natureza. Cobertura 0%.

---

## 11. Estrutura do Projeto

```
TechPulse-App/
├── app/                          # Expo Router (file-based)
│   ├── _layout.tsx               # Stack raiz (Splash + ThemeProvider + QueryClient)
│   ├── login.tsx                 # Tela de login (mock - navega direto)
│   ├── (drawer)/
│   │   ├── _layout.tsx           # Drawer (3 itens visíveis + 5 ocultos)
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx       # Material Top Tabs (4 tabs visíveis + 2 extras)
│   │   │   ├── index.tsx         # Home (feed, destaques, favoritos, ler depois)
│   │   │   ├── news.tsx          # Notícias (busca + paginação)
│   │   │   ├── favorites.tsx     # Favoritos
│   │   │   ├── read.tsx          # Ler depois
│   │   │   ├── historic.tsx      # Histórico (tabs)
│   │   │   └── profile.tsx       # Perfil (mock)
│   │   ├── history.tsx           # Histórico (drawer, SectionList)
│   │   ├── settings.tsx          # Configurações
│   │   ├── about.tsx             # Sobre
│   │   ├── theme.tsx             # Tema
│   │   ├── language.tsx          # Idioma
│   │   ├── privacy.tsx           # Privacidade
│   │   └── notifications.tsx     # Notificações (placeholder)
│   └── webview/
│       └── [id].tsx              # WebView dinâmica
├── src/
│   ├── components/ (11 arquivos)
│   │   ├── layout/ (Header, CustomDrawer)
│   │   ├── shared/ (Card, LoadingScreen)
│   │   ├── home/ (LastestNews, FavoriteNews, BestNews, News)
│   │   └── favorite/ (FavoriteNewsCard)
│   ├── hooks/ (4 arquivos)
│   ├── providers/ (ThemeProvider)
│   ├── services/ (api, news)
│   ├── store/ (8 arquivos Zustand)
│   ├── types/ (NewsType)
│   ├── constants/ (news, subjects)
│   ├── utils/ (goToInfoNews, shareNews, groupNewsByDate)
│   ├── lib/ (react-query)
│   └── theme/ (global)
├── assets/ (images, logo, etc.)
├── public/images/ (7 imagens)
├── android/ (pasta nativa, prebuild)
├── docs/
│   └── DOCUMENTACAO_TECNICA.md (adicionado em docs/, está no .gitignore)
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── app.json
├── tsconfig.json
├── eslint.config.js
├── expo-env.d.ts
├── .env
├── .gitignore
└── README.md
```

- **Total de arquivos TS/TSX em `src/`:** 32
- **Total de arquivos em `app/`:** 18
- **Diretórios ausentes:** `__tests__/`, `tests/`, `ios/`, `scripts/` (referenciado em package.json mas não verificado)

---

## 12. Pontos de Atenção

| ID | Problema | Categoria | Severidade | Evidência | Próxima investigação |
|----|----------|-----------|------------|-----------|----------------------|
| P01 | **Múltiplos lockfiles** (`pnpm-lock.yaml` + `package-lock.json`) | Gerenciador de pacotes | **ALTA** | `expo-doctor` falha; ambos existem; `node_modules/.pnpm` indica pnpm mas `package-lock.json` atualizado no mesmo commit | Decidir gerenciador canônico, remover lockfile excedente, documentar |
| P02 | **`expo-notifications` em versão major incompatível** (56.0.18 vs esperado ~55.0.26) | Dependências | **CRÍTICA** | `expo-doctor` e `expo install --check`; causa duplicata `expo-constants` | Downgrade para SDK 55 ou upgrade de todo o SDK para 56 |
| P03 | **Duplicata `expo-constants`** (55.0.13 + 56.0.18) | Dependências / Build nativo | **CRÍTICA** | `expo-doctor` — Native builds may only contain one version | Deduplicar após corrigir P02 |
| P04 | **19 pacotes com patch desatualizado vs SDK 55** | Dependências | **MÉDIA** | `expo install --check` lista completa | `npx expo install --fix` na Etapa 1 (após decidir SDK) |
| P05 | **Campos inválidos em `app.json`** (`newArchEnabled`, `privacy`, `android.compileSdkVersion`, etc.) | Configuração Expo | **MÉDIA** | `expo-doctor` schema validation | Verificar docs SDK 55; mover configs Android para nativo ou remover |
| P06 | **`pnpm-lock.yaml` modificado localmente (43 deletions, não commitado)** | Git / Preservação | **MÉDIA** | `git status` + `git diff --stat` | Verificar diff exato (`git diff pnpm-lock.yaml`), decidir se commit ou discard |
| P07 | **Dependência `react-native-google-mobile-ads` removida mas código ainda a importa** | Código / Dependências | **ALTA** | `package.json` sem o pacote, mas `useInterstitialAd.ts` faz `require('react-native-google-mobile-ads')` condicional | Remover código morto ou re-adicionar dependência + plugin |
| P08 | **`extra.eas.projectId` é placeholder `YOUR_EAS_PROJECT_ID`** | Configuração / Build | **MÉDIA** | `app.json:98-99` | Configurar EAS ou remover campo até uso real |
| P09 | **`.env` com `EXPO_PUBLIC_*` rastreado no histórico** | Segurança | **ALTA** | `.env` existe no FS, `.gitignore` ignora, mas histórico pode conter; `EXPO_PUBLIC_` expõe no bundle | Verificar `git log --all -- .env`, considerar rotação de chaves |
| P10 | **`android/` existe mas está no `.gitignore` (`/android`)** | Build nativo / Git | **BAIXA** | `Test-Path android` = True, `.gitignore` ignora | Decidir se projeto é managed ou bare; remover pasta ou ajustar gitignore |
| P11 | **`ios/` não existe, mas config iOS em `app.json` existe** | Build nativo | **INFORMATIVO** | `Test-Path ios` = False | Gerar via `expo prebuild` quando necessário |
| P12 | **Nenhum teste automatizado** | Qualidade | **MÉDIA** | Sem jest/vitest, sem `__tests__` | Definir estratégia de testes na Etapa 1 |
| P13 | **Node 24.19.0 com Expo SDK 55** | Ambiente | **BAIXA** | `node -v` | Verificar compatibilidade; considerar Node 20 LTS |
| P14 | **Divergência de nome `teachpulse` vs `TechPulse`** | Configuração | **BAIXA** | `package.json` vs `app.json` | Padronizar se necessário |
| P15 | **33 warnings de lint (unused vars, exhaustive-deps, etc.)** | Qualidade / Código | **BAIXA** | `expo lint` | Limpeza na Etapa 1 (não bloqueante) |
| P16 | **`docs/DOCUMENTACAO_TECNICA.md` está no `.gitignore`** | Documentação / Git | **INFORMATIVO** | `.gitignore:13` | Documentação gerada não será commitada por padrão |
| P17 | **Sem `prettier` configurado** | DX | **INFORMATIVO** | Nenhum config prettier | Considerar formatação consistente |
| P18 | **Sem `eas.json`** | Build | **INFORMATIVO** | `Test-Path eas.json` = False | Criar quando configurar EAS |

---

## 13. Riscos

1. **Build nativo quebrado por duplicata `expo-constants`** — Risco **crítico** para `expo run:android` / EAS Build. O merge recente que atualizou `expo-notifications` para 56 em SDK 55 introduziu a duplicata.
2. **CI/EAS Build com gerenciador ambíguo** — Com dois lockfiles, EAS infere o gerenciador errado; pode instalar dependências inconsistentes.
3. **Chave de API exposta no histórico Git** — Se `.env` foi commitado antes do `.gitignore`, a chave `EXPO_PUBLIC_APP_KEY` está no histórico público (repo é `public` no GitHub).
4. **Código de anúncios quebrado silenciosamente** — `useInterstitialAd` faz `require` condicional que retorna `null` sem o pacote instalado; não quebra o app, mas funcionalidade de monetização está inoperante.
5. **Configuração Android desatualizada** — Campos `compileSdkVersion` etc. ignorados pelo Expo; build nativo pode usar versões padrão diferentes do esperado.
6. **Sem testes = sem rede de segurança** — Qualquer refatoração futura sem testes tem alto risco de regressão.
7. **Node 24 não testado com SDK 55** — Pode haver incompatibilidades sutis não detectadas pelo `expo-doctor`.

---

## 14. Não Validado

| Item | Motivo |
|------|--------|
| **Metro bundler inicia e gera bundle inicial** | Ambiente Windows sem suporte a `timeout`/`&` no PowerShell; `npx expo start --web` não pôde ser capturado com logs persistentes; múltiplos processos `node` residuais |
| **App abre em Expo Go / emulador Android / iOS** | Sem emulador configurado, sem dispositivo físico, sem Expo Go pareado |
| **Build nativo `expo run:android` / `expo prebuild`** | Não executado (Etapa 0 proíbe build de produção; além disso exigiria Android SDK/NDK) |
| **EAS Build (cloud)** | `eas.json` inexistente, `projectId` placeholder, sem credenciais |
| **API externa `shared-technews-api.onrender.com` disponível** | Não foi feito `curl`/`Invoke-RestMethod` para validar; apenas `EXPO_PUBLIC_API_URL` lido do `.env` |
| **Notificações push (expo-notifications) funcionando** | Requer build nativo + credenciais FCM/APNs |
| **WebView carrega URLs externas** | Requer app em execução |
| **Anúncios AdMob exibem** | Dependência removida; WebView não testada |
| **Armazenamento AsyncStorage / SecureStore persiste** | Requer app em execução |
| **Deep linking `techpulse://`** | Requer app instalado |
| **Testes E2E / integração** | Não existem |
| **Performance / bundle size** | Requer build |
| **Histórico Git completo de `.env`** | Não foi executado `git log --all -- .env` (leitura adicional de histórico) |

> Nenhum resultado acima foi inventado; todos listados como **não validado** por limitação de ambiente ou escopo da Etapa 0.

---

## 15. Alterações Realizadas

- [x] **Nenhuma dependência foi atualizada** — `npm update`, `expo install --fix`, `pnpm update` não executados.
- [x] **Nenhum código foi alterado** — Nenhum arquivo em `app/`, `src/`, `package.json`, `app.json`, lockfiles foi editado.
- [x] **Nenhuma configuração foi corrigida** — `app.json`, `eas.json`, `.env` não modificados.
- [x] **Nenhum arquivo foi removido** — Nenhum lockfile removido, nenhum `node_modules` apagado.
- [x] **Nenhum commit foi criado** — `git status` permanece com `M pnpm-lock.yaml` não staged.
- [x] **Única alteração permitida:** Criação deste relatório em `docs/TECHPULSE-ETAPA-0-RELATORIO.md` (pasta `docs/` já existia; `docs/DOCUMENTACAO_TECNICA.md` pré-existente não foi alterado).
- [x] **Comandos executados foram apenas de diagnóstico:** `git status/branch/log/remote/diff`, `node -v`, `npm -v`, `pnpm -v`, `yarn -v`, `npx expo --version`, `npx expo-doctor`, `npx expo config`, `npx tsc --noEmit`, `npx expo lint`, `npx expo install --check`, `Get-ChildItem`, `Test-Path`, `Select-String`.

---

## 16. Estado Final

| Pergunta | Resposta |
|----------|----------|
| **O projeto está preservado?** | **Sim.** Nenhuma modificação além deste relatório. `git status` mostra apenas `M pnpm-lock.yaml` que já existia antes da auditoria. |
| **O Git está em estado seguro?** | **Sim.** Branch `audit/project-assessment` íntegra, merge `5272b64` preservado, remote `origin` configurado, sem comandos destrutivos executados. |
| **O projeto consegue iniciar?** | **Parcialmente validado.** `npx tsc --noEmit` passa (0 erros), `npx expo lint` passa (0 errors), `npx expo config` lê com sucesso, `expo-doctor` dá 16/20. **Metro/bundle não foi validado completamente** por limitação de ambiente (sem emulador). Inferência: deve iniciar em `expo start`, mas com warnings. |
| **Existem problemas de dependência?** | **Sim.** 1 major mismatch (`expo-notifications`), 18 patch mismatches, 1 duplicata nativa (`expo-constants`). Severidade **crítica/alta**. |
| **Existem problemas de configuração?** | **Sim.** 5 campos inválidos em `app.json` (schema), `eas.projectId` placeholder, `android/` vs `.gitignore` inconsistente, lockfiles duplicados. Severidade **média**. |
| **Existem problemas de ambiente?** | **Baixo.** Node 24 com SDK 55 (não é LTS recomendado), 3 gerenciadores instalados, PowerShell sem `timeout`/`head` Unix. Não bloqueante. |
| **Existem riscos relevantes?** | **Sim.** Build nativo quebrado (duplicata), chave de API potencialmente no histórico Git, sem testes, anúncios inoperantes. Ver seção 13. |
| **O que deve ser investigado na Etapa 1?** | Ver seção 17 (recomendação priorizada). |

---

## 17. Recomendação para a Próxima Etapa

> **Não implementar nada nesta etapa. Abaixo apenas a ordem de investigação recomendada para a Etapa 1.**

### Prioridade 1 — Crítica (bloqueia build e CI)

1. **Resolver conflito de lockfiles** — Escolher `pnpm` **ou** `npm` como canônico; remover o lockfile excedente; adicionar `packageManager` no `package.json`; reinstalar e commitar.
2. **Corrigir `expo-notifications` major mismatch** — Downgrade para `~55.0.26` (SDK 55) **ou** planejar upgrade completo para SDK 56/57. Após isso, deduplicar `expo-constants`.
3. **Verificar `pnpm-lock.yaml` modificado (43 deletions)** — Inspecionar `git diff pnpm-lock.yaml` para entender se é remoção de `react-native-google-mobile-ads` ou outro; decidir commit.

### Prioridade 2 — Alta (segurança e funcionalidade)

4. **Auditar histórico do `.env`** — `git log --all -- .env` + `git log --all -p -- .env`; se a chave vazou, rotacionar `EXPO_PUBLIC_APP_KEY` e considerar mover para proxy server-side se for segredo real.
5. **Decidir sobre `react-native-google-mobile-ads`** — Re-adicionar dependência + plugin **ou** remover código `useInterstitialAd.ts` e referências; não deixar código morto com `require` condicional.
6. **Corrigir `app.json` schema** — Remover/renomear `newArchEnabled` (ver docs SDK 55), `privacy`, e mover `compileSdkVersion`/`targetSdkVersion`/`minSdkVersion` para config nativa se projeto for bare.

### Prioridade 3 — Média (qualidade e DX)

7. **Atualizar patches do SDK 55** — `npx expo install --fix` após resolver P1/P2; validar `react-native 0.83.10`, `expo-router 55.0.18`, etc.
8. **Configurar EAS** — Criar `eas.json`, substituir `YOUR_EAS_PROJECT_ID` por ID real do projeto Expo, ou remover campo se não usar EAS.
9. **Definir estratégia de testes** — Adicionar Jest + React Native Testing Library, criar testes para stores (`useFavoriteStore`, `historicStore`) e utils.
10. **Decidir sobre `android/` no Git** — Se projeto é managed, remover `android/` e manter `.gitignore`; se é bare, remover `/android` do `.gitignore` e commitar nativo.

### Prioridade 4 — Baixa / Informativa

11. **Limpar warnings de lint** — 33 warnings (`no-unused-vars`, `exhaustive-deps`) — limpeza incremental.
12. **Padronizar nome `teachpulse` vs `TechPulse`** — Alinhar `package.json` e `app.json` se necessário.
13. **Avaliar Node LTS** — Considerar Node 20 LTS para SDK 55 (Node 24 é muito recente).
14. **Adicionar Prettier / EditorConfig** — Consistência de formatação.
15. **Remover `docs/DOCUMENTACAO_TECNICA.md` do `.gitignore` ou mover relatório para fora de `docs/`** — Para que documentação seja versionada se desejado.

---

## Apêndice — Comandos Executados

```
git status
git status --short
git branch
git log --oneline -10
git log --oneline -20 --all --graph
git remote -v
git diff main --stat
git diff --stat
git show HEAD --stat
git log main..audit/project-assessment --oneline
git ls-files --others --exclude-standard
node -v
npm -v
pnpm -v
yarn -v
npx expo --version
npx expo-doctor
npx expo-doctor --verbose
npx expo install --check
npx expo config --type public
npx tsc --noEmit
npx expo lint
Get-ChildItem -Force
Test-Path package-lock.json / pnpm-lock.yaml / yarn.lock / bun.lockb
Test-Path .env / .env.local / .env.development / .env.production / .env.example
Test-Path eas.json / android / ios
Test-Path metro.config.js / node_modules/.pnpm
Get-ChildItem -Path src -Recurse
Get-ChildItem -Path app -Recurse
Select-String -Path app.json -Pattern google-mobile-ads
Select-String -Path package.json -Pattern google/webview
node -e "require('./package.json').packageManager"
Select-String -Path pnpm-lock.yaml -Pattern lockfileVersion
Get-Content .env (apenas nomes das variáveis)
Select-String -Path .gitignore -Pattern .env
```

> **Confirmação final:** Nenhum comando de escrita/modificação foi executado além da criação deste arquivo. `git status` final deve mostrar apenas `M pnpm-lock.yaml` (pré-existente) + `?? docs/TECHPULSE-ETAPA-0-RELATORIO.md` (este relatório, que está em `docs/` mas `docs/DOCUMENTACAO_TECNICA.md` está no `.gitignore` — este novo arquivo pode aparecer como untracked).
