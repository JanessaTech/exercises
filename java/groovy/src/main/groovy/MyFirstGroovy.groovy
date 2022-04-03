import data.FreeSpinBonusDto
import data.GameFamilyTranslation
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper

import java.util.function.Function
import java.util.regex.Matcher
import java.util.stream.Collector
import java.util.stream.Collectors

// Groovy-Eclipse: Invalid jar path in the compiler settings: '' :
// solution: Settings -> Java Compiler -> Changing from Groovy-Eclipse to Javac fixes the issue.
class MyFirstGroovy {
    static String build(final Locale locale, final String text, final Map<String, Object> args) {
        def content = text

        args.each {
            String key = "\\{${it.key}\\}".toString()
            if (it.value != null) {
                content = content.replaceAll(key, Matcher.quoteReplacement(it.value.toString()))
            }
            else {
                content = content.replaceAll(key, '')
            }
        }
        content
    }

    static void main(def args){
        def text = 'Hi, {nickname}, this is your verification code'
        def map = ['nickname': 'Juan']
        def res = build(null, text, map)
        println(res)

    }
}
