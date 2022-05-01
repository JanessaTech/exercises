package bug

class Child extends Parent{
    public static void main(def args) {
        Child c = new Child()
        println(c.parentMethodC())
    }
}
