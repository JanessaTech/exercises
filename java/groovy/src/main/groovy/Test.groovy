class Test {
    static void main(def args){
        def list1 = ['aa', 'bb', 'cc']
        def list2 = ['cc', 'dd']
        def list = list1.minus(list2)
        println(list)

    }
}
