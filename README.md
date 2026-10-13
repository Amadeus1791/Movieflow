# MovieFlow: Stand nach Kapitel 9

**Kapitel 9: Deployment und Betrieb**

Der fertige Kursstand: Umgebungsvariablen und ein Feature-Flag, SPA-Fallback für Netlify und Vercel, globale Fehlerbehandlung und eine CI-Pipeline.

## Starten

```bash
npm install
npm run dev
```

Danach die Adresse aus dem Terminal öffnen (meist http://localhost:5173).

## Neu in diesem Stand

- `.env` (`VITE_API_URL`, `VITE_SHOW_LIKES=true`), `.env.production` (Beispiel-Adresse), `.env.example`
- `src/views/HomeView.vue`: Like-Knopf nur, wenn `VITE_SHOW_LIKES` genau `'true'` ist
- `src/stores/movies.js`: lädt von `${VITE_API_URL}/movies.json`
- `public/_redirects` (Netlify), `vercel.json` (Vercel)
- `src/main.js`: `app.config.errorHandler`, die Kette `createApp(...).use(...)` dafür in einzelne `app.use`-Zeilen aufgeteilt
- `.github/workflows/ci.yml`: Lint (ohne `--fix`), Formatierung, Tests und Build bei jedem Push (`actions/checkout@v7`, `actions/setup-node@v7`, Node 24)

## Hinweise

- `.env.production` zeigt auf eine Beispiel-Domain, die es nicht gibt. Nach `npm run build` lädt `npm run preview` deshalb keine Filme.
  Für einen lokalen Test des Builds eine Datei `.env.production.local` mit der Zeile `VITE_API_URL=/api` anlegen
  (sie überschreibt `.env.production` und wird von Git ignoriert), dann `npm run build` und `npm run preview`.
  Unter macOS und Linux geht auch kurz `VITE_API_URL=/api npm run build`.
- `sendToMonitoring` in `main.js` ist ein Platzhalter und schreibt nur in die Konsole. Für das `console.error` meldet `npx eslint .` eine Warnung (`no-console`), keinen Fehler.
- Den SPA-Fallback eines Hosters ahmt `npx serve -s dist` nach; `npx serve dist` (ohne `-s`) antwortet auf `/movies/3` mit 404. `npm run preview` hat den Fallback schon eingebaut.
- Für die E2E-Tests wie in Kapitel 8 einmalig `npx playwright install chromium`. Weil `npm run test:e2e` die App selbst baut,
  braucht es dafür ebenfalls die `.env.production.local` von oben, sonst scheitern der Such- und der Reset-Test (2 failed, 1 passed).
  In einer CI-Pipeline setzt man stattdessen `VITE_API_URL=/api` als Umgebungsvariable des Jobs; sie schlägt alle `.env`-Dateien.
- Die Filmliste bleibt seit Kapitel 6 im `localStorage` (Schlüssel `movieflow.movies`). Steht dort ein Eintrag (auch eine leere Liste), fragt `loadMovies` gar nicht erst.
  Einen falschen `VITE_API_URL` merkt man deshalb erst nach `localStorage.removeItem('movieflow.movies')` in der Konsole und neu laden.

## Scripts

| Befehl            | Wirkung                                   |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Dev-Server mit Hot Reload                 |
| `npm run build`   | Produktions-Build nach `dist/`            |
| `npm run preview` | den Build lokal ansehen                   |
| `npm run lint`    | Oxlint und ESLint (behebt, was geht)      |
| `npm test`        | Vitest im Watch-Modus (`npx vitest run`: einmal) |
| `npm run test:e2e` | Playwright-Tests gegen den Build          |
| `npm run format`  | Prettier formatiert `src/`                |
| `npm run format:check` | prüft nur, ob `src/` formatiert ist  |

Voraussetzung: Node.js 22.18 oder neuer, 24.12 oder neuer oder 26, siehe Setup-Anleitung.
