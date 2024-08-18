import { Equal, Expect } from "../test-utils"

interface User {
    name: string
    age: number
    address: string
  }
  
  interface UserPartialName {
    name?: string
    age: number
    address: string
  }
  
  interface UserPartialNameAndAge {
    name?: string
    age?: number
    address: string
  }
  
  type cases = [
    Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
    Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
    Expect<Equal<PartialByKeys<User>, Partial<User>>>,
    // @ts-expect-error
    Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
  ]

  type PartialByKeys<T, K extends keyof T> = 
  Omit<T, K> & {
    [P in keyof T as P extends K ? P : never] ?: T[P]
  }

  type T1 = PartialByKeys<User, 'name'>


  type M0<T, K extends keyof T> = Omit<T, K>
  type m0 = M0<User, 'name' | 'age'>
  type M1<T, K extends keyof T> = {
    [P in keyof T as P extends K ? P : never] ?: T[P]
  }
  type m1 = M1<User, 'name' | 'age'>
  type m = m0 & m1
  type a = Partial<User>