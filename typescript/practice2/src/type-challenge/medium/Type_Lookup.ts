import { Equal, Expect } from "../test-utils"

interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }
  
  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }
  
  type Animal = Cat | Dog
  
  type cases = [
    Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
    Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
  ]

type LookUp<T extends {type: string}, key extends string> =  T extends any
? T['type'] extends key
 ? T
 : never
: never