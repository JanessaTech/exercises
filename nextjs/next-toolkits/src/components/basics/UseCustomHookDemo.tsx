'use client'

import { useEffect, useState } from "react"

export default function UseCustomHookDemo() {
    const {name, setName, age, setAge} = useCustomHook()

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleAge = (e:React.ChangeEvent<HTMLInputElement>) => {
        setAge(Number(e.target.value))
    }

    return(
        <div>
            <input type="text" value={name} onChange={handleName} className="border-2 border-blue-500 block"/>
            <input type="number" value={age} onChange={handleAge} className="border-2 border-red-500 block"/>
            <div>Name: {name}</div>
            <div>Age: {age}</div>
        </div>
    )
}

export function useCustomHook() {
    const [name, setName] = useState<string>('JanessaTech')
    const [age, setAge] = useState<number>(21)

    useEffect(() => {
        const setInfo = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log('setInfo...')
        }
        setInfo()
    }, [name])
    console.log('useCustomHook is called')
    return {name, setName, age, setAge}
}