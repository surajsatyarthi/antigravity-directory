import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  console.log("Middleware: Start", req.nextUrl.pathname);
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect authenticated users away from auth pages
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return null;
  }

  // Protect admin routes
  if (isAdminPage) {
    const isE2E = process.env.NEXT_PUBLIC_IS_E2E === 'true';
    if (!isAuth && !isE2E) {
      console.log("Middleware: Admin page access denied - No Auth");
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.nextUrl)
      );
    }


    // Role check
    // @ts-ignore - role is added in session callback
    const role = req.auth?.user?.role;

    if (role !== "ADMIN" && !isE2E) {
      // Redirect non-admins to 404 to hide admin existence or dashboard
      return NextResponse.redirect(new URL("/404", req.nextUrl));
    }
  }

  // Protect dashboard routes
  if (isDashboardPage) {
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/auth/signin?from=${encodeURIComponent(from)}`, req.nextUrl)
      );
    }
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
