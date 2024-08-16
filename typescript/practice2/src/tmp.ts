

function test__2() {
    type tt = {a : 1} extends {[P in any] : never} ? 1 : 0

    type Chainable<O = {}> = {
        option<K, V>(key: K, value: V): Chainable<O & {}>
        get(): any
      } 

   
}

function demo3() {
    type Person = {
        name: string,
        age: boolean
    }
    type Filter<T> = {
        [P in keyof T as P extends 'age'? P : never]: T[P]
    }
    type NewPerson = Filter<Person>

}
