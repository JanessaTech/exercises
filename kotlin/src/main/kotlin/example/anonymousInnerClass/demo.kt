package example.anonymousInnerClass

interface  Human {
    fun think()
}
fun main(args: Array<String>) {

    val person = object:Human {
        override fun think() {
            println("I am a person")
        }
    }

    person.think()
}