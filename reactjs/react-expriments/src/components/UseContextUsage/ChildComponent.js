import React, { useContext } from 'react'
import { UserContext } from './RootComponent';

export default function ChildComponent() {
    const user = useContext(UserContext);
  return (
    <div>
      <h2>In ChildComponent</h2>
      <h3>Name: {user.name}</h3>
      <h3>Age: {user.age}</h3>
    </div>
  )
}

