package com.demo.lambda.doublecolon;


import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;


// See for details: https://www.geeksforgeeks.org/double-colon-operator-in-java/
public class Person extends SuperPerson{
    public Person() {}
    @Override
    public void superMethod(String msg) {
        Consumer<String> superMethod = super::superMethod;
        superMethod.accept(msg);
    }
    public Person(String name) {
        System.out.println("constructor is called. name=" + name);
    }
    public static void staticMethod(String msg) {
        System.out.println("staticMethod is called. msg =" + msg);
    }

    public void instanceMethod(String msg) {
        System.out.println("instanceMethod is called. msg = " + msg);
    }
    
    public static void main(String[] args) {
        //Usage1: SomeClass::someStaticMethod
        Consumer<String> staticMethod = Person::staticMethod;
        staticMethod.accept("Jane");

        //Usage2: objectOfClass::methodName
        Consumer<String> stringConsumer1 = new Person()::instanceMethod;
        stringConsumer1.accept("Jane1");

        //Usage3: super::someSuperClassMethod
        Consumer<String> stringConsumer2 = new Person()::superMethod;
        stringConsumer2.accept("Jane2");

        //Usage4: SomeClass::someInstanceMethod
        BiConsumer<Person, String> instanceMethod = Person::instanceMethod;
        instanceMethod.accept(new Person(), "Jane2");

        //Usage5: ClassName::new
        Function<String, Person> runnable = Person::new;
        runnable.apply("Jane");
    }
}
