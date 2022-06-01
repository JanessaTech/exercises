package example

class MyFirstKotlin
fun main(args: Array<String>) {
    val sessionId: String? = null
    var active: Boolean = sessionId?.isNotEmpty() == true
    println(active)
}