addEventListener('fetch', async (event: FetchEvent) => {
  const cache = caches.default

  const cacheKey = new Request(event.request.url, {
    headers: event.request.headers,
    method: 'GET',
  })

  let response = await cache.match(cacheKey, { ignoreMethod: true })

  if (!response) {
    response = await fetch(event.request.url, {
      cf: { cacheEverything: true },
    })
    event.waitUntil(cache.put(cacheKey, response))
  }
  event.respondWith(
    response.ok ? response : new Response('Hello World', {})
  )
})
