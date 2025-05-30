import { Equal, Expect } from "../test-utils"

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]

type StringToUnion<T extends string> =  T extends `${infer F}${infer R}`
? F | StringToUnion<R>
: never


// type StringToUnion<T extends string, acc = never> = T extends `${infer F}${infer R}`
// ? StringToUnion<R, acc | F>
// : acc

//type StringToUnion<T extends string>  = any
