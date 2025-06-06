import { Equal, Expect } from "../test-utils"

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

type MapTypes<T, M extends {[p in 'mapFrom' | 'mapTo'] : unknown}> = {
    [P in keyof T] : T[P] extends M['mapFrom'] 
    ? M extends {mapFrom : T[P]}
        ? M['mapTo']
        : never
    : T[P]
}

// type MapTypes<T, R extends {mapFrom: any, mapTo: any}> = {
//     [P in keyof T]: T[P] extends R['mapFrom']
//     ? R extends any
//       ? R['mapFrom'] extends T[P]
//         ? R['mapTo']
//         : never
//       : never
//     : T[P]
//   }

// type MapTypes<T, M> =any