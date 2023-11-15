import React, { useEffect, useRef } from 'react'

export default function UseRefDemo() {
    const [value, setValue] = React.useState('')
    const hist = useRef('')

    useEffect(() => {
        hist.current = value
    },[value])

    const handleChanges = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

  return (
    <div>
        <input value={value} onChange={handleChanges}/>
        <p>Previous value: {hist.current}</p>
        <p>Current value: {value}</p>
        
    </div>
  )
}

