import { type NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not found', { status: 404 })
  }

  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    return new NextResponse('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env', { status: 500 })
  }

  const payload = await getPayload({ config })
  const result = await payload.login({ collection: 'users', data: { email, password } })

  const response = NextResponse.redirect(new URL('/admin', request.url))
  if (result.token) {
    response.cookies.set('payload-token', result.token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    })
  }

  return response
}
