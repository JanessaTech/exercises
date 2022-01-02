class demo1 {
    static void test1() {
        def map = [:]
        map.put(1, [1, 2, 3])
        map.put(2, [2, 3, 4])
        def values = map.values().flatten().unique(false) as List<Integer>
        print(values)
    }

    static void test2() {
        def originalList = [1, 2, 4, 9, 7, 10, 8, 6, 6, 5]
        def newUniqueList = originalList.unique()
        println(originalList)
        println(newUniqueList)
        // you can see that .unique() will change originalList
    }

    static void test3() {
        def originalList = [1, 2, 4, 9, 7, 10, 8, 6, 6, 5]
        def newUniqueList = originalList.unique(false)
        println(originalList)
        println(newUniqueList)
        // you can see that .unique(false) will not change originalList

        //Differentiation between unique() and unique(false) : the second one does not modify the original list
    }

    static void test4() {
        def mapping = [1 : 'aaaaa', 2:'bb']
        Map<Integer, Integer> newMap = mapping.collectEntries { key, value ->
            [key,  value.length()]
        } as Map<Integer, Integer>

        newMap.each {it ->
            println('key=' + it.key + "  value=" + it.value)
        }


    }
    static void main(def args){
        //test1()
        //test2()
        //test3()
        test4()
    }
}
