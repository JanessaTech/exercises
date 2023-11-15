import React from 'react'
import { memo, useCallback } from "react";

const Todo = memo(({todos, addTodo}) => {
    console.log('Todo component is triggered')
    return (
        <div>
            <h2>My todos:</h2>
            {
                todos.map((t, index) => (<p key={index}>{t}</p>))
            }
            <button onClick={addTodo}>    Add Todo</button>      
        </div>  
    )
})

export default function UseCallbackDemo() {
    const [count, setCount] = React.useState(0)
    const [todos, setTodos] = React.useState([])

    const increment = () => {
        setCount(count + 1)
    }
    const addtodo = useCallback(() => {
        console.log('addtodo')
        setTodos([...todos, 'new todo'])
    }, [todos])

  return (
    <div>
        <Todo todos={todos} addTodo={addtodo}/>
        <hr/>
        <div>
        Count: {count}  
        <button onClick={increment}>increment</button>
        </div> 
    </div>
  )
}

