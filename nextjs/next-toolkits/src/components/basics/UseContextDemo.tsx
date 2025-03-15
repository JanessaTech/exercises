'use client'
import { createContext, useContext } from "react";

type Person = {
    name: string;
    age: number
}

const defaultUser: Person = {
    name: 'Janessa',
    age: 23
}

const UserContext = createContext(defaultUser)

function ChildOne() {
    return (
        <ChildTwo/>
    )
}

function ChildTwo() {
    const user = useContext(UserContext)
    return (
        <div>
            <span>Name:{user.name}  Age: {user.age}</span>
        </div>
    )
}

export default function UseContextDemo() {
    return (
        <UserContext.Provider value={defaultUser}>
            <ChildOne/>
        </UserContext.Provider>
    )
}