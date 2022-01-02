import jdk.nashorn.internal.objects.annotations.Function
// Groovy-Eclipse: Invalid jar path in the compiler settings: '' :
// solution: Settings -> Java Compiler -> Changing from Groovy-Eclipse to Javac fixes the issue.
class MyFirstGroovy {
    def main(){
        print('hello Jane', )
    }

    static void main(def args){
        def map = [:]
        map.put(1, [1, 2, 3])
        map.put(2, [2, 3, 4])
        def values = map.values().flatten().unique(false) as List<Integer>
        print(values)
    }
}
