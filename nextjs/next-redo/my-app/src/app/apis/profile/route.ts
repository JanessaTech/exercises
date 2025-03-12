import { headers } from "next/headers"

export async function GET() {
    const headerList = headers()
    console.log(headerList)
    return new Response('<h1>Profile data</h1>', {
        headers: {'Content-type': 'text/html'}
    })
}