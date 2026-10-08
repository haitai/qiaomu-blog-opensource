import { NextResponse } from 'next/server'
import { ADMIN_HINT_COOKIE_NAME, COOKIE_NAME } from '@/lib/admin-auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' })
  response.cookies.set(ADMIN_HINT_COOKIE_NAME, '', { maxAge: 0, path: '/' })
  return response
}
