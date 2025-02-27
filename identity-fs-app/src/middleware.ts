export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/admin',
  ]
}

// matcher: ['/dashboard/:path*', '/auth-callback'],