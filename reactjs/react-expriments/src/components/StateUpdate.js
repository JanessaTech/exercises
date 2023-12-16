import React, { useEffect } from 'react'

export default function StateUpdate() {
    const [state, setState] = React.useState({})

    useEffect(() => {
        setState({...state, name:'jane'})
        setState({...state, age:20})
    }, [])
  return (
    <div>
      {console.log(state)}
    </div>
  )
}

