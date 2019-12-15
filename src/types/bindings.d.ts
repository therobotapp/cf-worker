import { KVNamespace } from '@cloudflare/workers-types'
declare global {
  const SESSION_KV: KVNamespace
}
