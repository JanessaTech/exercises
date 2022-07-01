package example.lambda

inline fun myFunction(cls: () -> Unit) { // Unit can be Any
    println("I am inline function - A")

    cls()

    println("I am inline function - B")
}


fun main(args: Array<String>) {

    myFunction { println("hello world") }  // don't need () if only one parameter which is a function
}