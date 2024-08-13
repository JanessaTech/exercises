function test1() {
    type List1 = [1, 2, 3]
    type List2 = []
    type M0 = List1 extends [infer first, ...infer rest] ? true : false;
    type M1 = List2 extends [infer first, ...infer rest]? true : false

}

function test2() {
    type GetParams<FUN extends Function> = FUN extends (...args: infer P) => any ? P : never
    type P1 = GetParams<(a: boolean, b: string) => void>
}
