import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.StartsWith("sign-in") || url.pathname.StartsWith("sign-up"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/sign"],
};
