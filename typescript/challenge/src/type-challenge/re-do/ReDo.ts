import { Alike, Equal, Expect } from "../test-utils"

type User = {
  id: number;
  name: string;
  age ?: number;
  phone ?: string
}

type RequiredKeys<T> = {
  [K in keyof T]-? : T extends Record<K, T[K]> ? K : never
}[keyof T]

type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>

type test = RequiredKeys<User>
type test2 = OptionalKeys<User>