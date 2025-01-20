import {Expect, Equal} from "../test-utils";


type cases = [
    Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
    Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
    // @ts-expect-error
    MyPick<Todo, 'title' | 'completed' | 'invalid'>,
  ]
  
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  interface Expected1 {
    title: string
  }
  
  interface Expected2 {
    title: string
    completed: boolean
  }

  //type MyPick<T, K extends keyof T> = Pick<T, K> 
  type MyPick<T, V extends keyof T> = {
    [K in keyof T as K extends V ? K : never] : T[K]
  }
