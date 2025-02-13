import {Expect, Equal, Alike, NotEqual, ExpectExtends} from "../test-utils";

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]

type Merge<F, S extends {[K in any]: any}> = {
  [P in keyof(F & S)]: P extends keyof F
    ? P extends keyof S 
      ? S[P]
      : F[P]
    : S[P]
}
