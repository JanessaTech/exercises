package example.higherOrder

fun sum(a: Int, b: Int) :Int {
    return a + b;
}

fun cal(a: Int, b: Int, op: (Int, Int) -> Int): Int {
    return op(a, b)
}

fun cal2(): (Int, Int) -> Int {
    return ::sum
}

fun main(args: Array<String>) {
    val r1 = cal(2, 3, ::sum)
    val  r2 = cal2()(4, 5)
    println("r1 = $r1")
    println("r2 = $r2")
}