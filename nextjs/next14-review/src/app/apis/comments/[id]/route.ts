import { NextRequest } from "next/server"
import { comments } from "../data"
import { redirect } from "next/navigation"

export async function GET(request: NextRequest, {params: {id}}: {params: {id: string}}) {
    if (parseInt(id) > comments.length) return redirect('/apis/comments')
    const comment = comments.find((comment) => comment.id === parseInt(id))
    const theme = request.cookies.get('theme')
    console.log('theme:', theme)
    return new Response(JSON.stringify(comment), {
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'theme=dark'
        }
    })
}


export async function PATCH(request: Request, {params: {id}}: {params: {id: string}}) {
    const body = await request.json()
    const {text} = body
    const idx = comments.findIndex((comment) => comment.id === parseInt(id))
    comments[idx].text = text
    return Response.json(comments[idx])
}

export async function DELETE(request: Request, {params: {id}}: {params: {id: string}}) {
    const idx = comments.findIndex((comment) => comment.id === parseInt(id))
    const deletedComment = comments[idx]
    comments.splice(idx, 1)
    return Response.json(deletedComment)
}

