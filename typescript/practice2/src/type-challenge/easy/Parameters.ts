import { Equal, Expect } from "../test-utils"

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]

type MyParameters<T extends (...args: any[]) => any> =  T extends (...args: infer P) => any
? P
: never


//type MyParameters<T extends (...args: any[]) => any> = any

