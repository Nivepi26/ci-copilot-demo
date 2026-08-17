# ci-copilot-demo

A simple React customer management app built with Vite. The app lets you add, search, view, and delete customer records with basic account status tracking.

## Local development

Install dependencies:

```sh
npm ci
```

Start the development server:

```sh
npm run dev
```

Run quality checks:

```sh
npm run lint
npm test
npm run build
```

## CI automation

The workflow at `.github/workflows/ci-copilot-workflow.yml` runs on pushes and pull requests to `main`. It checks out the code, sets up Node.js 20.19.0 with npm caching, installs dependencies with `npm ci`, runs linting, runs tests, and uploads the test log as an artifact.
