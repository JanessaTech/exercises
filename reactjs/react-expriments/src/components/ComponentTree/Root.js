import React from 'react'
import Child from './Child'

export default function Root() {
    const [state, setState] = React.useState({name: ''})
    console.log('Root component is triggered')

    const handleClick = () => {
        const input = document.getElementById('rootinput')
        console.log(input.value)
        if (input.value) {
            setState({name: `${state.name} ${input.value} `})
        } else {
            setState({name: state.name + ' Root '})
        }
    }
  return (
    <div>
        {console.log(state)}
        <button onClick={handleClick}>Root click</button><input id='rootinput'></input>
        <Child/>

    </div>
  )
}

