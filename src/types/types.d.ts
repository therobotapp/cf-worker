import '@cloudflare/workers-types'
declare global {
  // copy-paste from types-cloudflare-worker
  interface CacheStorage {
    default: CloudflareDefaultCacheStorage
  }
  interface CloudflareDefaultCacheStorage {
    put(
      request: Request | string,
      response: Response
    ): Promise<undefined>
    match(
      request: Request | string,
      options?: CloudflareCacheQueryOptions
    ): Promise<Response | undefined>
    delete(
      request: Request | string,
      options?: CloudflareCacheQueryOptions
    ): Promise<boolean>
  }

  interface CloudflareCacheQueryOptions {
    /**
     * Consider the request method to be GET, regardless of its actual value.
     */
    ignoreMethod: boolean
  }
}
