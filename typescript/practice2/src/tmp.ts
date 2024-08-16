

function test__2() {
    type tt = {a : 1} extends {[P in any] : never} ? 1 : 0

    type Chainable<O = {}> = {
        option<K, V>(key: K, value: V): Chainable<O & {}>
        get(): any
      } 

   
}

function demo3() {
    type fun = (a: string, b: boolean) => void
    type P = Parameters<fun>

    type Reverse<P extends unknown[], acc extends unknown[] = []> = P extends[infer F, ...infer R]
    ? Reverse<R, [F, ...acc]>
    : acc

    type Res = Reverse<P>

}
