
type StuType = Stu & {name: 'typeA'}

class Stu {
    age: number
    constructor(_age: number) {
        this.age = _age
    }
}

const student:StuType = Object.assign(new Stu(17), {name: 'typeA' as const })
console.log(student.age) //17
console.log(student.name) //typeA
console.log(student instanceof Stu)  //true