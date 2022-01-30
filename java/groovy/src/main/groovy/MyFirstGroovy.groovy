import jdk.nashorn.internal.objects.annotations.Function
// Groovy-Eclipse: Invalid jar path in the compiler settings: '' :
// solution: Settings -> Java Compiler -> Changing from Groovy-Eclipse to Javac fixes the issue.
class MyFirstGroovy {
    def main(){
        print('hello Jane', )
    }

    static void main(def args){
        ['a', 'b', 'c'].eachWithIndex { it, i -> // `it` is the current element, while `i` is the index
            println "$i: $it"
        }
    }
}
