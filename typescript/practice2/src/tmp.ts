

function test__2() {
    type tt = {a : 1} extends {[P in any] : never} ? 1 : 0

    type Chainable<O = {}> = {
        option<K, V>(key: K, value: V): Chainable<O & {}>
        get(): any
      } 

   
}

function demo() {
    type M0 = {name: 'xxx', age: 11} | {name: 'xxx', age: 11} extends {name: 'xxx'} ? 1 : 0
    type M1 = {name: 'xxx', age: 11} | {name: 'yyy', age: 11} extends {name: 'xxx'} ? 1 : 0
    type P = {name: 'xxx', age: 11} | {name: 'yyy', age: 11}
    type Check<P> = P extends {name: 'xxx'} ? 1 : 0
    type M2 = Check<P>

function demo3() {
    type M = 1 | 2 | 3 
    type T<M> = 1 extends M
    ? M extends 1
        ? 1
        :  M extends 2 ? 4 : 5 
    : 'no'

    type R = T<M>
}
