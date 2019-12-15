import { KVNamespace } from '@cloudflare/workers-types'
declare global {
  const LOGS_NAMESPACE: KVNamespace
}
