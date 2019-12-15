# Cloudflare Worker Typescript Starter

Opinionated Template

### init

1. `npx degit npx degit therobotapp/cf-worker.git my-new-worker my-new-worker`
2. `mkdir src; mv _src_worker.ts src/worker.ts`
3. `npm install`

### Dev

Builds typescript.
Bundles with webpack.
Starts a local worker on 4321 port.

- `npm run dev`

### Deploy

- `npm run build`
- use `wrangle.toml` with `webpack.config.js`.
- or `./bundle/worker.js` as entry
