export { auth as proxy } from "@/auth"

export const config = {
  matcher: [
    /*
     * Protect specific private sectors:
     * - /dashboard (and sub-paths)
     * - /settings (and sub-paths)
     * - /submit (and sub-paths)
     */
    '/dashboard/:path*',
    '/settings/:path*',
    '/submit/:path*',
  ],
}
