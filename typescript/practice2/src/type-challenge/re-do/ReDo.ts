import { Alike, Expect, Equal, NotEqual } from "../test-utils";

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]

type StringToUnion<T extends string> = T extends ''
? never
: T extends `${infer F}${infer rest}`
  ? F | StringToUnion<rest>
  : never




