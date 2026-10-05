import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const auth = req.headers.get("authorization");

    if (!auth || !auth.startsWith("Basic ")) {
      return new NextResponse("Auth required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }

    const [user, pass] = Buffer.from(auth.slice(6), "base64")
      .toString()
      .split(":");

    if (
      user !== process.env.ADMIN_USER ||
      pass !== process.env.ADMIN_PASS
    ) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};