declare const ALIGN_OPTIONS: readonly ["start", "center", "end"];
type Align = (typeof ALIGN_OPTIONS)[number];

function test_1() {
    var align: Align = 'start'
    console.log(typeof align)
}

function test_2() {
    type Factory<T> = T | number | string;
    let str: Factory<boolean> = 'aaa'
    let boolean: Factory<boolean> = false
    let num: Factory<boolean> = 111
    //let other: Factory<boolean> = {}
}

function test_3() {
    interface  NameStruct {
        name: string
    }
    interface AgeStruct {
        age: number
    }
    type ProfileStruct = NameStruct & AgeStruct
    const profile: ProfileStruct = {
        name: 'xxx',
        age: 10
    }
}

function test_4() {
    type Struct1 = {
        prop: {
            name: string
        }
    }
    type Struct2 = {
        prop: {
            age: number
        }
    }

    type Composed = Struct1 & Struct2
    type Prop = Composed['prop'] 
    const props: Prop = {
        name: 'xxx',
        age: 123
    }
}

function test_5() {
    interface StringKey {
        [key: string]: string
    }
    // type StringKey {
    //     [key: string]: string
    // }
    const foo: StringKey = {
        'name': 'xxx',
        123: '',  // 123 will be converted into '123'
        age: '12'  // you don't need to use '' to indicate the key is string. the key without '' or "" will be converted into literal key
    }
}

function test_6() {
    type NumberOrBooleanType = {
        [key: string]: number | boolean,
        propA: number,  // the value of propA must be  number or boolean
        propB: boolean, // the value of propB must be  number or boolean
    }

    const test: NumberOrBooleanType = {
        'key1': false,
        age: 21,
        666: 2,
        propA: 123,
        propB: true
    }

    const value: NumberOrBooleanType['propA'] = 123
    const value2: NumberOrBooleanType['age'] = 12
    const value3: NumberOrBooleanType[666] = 13
}

function test_7() {
    type Foo = {
        storm: 1,
        666: 2
    }
    //type FooKeys = keyof Foo  // you cannot see the values
    type FooKeys = keyof Foo & {}  // you can see the values
}

function test_8() {
    type NumberRecord = {
        [key: string]: number
    }
    type ValueType = NumberRecord[string]
    const value1: NumberRecord['key'] = 1234
    const value2: NumberRecord[666] = 1
    const value: ValueType = 123
    //const value: ValueType = 'xxxxx'
}

function test_9() {
    type Foo = {
        propA: number,
        propB: boolean
    }
    type PropAType = Foo['propA']
    type PropBType = Foo['propB']
    //type PropCType = Foo['propC']
}

function test_10() {
    type Foo = {
        propA: number,
        propB: boolean,
        propC: string
    }

    type ValueTypes = Foo[keyof Foo]
}

function test_11() {
    function getProp<T extends object, K extends keyof T>(obj: T, key: K) {
        return obj[key]
    }

    const person = {
        name: 'Jane',
        age: 11
    }

    getProp(person, 'name')
    getProp(person, 'age')
    //getProp(person, 'noname')
}


function test_12() {
    type Person = {
        name: string,
        age: number,
        isMale: boolean
    }

    type Wrapper<T> = {
        [K in keyof T]: string | number | boolean
    }

    const person: Wrapper<Person> = {
        name: 'xxx',
        age: 11,
        isMale: true,
        //aa: 111
    }

}

function test_13() {
    const func  = (input: string) => {
        return input.length > 10
    }

    type Func = typeof func

    const list = [1, 2, 3]
    type ArrayType = typeof list
    type ArrayValue = ArrayType[number]
}

declare const seasonList: ['Spring', 'Summer', 'Autumn', 'Winter'] // how to use declare ?
function test_14() {
    type SeasonType = (typeof seasonList)[number]
    const season: SeasonType = 'Spring'
    //const season2: SeasonType = 'aaa'
}

function test_15() {
    type ResStatus<V extends number> = V extends 200 | 202 | 204 ? 'success' : 'failed'
    const status1: ResStatus<200> = 'success'
}

function test_16() {
    interface Ires<TData extends {}> {
        code: number,
        error?: string,
        data: TData
    }

    const person = {
        name: 'jane',
        age: 11
    }

    function getProp<T extends object, K extends keyof T>(obj: T, key: K) {
        return obj[key]
    }

    getProp(person, 'name')
}

function test_17() {
    class Cat {
        eat(){}
    }
    class Dog {
        eat() {}
        bark() {}
    }

    function feedCat(cat: Cat) {}
    function feedDog(dog: Dog) {}
    feedCat(new Dog())
    //feedDog(new Cat()) // comparing  props and methods inside
}

function test_18() {
    type Result1 = any extends Object ? 1 : 2; // 1 | 2
    type Result2 = unknown extends Object ? 1 : 2; // 2
}
//结论：只关注从类型信息层面出发部分的话，即 原始类型 < 原始类型对应的装箱类型 < Object 类型
function test_19() {
    type Result0 = string extends object ? 1 : 2; // 2
    type Result01 = String extends {} ? 1 : 2;  // 1

    type Result1 = {} extends object ? 1 : 2; // 1
    type Result2 = object extends {} ? 1 : 2; // 1

    type Result3 = object extends Object ? 1 : 2; // 1
    type Result4 = Object extends object ? 1 : 2; // 1

    type Result5 = Object extends {} ? 1 : 2; // 1
    type Result6 = {} extends Object ? 1 : 2; // 1
}

function test_20() {
    class Animal {
        asPet() {}
      }
      
    class Dog extends Animal {
    bark() {}
    }
    
    class Corgi extends Dog {
    cute() {}
    }
    type DogFactory = (args: Dog) => Dog

    function transformDogAndBark(dogFactory: DogFactory) {
        const dog = dogFactory(new Dog()); 
        dog.bark();
    }

    const dog_dog: (args: Dog) => Dog = (dog: Dog) => {
        dog.bark()
        return dog
    }

    const animal_animal: (animal: Animal) => Animal = (animal: Animal) => {
        animal.asPet()
        return animal
    }
    const dog_animal: (dog: Dog) => Animal = (dog: Dog) => {
        dog.bark()
        return dog
    }
    const corgi_animal: (corgi: Corgi) => Animal = (corgi: Corgi) => {
        corgi.cute()
        return corgi
    }

    const animal_dog: (animal: Animal) => Dog = (animal: Animal) => {
        animal.asPet()
        return animal as Dog
    }


}

function test_21() {
    type Person = {
        name: string,
        age?: number
    }
    const person: Person = {
        name: 'Janess'
    }
    console.log('person.age = ', person!.age?.toString)
}

function liveDangerously(x?: number | null) {
    // No error
    console.log(x!.toFixed());
}

function test_22() {
    type Person = {
        name: string,
        age: number
    }
    function print(person: Partial<Person>) {
        console.log(person)
    }

    print({name: 'xxxx'})
}

function test_23() {
    type Person = {
        name?: string,
        age?: number
    }

    function print(person: Required<Person>) {

    }
    print({name: 'xxx', age: 11})
}

function test_24() {
    type Person = {
        name: string,
        age: number
    }
    const person: Readonly<Person> = {name: 'xx', age: 10}
    //person.age = 100
}

function test_25() {
    type Keys = 'zhangsan' | 'lisi' | 'wangwu'
    type Person = {
        name: string,
        age: number
    }
    const stus: Record<Keys, Person> = {
        zhangsan: {name: 'zhangsan', age: 10},
        lisi: {name: 'lisi', age: 11},
        wangwu: {name: 'wangwu', age: 12},
        //xxx: {name: 'xxx', age: 13}
    }
}

function test_26() {
    type Source = {
        key1: String,
        key2: String,
        key3: String
    }
    const content: Pick<Source, 'key1'|'key2'> = {
        key1: 'value1',
        key2: 'value2'
    }
}

function test_27() {
    type Todo = {
        title: string,
        desc: string,
        completed: boolean,
        createdAt: number
    }
    const todo: Omit<Todo, 'completed' | 'createdAt'> = {
        title: 'my todo',
        desc: 'this is my todo'
    }
}

function test_28() {
    type T0 = Exclude<'a' | 'b' | 'c', 'a'| 'c'>
    const t: T0 = 'b'
}

function test_29() {
    type T0 = Extract<1 | 2 | 3, 2>
    const t: T0 = 2
}

function test_30() {
    type T0 = NonNullable<string | number | null | undefined>
    const t: T0 = 2
}

function test_31() {

    type T0 = Parameters<({a, b}: {a: string, b: boolean}) => void>
    type T1 = Parameters<(aa: string[]) => void>
}

function test_32() {
    class C {
        constructor(a: string, b: boolean){}
    }

    type T0 = ConstructorParameters<typeof C>
}

declare function f1(): {a: number, b: boolean}

function test_33() {
    type T0 = ReturnType<() => string>
    type T1 = ReturnType<<T>() => T>
    type T2 = ReturnType<typeof f1>
}

function test_34() {
    class C {}
    type T0 = InstanceType<typeof C>
}

function test_35() {
    function createStreetLight<C extends string>(
        colors: C[],
        defaultColor?: NoInfer<C>,
      ) {
        // ...
      }
      createStreetLight(["red", "yellow", "green"], "red");  // OK
      //createStreetLight(["red", "yellow", "green"], "blue");  // Error
}

function test_36() {
    function toHex(this: Number) {
        return this.toString(16);
    }
    type T0 = ThisParameterType<typeof toHex>
}

function test_37() {
    interface ID<T> {
        (arg: T): T
    }
    function identity<T>(arg: T) {
        return arg
    }
    let fun: ID<string> = identity
}

function test_38() {
    class Animal {
        numLegs: number = 0
    }
    class Cat extends Animal {
        numLegs: number = 4
    }
    class Spider extends Animal {
        numLegs: number = 8
    }
    function createInstance<A extends Animal>(a: new() => A): A {
        return new a()
    }
    console.log(createInstance(Cat).numLegs)
    console.log(createInstance(Spider).numLegs)
}
//test_38()
function test_39() {
    type Person<T> = {
        name: T, 
        age: number
    }

    const person: Person<string> = {
        name: 'Janessa',
        age: 10
    }
}

function test_40() {
    type Person = {
        name: string,
        age: number
    }
    type KeyType = keyof Person  // equal to  type KeyType = 'name' | 'age'

    const key1: KeyType = 'name'
    const key2: KeyType = 'age'
    //const key3: KeyType = 'xxx'
}

function test_41() {
    type OBJ_NUM = {
        [key: number] : boolean
    }
    type OBJ_STR = {
        [key: string] : boolean
    }
    type M1 = keyof OBJ_NUM
    type M2 = keyof OBJ_STR  //string | number  // keep in mind that the key being number or string is treated as string always

}

function test_42() {
    type Predicate = (x: unknown) => boolean
    type K = ReturnType<Predicate>
}

function test_43() {
    function f() {
        return {x: 10, y: 'ok'}
    }

    type M = ReturnType<typeof f>
}

function test_44() {
    type Person = {
        name: string,
        age: number,
        isAlive: boolean
    }

    type NAME  = Person['name']
    type NAME_AGE = Person['name' | 'age']
    type ALL = Person[keyof Person]
}

function test_45() {
    const MyArray = [
        { name: "Alice", age: 15 },
        { name: "Bob", age: 23 },
        { name: "Eve", age: 38 },
      ];
    type Arra = typeof MyArray 
    type ItemType = typeof MyArray[number]
    type NAME = typeof MyArray[number]['name']
    type AGE = typeof MyArray[number]['age']
    //type xxxx = typeof MyArray[number]['xxx']
}

function test_46() {
    interface Email {
        message: string
    }

    type M0 = Email extends {message: any} ? 1 : 0
    type M1 = Email extends {prop: unknown} ? 1 : 0
}

function test_47() {
    type Flatten<T> = T extends unknown[] ? T[number] : T
    type M0 = Flatten<string[]>
    type M1 = Flatten<number>
}

function test_48() {
    type Flatten<T> = T extends Array<infer Item> ? Item : T
    type M0 = Flatten<string[]>
    type M1 = Flatten<number[]>
}

function test_49() {
   type GetReturnType<FUNC> = FUNC extends (...args: any[]) => infer RETURN ? RETURN : never
   type M0 = GetReturnType<() => string>
   type M1 = GetReturnType<(a: string, b: boolean) => number[]>
}

function test_50() {
    const myArray = [1, false, 'test']
    type M0 = typeof myArray
}
declare function fun(): string  
declare function fun(a: string): boolean
declare function fun(a: boolean): string[]
function test_51() {
    type M0 = ReturnType<typeof fun> // inferences are made from the last signature
}

function test_52() {
    type ToArray<T> = T extends any ? T[] : never
    type M0 = ToArray<string | boolean>
}
function test_53() {
    type Person = {
        name: string,
        age: number,
        isMale: boolean
    }
    type Info = {
        [key in keyof Person]: boolean
    } 
}

function test_54() {
    type Person = {
        name: string,
        age: number
    }

    type NAME = Person['name']
}

function test_55() {
    type LockAccount = {
        readonly name: string,
        readonly age: number
    }
    type CreateMutable<T> = {
        -readonly [key in keyof T]: T[key]
    }

    type UnlockAccount = CreateMutable<LockAccount>
}

function test_56() {
    type MaybeUser = {
        name: string,
        age?: number,
        isMale?: boolean
    }
    type Concrete<T> = {
        [key in keyof T]-?: T[key]
    }
    type User = Concrete<MaybeUser>
}
function test_57() {
    type Name = 'Jane' | 'Lisa'
    type Greeting = `hello ${Name}`
}

function test_58() {
    type NUM_Left = 'a' | 'b'
    type OP = '+' | '-'
    type NUM_right = '1' | '2'
    type expression = `${NUM_Left} ${OP} ${NUM_right}` 
}

function test_59() {
    type Person = {
        name: string,
        age: number
    }
    type Getters<T> = {
        [key in keyof T as `{get${Capitalize<string &key>}}`] : T[key]
    }
    type LazyPerson = Getters<Person>
}

function test_60() {
    type Person = {
        name: string,
        age: number,
        description: string,
        isMale: boolean
    }
    type RemoveAge<T> = {
        [key in keyof T as Exclude<key, 'age'>]: T[key]
    }

    type NewPerson = RemoveAge<Person>
}

function test_61() {
    type SquareEvent = {kind: 'square', x: number, y: number}
    type RadiusEvnet = {kind: 'circle', radius: number}
    type ConfigEvent<Events extends {kind: string}> = {
        [E in Events as E['kind']]: (e: E) => void
    }
    type Config = ConfigEvent<SquareEvent | RadiusEvnet>
}

function test_62() {
    type DBFields = {
        id: { format: "incrementing" };
        name: { type: string; pii: true };
    };
    type Convert<T> = {
        [key in keyof T]: T[key] extends {pii: boolean} ? true : false
    }

    type FilteredDBFields = Convert<DBFields>
}

function test63() {
    type res1 = 'xxx' extends string ? 1 : 0
    type res2 = string extends String ? 1 : 0
    type res3 = String extends Object ? 1 : 0
    type res4 = {} extends object ? 1 : 0
    type res5  = [] extends object ? 1: 0
    type res6 = Function extends object ? 1 : 0
    type res7 = (() => void) extends object ? 1 : 0
    type res8 = 1 |2 extends 1 | 2 | 3 ? 1 : 0
    type res9 = {a: string, b: boolean} extends {} ? 1 : 0
    type res10 = {a: string, b: boolean} extends {a: string} ? 1 : 0
    type res11 = {a: string, b: boolean} extends {c: string} ? 1 : 0  //0

    type res12 = string extends unknown ? 1: 0 //1
    type res13 = unknown extends string ? 1 : 0  //0
    type res14 = string extends any ? 1 : 0  //1
    type res15 = any extends string ? 1: 0  // 1 | 0
}

function test_64() {
    type List1 = [1, 2, 3]
    type List2 = []
    type M0 = List1 extends [infer first, ...infer rest] ? true : false;
    type M1 = List2 extends [infer first, ...infer rest]? true : false
}

// function test_63() {
//     type Person = {
//         firstName: "Saoirse",
//         lastName: "Ronan",
//         age: 26
//     }
//     type AddOn = {
//         on(eventName: 'eventName', callback: (newValue: any) => void): void
//     }
//     const addon: AddOn = {
//         on(eventName: 'eventName', callback: (newValue: any) => void): void {}
//     }
//     //addon.on('eventName', (newValue: any) => {})
// }