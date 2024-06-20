"use client"
import { useState } from "react"
import { ClientComponentTwo } from "./client-component-two"
import { ServerComponentOne } from "./server-component-one"

export const ClientComponentOne = ({children}: {children: React.ReactNode}) => {
    const [name, setName] = useState("Batman")

    return (
        <>
            <h1>Client Component one</h1>
            {children}
        </>
    )
}