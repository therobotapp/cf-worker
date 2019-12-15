# Cloudflare Worker Typescript Starter

Live local development server for cloudflare workers
Builds typescript.
Bundles with webpack.
Starts a local worker on 4321 port.

### init

1. `npx degit therobotapp/cf-worker.git my-new-worker`
2. `cd my-new-worker`
3. `npm install`
4. `npm run dev`

### Dev

- `npm run dev`

### Deploy

change worker name `./wrangler.toml`, add zone or routes
put your credentials in `./env` or `wrangler.toml`

- `npm run build`
- `npm run deploy` or `npm run deploy:local`
- use `wrangle.toml` with `webpack.config.js`.
- or `./bundle/worker.js` as entry
