import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl

    // Redirect authenticated users away from auth pages
    if (token &&
        (
            url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup') ||
            url.pathname.startsWith('/forgot-password') 
    )) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Block access to submit-story page
    if (url.pathname.startsWith('/submit-story')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()  // Allow request to proceed
}

export const config = {
    matcher: ['/signin', '/signup', '/forgot-password', '/', '/submit-story'],
};
