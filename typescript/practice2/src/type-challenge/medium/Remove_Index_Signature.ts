import { Equal, Expect } from "../test-utils"

type Foo = {
    [key: string]: any
    foo(): void
  }
  
  type Bar = {
    [key: number]: any
    bar(): void
    0: string
  }
  
  const foobar = Symbol('foobar')
  type FooBar = {
    [key: symbol]: any
    [foobar](): void
  }
  
  type Baz = {
    bar(): void
    baz: string
  }
  
  type cases = [
    Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
    Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
    Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
    Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
  ]

  type Filter<P> = string extends P
  ? never
  : number extends P
    ? never
    : symbol extends P
     ? never
     : P

  type RemoveIndexSignature<T> = {
    [P in keyof T as Filter<P>]: T[P]
  }

  //type RemoveIndexSignature<T> = any
