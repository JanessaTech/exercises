import React, { memo } from 'react'
import GrandChild from './GrandChild'

const Child = (props) =>  {
    const [state, setState] = React.useState({name: 'Child'})
    console.log('Child component is triggered')

    const handleClick = () => {
        setState({name: state.name + ' Child '})
    }

  return (
    <div>
      <button onClick={handleClick}>Child click</button> <input value={state.name} readOnly></input>
      <GrandChild/>
    </div>
  )
}

export default memo(Child)

