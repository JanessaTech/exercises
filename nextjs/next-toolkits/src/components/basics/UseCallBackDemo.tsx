'use client'
import {memo, useCallback, useState } from "react"

const Todo = memo(({todos, addTodo}: {todos: string[], addTodo: () => void}) => {
    console.log('Todo component is triggered')
    return (
        <div>
            {
                todos.map((todo, idx) => {
                    return (<div key={idx}>{todo}</div>)
                })
            }
            <button onClick={addTodo} className="px-1 py-2 bg-red-200 rounded-md">Add todo</button>
        </div>
    )
})

export default function UseCallbackDemo() {
    const [cnt, setCnt] = useState<number>(0)
   const [todos, setTodos] = useState<string[]>([])

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log('button click ...')
        setCnt((cnt) => cnt + 1)
    }
    // const addTodo = () => {
    //     setTodos((todos) => [...todos, 'new todo'])
    // }
    const addTodo = useCallback(() => {
        setTodos((todos) => [...todos, 'new todo'])
    }, [todos])

    return (
        <div>
            <Todo todos={todos} addTodo={addTodo}/>
            <button className="bg-zinc-400 px-2 py-1 rounded-md text-white" onClick={handleClick}>increment</button>
            <div>cnt:{cnt}</div>
        </div>
    )
}

// we used useCallback to cache the addTodo function 
// because if we don't wrapp it, the function will be re-created everytime the component renders
// the use memo to make sure the Todo component is rendered only when at least one of props is different from old one

