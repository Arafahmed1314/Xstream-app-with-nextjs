import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// Define default locale and supported locales
const defaultLocale = "en";
const locales = ["bn", "en"];

/**
 * Get the preferred locale from the request.
 * Uses the `accept-language` header to determine the user's preferred language.
 */
function getLocale(request) {
    const acceptLanguage = request.headers.get("accept-language") ?? undefined;
    const headers = { "accept-language": acceptLanguage };
    const negotiator = new Negotiator({ headers });
    const preferredLanguages = negotiator.languages();
    return match(preferredLanguages, locales, defaultLocale); // Returns the matched locale
}

/**
 * Middleware to handle locale-based redirection and normalization.
 */
export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if the current pathname is missing a locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request); // Detect preferred locale
        const newUrl = new URL(`/${locale}${pathname}`, request.url);
        return NextResponse.redirect(newUrl); // Redirect to the locale-specific path
    }

    // If the pathname already includes a valid locale, normalize it
    const detectedLocale = locales.find((locale) =>
        pathname.startsWith(`/${locale}`)
    );

    if (detectedLocale) {
        const newUrl = request.nextUrl.clone();
        // Normalize the pathname to ensure consistent formatting
        newUrl.pathname = pathname.replace(
            `/${detectedLocale}`,
            `/${detectedLocale}`
        );
        return NextResponse.rewrite(newUrl); // Rewrite the path for consistency
    }

    // Proceed to the next middleware or handler
    return NextResponse.next();
}

/**
 * Configuration for middleware.
 * Matcher ensures that middleware is applied to all relevant paths.
 */
export const config = {
    matcher: [
        // Apply middleware to all paths except API, assets, and Next.js internals
        "/((?!api|_next|.*\\..*|assets).*)",
    ],
};
