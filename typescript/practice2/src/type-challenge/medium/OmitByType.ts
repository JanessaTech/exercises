import { Equal, Expect } from "../test-utils"

interface Model {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }
  
  type cases = [
    Expect<Equal<OmitByType<Model, boolean>, { name: string, count: number }>>,
    Expect<Equal<OmitByType<Model, string>, { count: number, isReadonly: boolean, isEnable: boolean }>>,
    Expect<Equal<OmitByType<Model, number>, { name: string, isReadonly: boolean, isEnable: boolean }>>,
  ]
type OmitByType<T, O> = {
    [P in keyof T as T[P] extends O ? never : P]: T[P]
}