'use client'

import { useState } from "react"

export const ClientComponentOne = ({children}: {children: React.ReactNode}) => {
    const [name, setName] = useState<string>('JanessaTech')
    return (
        <>
        <div>Client Component One</div>
        {children}
        </>
    
    )
}