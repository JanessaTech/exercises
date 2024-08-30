

function test__2() {
    type tt = {a : 1} extends {[P in any] : never} ? 1 : 0

    type Chainable<O = {}> = {
        option<K, V>(key: K, value: V): Chainable<O & {}>
        get(): any
      } 

   
}

function demo() {
    type M = {
        [key: string]: number
    }
    const foo: M = {
        124: 1,
        name: 3,
        'age': 23
    }
}

demo()