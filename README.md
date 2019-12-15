# Cloudflare Worker Typescript Starter

Opinionated Template

### init

1. `npx degit therobotapp/cf-worker.git my-new-worker`
2. `mkdir src; mv _src_worker.ts src/worker.ts`
3. `npm install`

### Dev

Builds typescript.
Bundles with webpack.
Starts a local worker on 4321 port.

- `npm run dev`

### Deploy

change worker name `./wrangler.toml`, add zone or routes
put your credentials in `./env` or `wrangler.toml`

- `npm run build`
- `npm run deploy` or `npm run deploy:local`
- use `wrangle.toml` with `webpack.config.js`.
- or `./bundle/worker.js` as entry
