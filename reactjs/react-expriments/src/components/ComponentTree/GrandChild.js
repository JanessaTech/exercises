import React from 'react'
import { memo } from 'react'

const GrandChild = () => {
    const [state, setState] = React.useState({name: 'GrandChild'})
    console.log('GrandChild component is triggered')
    const handleClick = () => {
        setState({name: state.name + ' GrandChild '})
    }
  return (
    <div>
      <button onClick={handleClick}>GrandChild click</button> <input value={state.name} readOnly></input>
    </div>
  )
}

export default memo(GrandChild)

