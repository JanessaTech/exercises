interface Person {
    name: string
    age: number
    say: () => void
}

class Student implements Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
        console.log( this.constructor.name)
    }
    say =  () => {
        console.log('I am a student')
       
    }
}

class Teacher implements Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    say =  () => {
        console.log('I am teacher', this.name)
    }
}

const stu: Student = new Student('Jane', 12)
const teacher: Teacher = new Teacher('Wang', 30)
stu.say()
teacher.say()


