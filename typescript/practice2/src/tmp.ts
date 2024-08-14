

function test__2() {
    type tt = {a : 1} extends {[P in any] : never} ? 1 : 0

    type Chainable<O = {}> = {
        option<K, V>(key: K, value: V): Chainable<O & {}>
        get(): any
      }

   
}

function demo3() {
    type List0 = [1, 2, 3]
type List1 = [1]
type List2 = []
type M0 = List0 extends [infer first, ...infer rest] ? true : false;  //true, first is 1, rest is [2, 3]
type M1 = List1 extends [infer first, ...infer rest]? true : false  // true
type M2 = List2 extends [infer first, ...infer rest]? true : false  // false
    
}
