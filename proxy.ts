import { NextResponse, type NextRequest } from "next/server";

const locales = ["ar", "tr"] as const;
type Locale = "en" | (typeof locales)[number];

function getLocale(pathname: string): Locale {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return "en";
}

function isLocalizedSection(pathname: string): boolean {
  const match = pathname.match(/^\/(ar|tr)\/(about|services|tools)$/);
  return Boolean(match);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = getLocale(pathname);

  if (locale === "en") {
    const response = NextResponse.next();
    response.headers.set("x-site-locale", "en");
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = isLocalizedSection(pathname)
    ? `/localized${pathname}`
    : pathname === `/${locale}`
      ? "/"
      : pathname.slice(locale.length + 1);

  const response = NextResponse.rewrite(url);
  response.headers.set("x-site-locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml)$).*)"],
};
