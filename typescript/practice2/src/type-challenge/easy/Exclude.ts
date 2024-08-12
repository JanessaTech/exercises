import { Equal, Expect } from "../test-utils";

type cases = [
    Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
    Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
    Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
  ]

  type MyExclude<T, U> = Exclude<T, U>
  type res1 = MyExclude<'a' | 'b' | 'c', 'a'>
  type res2 = MyExclude<'a' | 'b' | 'c', 'a' | 'b'>
  type res3 = MyExclude<string | number | (() => void), Function>
  type res4 = (() => void) extends Function ? 1 : 2
  type res5 = Function extends (() => void) ? 1 : 2