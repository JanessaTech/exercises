import java.util.function.Function
import java.util.stream.Collectors

class CollectionDemo {

    static void test_sort() {
        def list = [new Person(name: "aaa", age: 10), new Person(name: "bbb", age: 7), new Person(name: "vvv", age: 23)]
        list.sort {it.age}.reverse(true)
        //list.sort {it.age}
        list.each {println(it)}
    }

    static void test_Comparator() {
        def list = [-10, -1, 0, 4, 7]
        Comparator cp = {a, b -> Math.abs(a) - Math.abs(b)}
        //println(list.max {a, b -> Math.abs(a) - Math.abs(b)})
        println(list.max(cp))
    }

    static void test_shortcut() {
        def map  = ['jane' : new Person(name: 'jane zhao', age: 30)]
        println(map.get('jane')?.name ?: "default")
    }

    static void test_mapKey() {
        def key = 'jane'
        def map1 = [key : 38]  // map key is string by default
        def map2 = [(key) : 38]  // we could escape the key by using parenthesis
        println(map1.get('jane'))
        println(map1.get('key'))
        println(map2.get('jane'))

        // 3 ways to getting value of a key
        def map = [name : 'jane']
        println(map.get('name'))
        println(map['name'])
        println(map.name)
    }

    static void test_map_clone() {
        def map = [
                simple : 123,
                complex: [a: 1, b: 2]
        ]
        def map2 = map.clone()  // shadow clone
        assert map2.get('simple') == map.get('simple')
        assert map2.get('complex') == map.get('complex')
        map2.get('complex').put('c', 3)
        assert map.get('complex').get('c') == 3  // to verify it is shadown clone
    }

    static void test_iterate_map(){
        def map = [aaa : 12, bbbbbb: 17]
        def newMap = map.collectEntries { key, value ->
            ["new-$key", value]
        } as Map<String, Integer>

        newMap.each {println(it)}

        map.find{it.key == 'aaa'}.each {println(it)}

    }

    static void test_list_to_map() {
        List<String> list = ['aa', 'bb', 'ccc', 'dddd', 'eee','fff']
        def map = list.stream().collect(Collectors.toMap({String it -> it.length()}, Function.identity(), { a, b -> [a, b].flatten()}))

        map.each {println(it)}
    }

    static void main(String[] args) {
        //test_sort()
        //test_Comparator()
        //test_mapKey()
        //test_map_clone()
        //test_iterate_map()
        test_list_to_map()




    }
}
