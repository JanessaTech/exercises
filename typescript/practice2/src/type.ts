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
    
}