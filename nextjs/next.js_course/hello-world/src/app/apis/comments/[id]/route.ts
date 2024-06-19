import { comments } from "../data";
import { NextResponse } from "next/server";
import { redirect } from "../../../../../node_modules/next/navigation";

export async function GET(
    request: Request,
    {params} : {params: {id: string}}) {
        if (parseInt(params.id) > comments.length) {
            redirect("/apis/comments")
        }
        const comment = comments.find( (comment: {id: number, text: string}) => comment.id === parseInt(params.id))
    
        return NextResponse.json(comment)
}