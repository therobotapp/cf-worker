import cookie from 'cookie'
export const makeCookie = cookie.serialize
export const getCookies = (req: Request) => {
  const requestCookies =
    req.headers.has('cookie') && req.headers.get('cookie')
  return requestCookies ? cookie.parse(requestCookies) : {}
}
export const awaiter = (e: FetchEvent): Awaiter => f =>
  e.waitUntil(f())
export type Awaiter = (someFunction: () => any) => void
