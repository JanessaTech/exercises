package com.demo.lambda.functions;

import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;
import java.util.stream.Stream;

public class Test {
    public static void test_Consumer() {
        Stream<String> source = Stream.of("aa", "bb", "cc");
        Consumer<String> consumer = s -> System.out.println(s);
        source.forEach(consumer);

    }

    public static void test_Supplier() {
        Supplier<Integer> supplier = () -> 5;
        Stream<Integer> stream = Stream.of(1, 2, 3, 4);
        Integer value = stream.filter(x -> x > 4).findFirst().orElseGet(supplier);
        System.out.println(value);
    }

    public static void test_Predicate() {
        Stream<Integer> stream = Stream.of(1, 2, 3, 4);
        Predicate<Integer> predicate = x -> x %2 == 0;
        stream.filter(predicate).forEach(System.out::println);
    }

    public static void test_Function() {
        Stream<String> stream = Stream.of("aa", "bbb", "cccc", "ddddd");
        Function<String, Integer> function = x -> x.length();
        stream.map(function).forEach(System.out::println);

    }
    public static void main(String[] args) {
        //test_Consumer();
        //test_Supplier();
        //test_Predicate();
        test_Function();
    }
}
