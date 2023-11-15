import React from 'react'

const initData = [
    {
        id: 0,
        status: 'init'
    },
    {
        id: 1,
        status: 'init'
    },
    {
        id: 2,
        status: 'init'
    }
]

const reducer = (state, dispatch) => {
    switch(dispatch.type) {
        case 'init': 
            console.log('reducer in init')
            const res = state.map((s, index) => {
                return {...s, status: 'progressing'}
               })
            console.log(res)
            return res
        case 'progressing':
            console.log('reducer in progressing')
            return state.map((s, index) => {
                return {...s, status: 'done'}
               })
        default: return state
    }
}
export default function UseReducerDemo() {
    
    const [state, dispatch] = React.useReducer(reducer, initData)
    const [command, setCommand] = React.useState('init')

    const sendCommand = () => {
        console.log('sendCommand:', command)
        dispatch({type: command})
    }
    const handleChanges = (e) => {
        e.preventDefault()
        setCommand(e.target.value)
    }

  return (
    <div style={{margin:'50px'}}>
        <input name='myinput' value={command} onChange={handleChanges}/>
        <button onClick={sendCommand}>Send command</button>
        <p></p>
        <h1>Current command: {command}</h1>
       {
        state.map( (t, index) => (
            <div key={index}>
                <p> id: {t.id}</p>
                <p>status: {t.status}</p>
            </div>
        ))
       } 
    </div>
  )
}

