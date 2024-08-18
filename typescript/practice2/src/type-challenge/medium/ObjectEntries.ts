import { Equal, Expect } from "../test-utils"

interface Model {
    name: string
    age: number
    locations: string[] | null
  }
  
  type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]
  
  type cases = [
    Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
    Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
    Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
    Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
    Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
  ]

type ObjectEntries<M, T = Required<M>> = {
      [P in keyof T]: [P, T[P] extends never ?  undefined : T[P]]
  }[keyof T]
