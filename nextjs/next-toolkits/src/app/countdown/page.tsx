'use client'

import { useEffect, useState } from "react"

const CountDown = ()  => {
    const [seconds, setSeconds] = useState(30)
    useEffect(() => {
        let interval = null
        if (seconds > 0) {
            interval = setInterval(() => setSeconds((prev) => prev - 1), 1000)
        } else if (seconds === 0) {
            setSeconds(30)
        }
        return () => {
            console.log('exit useEffect')
            if (interval)  {
                console.log('clearInterval')
                clearInterval(interval)
            }
        }
    }, [seconds])
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="text-3xl">0 : {seconds}</div>
        </div>
    )
}

export default CountDown