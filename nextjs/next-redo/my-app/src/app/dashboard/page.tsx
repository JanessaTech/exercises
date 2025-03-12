'use client'

import { useState } from "react"

export default function DashboardPage() {
    const [name, setName] = useState<string>('defaut')
    console.log('dashboard client component')
    return (
        <div>
            <div>Dashboard page</div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-2 border-blue-700"/>
            <div>Input:{name}</div>
        </div>
        
    )
}