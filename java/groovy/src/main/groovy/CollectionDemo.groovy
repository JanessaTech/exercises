class CollectionDemo {

    static void test_sort() {
        def list = [new Person(name: "aaa", age: 10), new Person(name: "bbb", age: 7), new Person(name: "vvv", age: 23)]
        list.sort {it.age}.reverse(true)
        //list.sort {it.age}
        list.each {println(it)}
    }

    static void main(String[] args) {
        test_sort()
    }
}
