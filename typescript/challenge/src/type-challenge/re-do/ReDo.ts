import { Alike, Equal, Expect } from "../test-utils"

  

type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string, mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string, mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string, skipParsingMe: boolean }, { mapFrom: string, mapTo: number }>, { stringToNumber: number, skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string, mapTo: Date } | { mapFrom: string, mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string, mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>, mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean, mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string, date: Date }, { mapFrom: string, mapTo: boolean } | { mapFrom: Date, mapTo: string }>, { name: boolean, date: string }>>,
]



type MapTypes<T, M extends {[P in 'mapFrom' | 'mapTo'] : unknown}> = {
  [K in keyof T] : T[K] extends M['mapFrom']
    ? M extends any
      ? M extends {mapFrom: T[K]}
        ? M['mapTo']
        : never
      : never
    : T[K]
}