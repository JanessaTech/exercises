
function foo(arg: string): number {
    return arg.length
}
function foo1(input: {}): void {

}

function test() {
    type r = {} extends {[p in any]: never} ? 1: 0
    type r1 = {a: 8} extends {[p in any]: unknown} ? 1 : 0
    type r2 = [] extends [] ? 1 : 0
    type r3  = [1, 2] extends unknown[] ? 1 : 0
    type M = [1, 2, 3] | [2, 3,4] extends unknown[] ? 1 : 0
    type r4 = 1 | 2 | 3 | never
    type r5 = 1 extends 1 | 2 | 3 ? 1 : 0

    type fun = typeof foo
    type r6 = fun extends (...args: infer P) => infer R ? R : 0
    type list = [1, 2, 3]
    type r7 = list extends [infer first, ...infer rest] ? rest : 0
    type r8 = 'hello' extends `${infer F}${any}` ? F : 0
    type un = 'a' | 'b' | 'c'
    type r9 = un extends infer E | 'b' ? E : 0
    type arr = [1, 2, 3]
    type r10 = arr extends Array<infer E> ? E : 0
    type r11 = arr[number]
    type op1 = 'a' | 'b' | 'c'
    type op2 = 'b' | 'c' | 'd'
    type union = op1 | op2
    type inter = op1 & op2
    type M2= {a: string, b: boolean} extends {a: string} ? 1 : 0
    type M1= 'aa' | true | 'cc' extends string ? 1 : 2 
    type M3 = 'aa' extends string | boolean | number ? 1 : 0

}

function demo() {
    type getReturnType<FUN> = FUN extends (...args: any[]) => infer R ? R : never
    type r1 = getReturnType<(a: string, b: boolean) => number[]>

    type DOUBLE<T extends string> = T extends any ? `${T}-${T}` : never
    type double = DOUBLE<'a' | 'b'>

    type Person = {
        readonly name: string,
        readonly age: number
    }
    type NP<T> = {
        -readonly [key in keyof T]: T[key]
    }
    type newPerson = NP<Person>
    
    type MaybeUser = {
        name?: string
        age?: number
    }
    type MUST<U> = {
        [key in keyof U]-?: U[key]
    }
    type USER = MUST<MaybeUser>
}

function demo1() {
    type names = 'zhangsan' | 'wangwu' | 'JanessaTech'
    type message = `hello ${names}`

    type Person = {
        name: string,
        age: number,
        gender: boolean,
        addr: ''
    }
    type NPerson<T> = {
        [K in keyof T as Exclude<K, 'addr'>]: T[K]
    }
    type np = NPerson<Person>

    type Getter<P> = {
        [K in keyof P as `get${Capitalize<string &K>}`]: P[K]
    }
    type getter = Getter<Person>
    type SquareEvent = {kind: 'square', x: number, y: number}
    type RadiusEvent = {kind: 'circle', radius: number}
    type ConfigEvent<E extends {kind: string}> = {
        [K in E as K['kind']] : (e: K) => void
    }
    type Config = ConfigEvent<SquareEvent | RadiusEvent>
    type DBFields = {
        id: { format: "incrementing" };
        name: { type: string; pii: true };
    };
    type Convert<T> = {
        [K in keyof T]: T[K] extends {pii: true } ? true : false
    }
    type convert = Convert<DBFields>

    type M0 = {
        [K in keyof Person]: [K, Person[K]]
    }[keyof Person]

    type Prefix<P> = {
        [K in keyof P as `key-${string &K}`]: P[K]
    }

    type PerfixPerson = Prefix<Person>

    type RemoveAge<P> = {
        [K in keyof P as Exclude<K, 'age'>]: P[K]
    }
    type removeAge = RemoveAge<Person>
    type FilterAge<P> = {
        [K in keyof P as K extends 'age' ? K : never]: P[K]
    }
    type filterAge = FilterAge<Person>
}

test()