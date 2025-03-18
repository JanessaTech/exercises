"use client"

import { useEffect } from "react"

export default function ErrorPage({error}: {error: Error}) {

    useEffect(() => {
        console.error(`${error}`)
    }, [error])

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="text-6xl text-red-600">Error fetching data!</div>
        </div>
    )
}