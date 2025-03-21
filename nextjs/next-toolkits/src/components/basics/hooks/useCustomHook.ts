import { useEffect, useState } from "react"

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