package example.TypeAliases

import java.util.*

typealias User = Triple<String, Int, Date>

fun getInfo() : User {
    return Triple("Jane", 10, Date())
}


fun main(args: Array<String>) {

    val user = getInfo()

    println(user)

}