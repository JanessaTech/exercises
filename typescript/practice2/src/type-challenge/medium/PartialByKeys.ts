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


  type M0<T, K> = {
    [P in keyof T as P extends K ? P : never] ?: T[P]
  }
  type M1<T, K> = {
    [P in keyof T as P extends K ? never : P] : T[P]
  }

  type All<T, K> = M0<T, K> & M1<T, K>

  type Merge<T> =  { [P in keyof T]: T[P] };

  type PartialByKeys<T, K extends keyof T = keyof T> = Merge<All<T, K>>