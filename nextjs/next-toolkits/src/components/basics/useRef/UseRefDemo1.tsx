'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react"

export default function UseRefDemo1() {
    const [value, setValue] = useState<string>('')
    const pre = useRef('')
    useEffect(() => {
        console.log('useEffect is called. value =', value)
        pre.current = value
    }, [value]) 

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <>
        <input type="text" value={value} onChange={handleChange} className="border-2 border-blue-700"/>
        <div>Current value: {value}</div>
        <div>Previous value: {pre.current}</div>
        </>
    )
}

// The demo shows how to use useRef to keep trace of the old data