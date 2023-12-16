import React, { useEffect, useRef } from 'react'

export default function UseEffectDemo() {
    const [value, setValue] = React.useState('')
    const myref = useRef('')
    useEffect(() => {
        console.log('useEffect is called')
        myref.current = value
        return () => {
            console.log('clean up is called. current myRef value is=', myref.current)
        }
    }, [value])

    const handleChanges = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }
  return (
    <div>
        <input id='myinput' value={value} onChange={handleChanges}></input>
      
    </div>
  )
}

