import React, { createContext } from 'react'
import ParentComponent from './ParentComponent'


/**
 * The demo shows how to the pass custom data down to one of components rooted at RootComponent
 */
export const UserContext = createContext()

export default function RootComponent() {
    const [user, setUser] = React.useState({
        name: 'JanessaTech',
        age: 20
    })

  return (
    <UserContext.Provider value={user}>
        <div>
            <h1>In RootComponent</h1>
            <ParentComponent/>  
        </div>
    </UserContext.Provider>
    
  )
}

