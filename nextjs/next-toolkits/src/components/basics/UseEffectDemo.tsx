'use client'

import { ChangeEvent, useEffect, useState } from "react"

export default function UseEffectDemo() {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        console.log('useEffect is called')
        return () => {
            console.log('cleanup is called')
        }
    }, [value]) 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <div><input type="text" value={value} onChange={handleChange} className="border-2 border-blue-500"/></div>
    )
}