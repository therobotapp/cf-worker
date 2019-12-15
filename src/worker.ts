import cookie from 'cookie'
addEventListener('fetch', async event => {
  const requestCookies = event.request.headers.get('cookie')
  const cookies = requestCookies ? cookie.parse(requestCookies) : {}

  if (event.request.url.match('/important')) {
    event.passThroughOnException()
  }
  const userData = cookies?.session
    ? await SESSION_KV.get(cookies?.session, 'json')
    : null

  if (userData) {
    const userId = `${(userData as any)?.userId}`
    event.respondWith(new Response(`Hello ${userId}`))
  } else {
    const sessionId = Math.random().toString(36)
    const userId = Date.now().valueOf()
    const maxAge = 60 * 60 * 24 * 7 // 1 week

    event.waitUntil(
      SESSION_KV.put(sessionId, JSON.stringify({ userId }), {
        expirationTtl: 300,
      })
    )
    event.respondWith(
      new Response(`Hello New User`, {
        headers: new Headers({
          'Set-Cookie': cookie.serialize('session', sessionId, {
            httpOnly: true,
            maxAge,
          }),
        }),
      })
    )
  }
})
