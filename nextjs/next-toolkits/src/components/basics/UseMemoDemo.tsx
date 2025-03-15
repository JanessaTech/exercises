'use client'
import { useState, useMemo } from "react"

const expensiveCalculation = (num: number) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  };

export default function UseMemoDemo() {
    const [cnt, setCnt] = useState<number>(0)
    const [value, setValue] = useState<string>('')
    // const res = expensiveCalculation(cnt)
    const res = useMemo(() => expensiveCalculation(cnt), [cnt])
    

    return (
        <div>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} className="border-2 border-zinc-300"/>
            <button className="px-3 py-2 rounded-md bg-zinc-400" onClick={() => setCnt(cnt + 1)}>+</button>
            <div>cnt:{cnt}</div>
            <div>res:{res}</div>
        </div>
    )
}