// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
  if (new RegExp(/^.*(fonts|_next|vk.com|favicon).*$/).test(request.url)) {
    return NextResponse.next()
  }
  // Example function to validate auth
  const token = request.cookies.get("0xpass-token")
  if (token) {
    const { accessToken, apiKey } = JSON.parse(token); 
    console.log("token:", JSON.parse(token))
    // const val = await client.validateToken({token: token})
    const res = await fetch("http://localhost:8080/v1/validate", {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-0xPass-API-Key': apiKey,
        Authorization: `Bearer ${accessToken}`
      },
    })
    const val = await res.json()
    console.log("val", val)
    if (val) {
      return NextResponse.next()
    }
  }
  

  const loginUrl = new URL('/login', request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: '/protected',
}