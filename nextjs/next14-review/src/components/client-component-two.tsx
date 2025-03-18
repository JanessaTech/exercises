'use client'

import { useState } from "react"

export const ClientComponentTwo = () => {
    const [name, setName] = useState<string>('JanessaTech')
    return (<div>Client Component Two</div>)
}