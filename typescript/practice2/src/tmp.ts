

function test__2() {
    type tt = {a : 1} extends {[P in any] : never} ? 1 : 0

    type Chainable<O = {}> = {
        option<K, V>(key: K, value: V): Chainable<O & {}>
        get(): any
      } 

   
}

function demo3() {
    type Check<T> = T extends {[P in any]: unknown} ? 1 : 0
    type M = Check<{name : 'Jane'}>  //1

}
