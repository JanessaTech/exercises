import data.FreeSpinBonusDto
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper
import jdk.nashorn.internal.objects.annotations.Function

import java.util.stream.Collector

// Groovy-Eclipse: Invalid jar path in the compiler settings: '' :
// solution: Settings -> Java Compiler -> Changing from Groovy-Eclipse to Javac fixes the issue.
class MyFirstGroovy {
    def main(){
        print('hello Jane', )
    }

    static void main(def args){
        def aa = [-3, -2, -1, 0,  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        def page = 1
        def size = -3
        print(aa.findAll {it > 0}.stream().skip((page - 1) * size).limit(size).toArray())
        //print(aa.subList((page - 1) * size, Math.min(page * size, aa.size())))




    }
}
