import { Equal, Expect } from "../test-utils"

interface Todo1 {
    title: string
    description: string
    completed: boolean
    meta: {
      author: string
    }
  }
  
  type List = [1, 2, 3]
  
  type cases = [
    Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
    Expect<Equal<Mutable<Readonly<List>>, List>>,
  ]
  
  type errors = [
    // @ts-expect-error
    Mutable<'string'>,
    // @ts-expect-error
    Mutable<0>,
  ]
  

  type Mutable<T extends readonly unknown[] | {[p in any] : unknown}> = {-readonly [P in keyof T]: T[P]}
