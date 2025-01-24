import {Expect, Equal, Alike, NotEqual} from "../test-utils";

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

type TrimRight<S> = S extends `${infer R}${' ' | '\n' | '\t'}`
? TrimRight<R>
: S

type TrimLeft<S> =  S extends `${' ' | '\n' | '\t'}${infer R}`
? TrimLeft<R>
: S

type Trim<S extends string> = TrimLeft<TrimRight<S>>