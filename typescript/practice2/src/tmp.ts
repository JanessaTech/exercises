

function test_2() {
    type fun = (a: number, b: string) => number
    type M0 = fun extends (...args: infer P) => number ? P : never
}
