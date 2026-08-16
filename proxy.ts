import { NextResponse, type NextRequest } from "next/server";

const PREVIEW_COOKIE = "slow_preview";
const PREVIEW_QUERY = "preview";

function getLocale(pathname: string) {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" as const : "en" as const;
}

function hasValidPreviewCookie(request: NextRequest) {
  const configuredKey = process.env.SLOW_PREVIEW_KEY;
  return Boolean(configuredKey && request.cookies.get(PREVIEW_COOKIE)?.value === configuredKey);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocale(pathname);
  const configuredKey = process.env.SLOW_PREVIEW_KEY;
  const previewKey = request.nextUrl.searchParams.get(PREVIEW_QUERY);

  if (configuredKey && previewKey === configuredKey) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete(PREVIEW_QUERY);
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(PREVIEW_COOKIE, configuredKey, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  const previewEnabled = hasValidPreviewCookie(request);
  if (locale === "en") {
    const response = NextResponse.next();
    response.headers.set("x-site-locale", "en");
    response.headers.set("x-site-preview", previewEnabled ? "1" : "0");
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/localized${pathname}`;
  const response = NextResponse.rewrite(url);
  response.headers.set("x-site-locale", "ar");
  response.headers.set("x-site-preview", previewEnabled ? "1" : "0");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$).*)"],
};
