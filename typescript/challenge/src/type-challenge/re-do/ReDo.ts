import { Alike, Equal, Expect, ExpectExtends, NotAny } from "../test-utils"

type User = {
  id : string;
  name: string;
  age ?: number;
  phone ?: string
}

type RequiredTypes<T> = {
  [K in keyof T] -?: T extends Record<K, T[K]> ? K : never
}[keyof T]
type test = RequiredTypes<User>