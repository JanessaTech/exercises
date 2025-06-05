import { Equal, Expect } from "../test-utils"

interface User {
    name?: string
    age?: number
    address?: string
  }
  
  interface UserRequiredName {
    name: string
    age?: number
    address?: string
  }
  
  interface UserRequiredNameAndAge {
    name: string
    age: number
    address?: string
  }
  
  type cases = [
    Expect<Equal<RequiredByKeys<User, 'name'>, UserRequiredName>>,
    Expect<Equal<RequiredByKeys<User, 'name' | 'age'>, UserRequiredNameAndAge>>,
    Expect<Equal<RequiredByKeys<User>, Required<User>>>,
    // @ts-expect-error
    Expect<Equal<RequiredByKeys<User, 'name' | 'unknown'>, UserRequiredName>>,
  ]

  

  // type M<T, K extends keyof T = keyof T> = Pick<Required<T>, K>
  // type S<T, K extends keyof T = keyof T> = Omit<T, K>
  // type All<T, K extends keyof T = keyof T> = Pick<Required<T>, K> & Omit<T, K>
  // type Merge<T> =  { [P in keyof T]: T[P] };
  // type RequiredByKeys<T, K extends keyof T = keyof T> = Merge<All<T, K>>

  type M<T> = {
    [P in keyof T]: T[P]
  }
  type RequiredByKeys<T, K extends keyof T = keyof T> = M<{
    [P in K]-?: T[P]
  } & Omit<T, K>>