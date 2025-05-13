import { Alike, Expect, Equal, NotEqual, ExpectExtends } from "../test-utils";

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

type Merge<F, S extends {[P in any]: any}> = {
  [K in keyof (F & S)] : K extends keyof F
  ? K extends keyof S
    ? S[K]
    : F[K]
  : S[K]
}