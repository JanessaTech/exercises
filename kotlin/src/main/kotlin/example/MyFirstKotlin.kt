package example

sealed class Person {
    class Woman : Person()
    class Man : Person()
}

fun main(args: Array<String>) {
    val human: Person = Person.Woman()
    val str = when (human) {
        is Person.Man -> "man"
        is Person.Woman -> "woman"
        else -> " no"
    }

    println(str)
}



