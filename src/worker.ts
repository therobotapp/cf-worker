import { getCookies, makeCookie, awaiter, Awaiter } from './utils'
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request, awaiter(event)))
})

async function handleRequest(req: Request, wait: Awaiter) {
  try {
    const cookies = getCookies(req)

    const sessionData = cookies.session
      ? await SESSION_KV.get(`${cookies.session}`, 'json')
      : null

    if (sessionData) {
      return new Response(
        `${JSON.stringify({ cookies, sessionData }, null, 2)}`
      )
    } else {
      const sessionId = (Date.now().valueOf() * Math.random())
        .toString(36)
        .replace('.', '')

      const userId = (Math.random() * 1000).toFixed()

      const maxAge = 60 * 60 * 24 * 7 // 1 week

      const cookieData = {
        name: 'session',
        value: sessionId,
        options: {
          httpOnly: true,
          maxAge,
        },
      }

      const data = { userId, sessionId, cookieData }

      wait(() =>
        SESSION_KV.put(sessionId, JSON.stringify(data), {
          expirationTtl: 60,
        })
      )

      return new Response(`Hello New`, {
        headers: new Headers({
          'Set-Cookie': makeCookie(
            cookieData.name,
            cookieData.value,
            cookieData.options
          ),
        }),
      })
    }
  } catch (e) {
    return new Response(e.message, { status: 500 })
  }
}
