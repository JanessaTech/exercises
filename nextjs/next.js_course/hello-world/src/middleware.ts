import { NextRequest, NextResponse } from "../node_modules/next/server";

export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
    matcher: "/profile"
}