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
        def list = [new Person(name: 'aaa', translation: ['en': new GameFamilyTranslation(lang: 'en', translation: 'en translation'), 'jp' : new GameFamilyTranslation(lang: 'jp', translation: 'jp translation')]), new Person(name: 'bb',  translation: ['en': new GameFamilyTranslation(lang: 'en', translation: 'en ffr'), 'jp' : new GameFamilyTranslation(lang: 'jp')])]
        def text = 'dd'
        def newList = list.findAll {
            it.translation.values().any {
                it.translation.contains(text)
            }
        }
        print(newList)

    }
}
