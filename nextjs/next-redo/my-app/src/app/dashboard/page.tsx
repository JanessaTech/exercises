'use client'

import { useState } from "react"

export default function DashboardPage() {
    const [name, setName] = useState<string>('defaut')
    return (
        <div>Dashboard page</div>
    )
}