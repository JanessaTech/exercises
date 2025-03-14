'use client'
import { createContext, useContext } from "react";

type UserInfo = {
    name: string;
    age: number
  }
  const defaultUser: UserInfo = {
    name: 'JanessaTech',
    age: 20
  }
  
  export const UserContext = createContext<UserInfo>(defaultUser)
  export const UserProvider = ({children}: {children: React.ReactNode}) => {
    return (
        <UserContext.Provider value={defaultUser}>
            {children}
        </UserContext.Provider>
    )
  }

  export const useUser = () => useContext(UserContext)