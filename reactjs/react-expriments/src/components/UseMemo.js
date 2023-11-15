import React from 'react'
import { useMemo } from 'react'

const expensiveCal = (count) => {
    console.log('expensiveCal is triggered')
}

export default function UseMemo() {
    const [count, setCount] = React.useState(0)
    const [name, setName] = React.useState('')
    const res = useMemo(() => expensiveCal(count), [count])
    
  return (
    <div>
        Count: {count} <br/>
        Name: {name} <br/>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setName(name + 'a')}>Set name</button>
      
    </div>
  )
}



