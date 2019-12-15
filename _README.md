# Cloudflare Worker Typescript Starter

1. `npx degit https://gist.github.com/5a48a8afd9377b0dd3523f68af512f98.git my-new-worker`
2. `mkdir src; mv _src_worker.ts src/worker.ts`
3. `npm run dev`

## Dev

Builds typescript
Bundles with webpack
Starts a local worker on 4321 port

## Deploy

- `npm run build`
- use `wrangle.toml` with `webpack.config.js`.
- or `./bundle/worker.js` as entry
