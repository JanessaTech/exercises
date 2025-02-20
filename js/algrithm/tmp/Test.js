
const Person = function () {
    this.firstName = 'Jane'
    this.lastName = 'Zhao'
}

Person.prototype.fullName = function() {
    return this.firstName + ' '+ this.lastName
}
const person = new Person()
console.log(person.fullName())