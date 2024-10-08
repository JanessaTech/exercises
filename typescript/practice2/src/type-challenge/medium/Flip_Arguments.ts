import { Equal, Expect } from "../test-utils"

type cases = [
    Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
    Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
    Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
  ]
  
  type errors = [
    // @ts-expect-error
    FlipArguments<'string'>,
    // @ts-expect-error
    FlipArguments<{ key: 'value' }>,
    // @ts-expect-error
    FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
    // @ts-expect-error
    FlipArguments<null | undefined>,
  ]

  type Reverse<P extends unknown[], acc extends unknown[] = []> = P extends[infer F, ...infer R]
  ? Reverse<R, [F, ...acc]>
  : acc

  type FlipArguments<F extends Function> = F extends (...args: infer P extends unknown[]) => infer RET 
  ? (...args: Reverse<P>) => RET
  : never