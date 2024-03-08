

//Destructuring an object
function test1() {
    const stu = {
        name: 'JanessaTech',
        age: 21
    }
    function  showInfo({name, age}) {
        console.log('name = ', name)
        console.log('age = ', age)
    }
    showInfo(stu)
}

//Destructuring an array
function test2() {
    const names = ["Frank", "Luke", "Ben", "Tony", "Pete"];
    const printName = ([, secondName, thirdName]) => {
        return `${secondName} & ${thirdName}`
    }
    console.log(printName(names))
}

function  test3() {
    const stu = {
        age: 21
    }
    function  showInfo({name = 'hello name', age}) {
        console.log('name = ', name)
        console.log('age = ', age)
    }
    showInfo(stu)
}

function test4() {
    const stu1 = {
        name: 'JanessaTech',
        age: 21
    }
    const stu2 = {
        age: 22
    }
    function  showInfo({name: newName = 'hello name', age:newAge}) {
        console.log('name = ', newName)
        console.log('age = ', newAge)
    }
    showInfo(stu1)
    showInfo(stu2)
}

//test1()
//test2()
test3()
//test4()