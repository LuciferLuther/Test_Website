# Impeccable installer record

The official installer was invoked from this repository during the 7 August 2026 delivery pass.

## Exact requested command

```bash
npx impeccable install
```

Result in the delivery sandbox:

```text
npm error code EAI_AGAIN
npm error syscall getaddrinfo
npm error request to https://registry.npmjs.org/impeccable failed
```

## Runtime version

The repository now pins Node.js 22.18.0 in `.nvmrc` because the current Impeccable CLI requires Node.js 22.18 or newer. The delivery sandbox itself reported Node.js 22.16.0, so the real installation should be run after `nvm use` or with an equivalent Node.js 22.18+ runtime.

## Non-interactive project attempt

```bash
npx impeccable install -y --providers=codex --scope=project
```

It reached the same DNS restriction. The detector command was also invoked:

```bash
npx impeccable detect app components
```

It could not download the package for the same reason.

No generated provider files are represented as installed in this archive. The project does include `PRODUCT.md`, `DESIGN.md`, `.impeccable/config.json`, the design-quality workflow, and the exact npm scripts needed to complete installation on a machine with registry access.

Run:

```bash
npm run design:install
```

That script maps directly to:

```bash
npx impeccable install
```
