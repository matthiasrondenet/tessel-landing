# tessel-landing

One-page site (French and English) for the Tessel app, built from the Claude Design mockup (`Tessel Landing` and `Tessel Privacy`). Same stack as `atlantic-s-ateos-landing`: React 19, TypeScript, Vite, no CSS framework, no third-party requests (Inter and Phosphor icons are bundled), CSP meta tag added at build time.

The language follows the browser (French if any `navigator.languages` entry starts with `fr`, English otherwise). The header button switches it and remembers the choice in `localStorage`. All copy lives in `src/i18n.tsx`.

## Development

```bash
npm install
npm run dev
npm run build
```

## Things to fill in

- **Google Play link:** `PLAY_STORE_URL` in `src/constants.ts`. While empty, the store button reads "coming soon" and is not clickable.
- **Contact:** `ISSUES_URL` in `src/constants.ts` (GitHub issues of this repo, no e-mail published).
- **Privacy policy:** review `src/i18n.tsx` (`policyBlocks`) before publishing. It describes the optional backup/sync (recovery code, data sent to the server) as implemented in the app.

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on pushes to `main`, with `VITE_BASE=/tessel-landing/`. Change it to `/` for a custom domain. Pages must be enabled once under Settings → Pages → Source: GitHub Actions.
