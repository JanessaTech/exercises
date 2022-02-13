import jdk.nashorn.internal.objects.annotations.Function
// Groovy-Eclipse: Invalid jar path in the compiler settings: '' :
// solution: Settings -> Java Compiler -> Changing from Groovy-Eclipse to Javac fixes the issue.
class MyFirstGroovy {
    def main(){
        print('hello Jane', )
    }

    static void main(def args){
         def list = [new Person(name: "a", age:10), new Person(name: "a", age:4), new Person(name: "a", age:7), new Person(name: "a", age:3)]
        def res = list.findAll {it.age > 5}.each {it.age = 100}
        println("ee")
    }
}
