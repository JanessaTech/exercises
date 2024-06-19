import { comments } from "./data";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    console.log(query)
    return NextResponse.json(comments)
}

export async function POST(request: Request){
    const comment  = await request.json()
    const newComment = {
        id: comments.length + 1,
        text: comment.text
    }
    comments.push(newComment)
    return NextResponse.json(newComment)
}