import { Equal, Expect, NotEqual } from "../test-utils"




type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi', true: 'bool' }, Flip<{ pi: 3.14, bool: true }>>>,
  Expect<Equal<{ val2: 'prop2', val: 'prop' }, Flip<{ prop: 'val', prop2: 'val2' }>>>,
]
type AllowedTypes = string | number | boolean;
type Flip<T> = {
    [P in keyof T as T[P] extends AllowedTypes ? `${T[P]}` : never]: P
}