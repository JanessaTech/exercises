import {Expect, Equal, Alike, NotEqual} from "../test-utils";

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

type Mutable<T extends {[P in keyof any]: any}> = {
  -readonly [P in keyof T]: T[P]
}

type M = Readonly<List>