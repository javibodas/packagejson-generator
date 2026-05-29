# packagejson-generator

Next.js 13 **Pages Router** (not App Router). Pages live in `src/pages/`. API routes are in `src/pages/api/`.

## Commands

| Command | What it runs |
|---|---|
| `npm run dev` | `next dev` |
| `npm run build` | `next build` — **only way to typecheck** (no separate tsc script) |
| `npm start` | `next start` |
| `npm test` | `jest --silent` |
| `npm run test:coverage` | `jest --coverage` |
| `npm run lint` | `eslint src/**/*.ts src/**/*.tsx` |

Run **`npm test && npm run lint`** before committing (matching CI).

## Code style (enforced by ESLint)

- **Tabs** for indent, **single quotes**, **no semicolons**, Unix linebreaks
- Import sorting autofix enabled (`sort-imports-es6-autofix`)
- **No Prettier** — ESLint is the only formatter
- `@typescript-eslint/no-explicit-any` is **off** (allowed)
- `strict: false` in tsconfig — no strict null checks

## Quirks & gotchas

- **Test directory**: `___tests___/` (three underscores, named `___tests___`)
- **Monaco Editor** is dynamically imported client-only via `@monaco-editor/react` (`ssr: false`). Globally mocked in `jest.setup.js`. No webpack plugin needed — loads workers from CDN.
- **MSW setup** at `___tests___/setupWorkerAPI.js` exists but **no test imports it** — unused scaffold.
- **`public/index.html`** is legacy CRA artifact — not used by Next.js.
- **Secrets committed**: `.env` and `.env.local` are checked in despite `.gitignore` rules.
- **`eslintConfig` in package.json** extending `standard` is a leftover — `.eslintrc` takes precedence.
- **`npm install`** may need `--legacy-peer-deps` due to `eslint-plugin-jest` vs `@typescript-eslint/eslint-plugin@6` peer conflict.

## Architecture notes

- **State**: `FileContext` uses `useReducer` (actions in `src/reducer/`); `UserContext` uses `useState`
- **Database**: MongoDB via Mongoose (`src/lib/database/`), connection singleton
- **Auth**: **NextAuth.js v4** with GitHub provider (`src/pages/api/auth/[...nextauth].ts`). JWT strategy (no DB). Session synced to `UserContext` via `SessionSync` component. Tests mock `next-auth/react` globally.
- **Dependency search**: proxied through `/api/dependencies/[id]` → `registry.npmjs.org/-/v1/search`
- **Type files** use camelCase with a known typo pattern: `Dependencie` (missing `y`)
- **NextAuth type augmentation** at `types/next-auth.d.ts` (extends `Session.user` with `id`)
- **Env vars required**: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `MONGODB_URL`
