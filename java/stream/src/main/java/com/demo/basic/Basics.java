package com.demo.basic;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Basics {

    private static  List<Person> getPersonList() {
        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 30, "female", "Washington"));
        personList.add(new Person("Anni", 8200, 24, "female", "New York"));
        personList.add(new Person("Owen", 9500, 25, "male", "New York"));
        personList.add(new Person("Alisa", 7800, 26, "female", "New York"));

        return personList;
    }
    public static void createStream() {
        //using java.util.Collection.stream()
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        Stream<Integer> stream1 = list.stream();
        Stream<Integer> parallelStream1 = list.parallelStream();

        //using []
        int[] array = {1, 2, 3, 4, 5};
        IntStream stream2 = Arrays.stream(array);

        //using of, iterate, generate
        Stream<Integer> stream3_1 = Stream.of(1, 2, 3, 4, 5);
        stream3_1.forEach(System.out::println);
        Stream<Integer> stream3_2 = Stream.iterate(0, x -> x + 3).limit(3);
        stream3_2.forEach(System.out::println);
        Stream<Integer> stream3_3 = Stream.generate(new Random()::nextInt).limit(3);
        stream3_3.forEach(System.out::println);
    }

    public static void parallelStream() {
        List<String> list = Arrays.asList("aaa", "bbb", "ccc");
        list.stream().parallel().forEach(System.out::println);
        // or list.parallelStream().forEach(System.out::println);
    }

    public static void foreach_find_match() {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6);
        list.stream().forEach(System.out::println);
        Optional<Integer> first = list.stream().findFirst();
        //Optional<Integer> first = list.stream().filter(x -> x > 10).findFirst();
        System.out.println("first element:" + (first.isPresent() ? first.get() : " nonexistent"));
        boolean matched = list.stream().anyMatch( x -> x > 6); // return true if there is at least one element greater than 6
        System.out.println("matched:" + matched);
    }

    public static void filter() {
        List<Integer> list = new ArrayList<Integer>() {{ add(1); add(2); add(3);}};
        // List<Integer> list = Arrays.asList(1, 2, 3);
        list.stream().filter(x -> x > 2). forEach(System.out::println);

        final List<Person> personList = getPersonList();

        List<String> names = personList.stream().filter( x -> x.getSalary() > 8000).map(Person::getName).collect(Collectors.toList());
        System.out.print("who's slalary is greater than 8000? ===> " + names);
    }

    public static void max_min_count() {
        List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5, 6);
        System.out.println("Max = " + list1.stream().max(Comparator.naturalOrder()).get());
        System.out.println("Min = " + list1.stream().min(Comparator.naturalOrder()).get());
        System.out.println("Total number of elements:" + list1.stream().count());

        List<String> stringList = Arrays.asList("adnm", "admmt", "pot", "xbangd", "weoujgsd");
        System.out.println("The longest string is:" + stringList.stream().max(Comparator.comparing(String::length)).get());

        List<Person> personList = getPersonList();
        System.out.println("The person with the highest salery is:" + personList.stream().max(Comparator.comparing(Person::getSalary)).get().getName());
    }

    public static void map_flatMap() {
        String[] strArr = { "abcd", "bcdd", "defde", "fTr" };
        List<String> strArrUp = Arrays.stream(strArr).map(String::toUpperCase).collect(Collectors.toList());
        System.out.println("strArrUp:" + strArrUp);

        List<String> list = Arrays.asList("m,k,l,a", "1,3,5,7");
        List<String> newList = list.stream().flatMap( x ->{
            String[] splits = x.split(",");
            Stream<String> s = Arrays.stream(splits);
            return s;
        }).collect(Collectors.toList());
        System.out.println("The content of newList:" + newList);
    }

    public static void reduce() {
        List<Integer> list = Arrays.asList(1, 2, 3);
        Optional<Integer> sum = list.stream().reduce((a, b) -> a + b);
        //Optional<Integer> sum = list.stream().reduce(Integer::sum);
        Optional<Integer> product = list.stream().reduce((a, b) -> a * b);
        Optional<Integer> max = list.stream().reduce((a, b) -> Math.max(a, b));
        System.out.println("Sum = " + sum.get());
        System.out.println("Product = " + product.get());
        System.out.println("Max = " + max.get());
    }

    public static void collect() {
        List<Integer> list = Arrays.asList(1, 6, 3, 4, 6, 7, 9, 6, 20);
        List<Integer> newList = list.stream().filter( x -> x % 2 ==0).collect(Collectors.toList());
        System.out.println("newList:" + newList);
        Set<Integer> set = list.stream().collect(Collectors.toSet());
        System.out.println("set:" + set);

        List<Person> personList = getPersonList();
        Map<String, Person> map = personList.stream().collect(Collectors.toMap(Person::getName, Function.identity()));
        for(Map.Entry<String, Person> personEntry : map.entrySet()) {
            System.out.println("key: " + personEntry.getKey());
            System.out.println("value:" + personEntry);
        }
    }

    public static void statics() {
        List<Person> personList = getPersonList();

        Long count = personList.stream().collect(Collectors.counting());
        Double average = personList.stream().collect(Collectors.averagingDouble(Person::getSalary));
        Optional<Integer> max = personList.stream().map(Person::getSalary).collect(Collectors.maxBy(Integer::compare));
        Integer sum = personList.stream().collect(Collectors.summingInt(Person::getSalary));
        DoubleSummaryStatistics collect = personList.stream().collect(Collectors.summarizingDouble(Person::getSalary));
        System.out.println("员工总数：" + count);
        System.out.println("员工平均工资：" + average);
        System.out.println("员工工资总和：" + sum);
        System.out.println("员工工资所有统计：" + collect);

    }

    public static void partitioningBy_groupingBy() {
        List<Person> personList = getPersonList();
        Map<Boolean, List<Person>> part = personList.stream().collect(Collectors.partitioningBy(x -> x.getSalary() > 8000));
        Map<String, List<Person>> group = personList.stream().collect(Collectors.groupingBy( p -> p.getSex()));
       // or Map<String, List<Person>> group = personList.stream().collect(Collectors.groupingBy( Person::getSex));
        Map<String, Map<String, List<Person>>> group2 = personList.stream().collect(Collectors.groupingBy(Person::getSex, Collectors.groupingBy(Person::getArea)));

        for(Map.Entry<Boolean, List<Person>> entry : part.entrySet()) {
            System.out.println("key=" + entry.getKey() + "   value=" + entry.getValue());
        }
        System.out.println();

        for(Map.Entry<String, List<Person>> entry : group.entrySet()) {
            System.out.println("key=" + entry.getKey() + "   value=" + entry.getValue());
        }
        System.out.println();

        for(Map.Entry<String, Map<String, List<Person>>> entry : group2.entrySet()) {
            System.out.println("key: " + entry.getKey());
            System.out.println("values : ");
            for(Map.Entry<String, List<Person>> internalEntry : entry.getValue().entrySet()) {
                System.out.println("internal key=" + internalEntry.getKey() + "   internal value=" + internalEntry.getValue());
            }
            System.out.println("---------------------------------------------------");
        }

    }

    public static void joining() {
        List<Person> personList = getPersonList();
        String names = personList.stream().map(Person::getName).collect(Collectors.joining(","));
        System.out.println("All names :" + names);
        List<String> chars = Arrays.asList("A", "B", "C");
        String string = chars.stream().collect(Collectors.joining("-"));
        System.out.println("string = " + string);
    }

    public static void sort() {
        List<Person> personList = getPersonList();
        List<String> list1 = personList.stream().sorted(Comparator.comparing(Person::getSalary)).map(Person::getName).collect(Collectors.toList());
        System.out.println(list1);
        List<String> list2 = personList.stream().sorted(Comparator.comparing(Person::getSalary).reversed()).map(Person::getName).collect(Collectors.toList());
        System.out.println(list2);
        List<String> list3 = personList.stream().sorted(Comparator.comparing(Person::getSalary).thenComparing(Person::getAge)).map(Person::getName).collect(Collectors.toList());
        System.out.println(list3);
        List<String> list4 = personList.stream().sorted((p1, p2) -> {
            if (p1.getSalary() == p2.getSalary()) {
                return p1.getAge() - p2.getAge();
            } else {
                return p1.getSalary() - p2.getSalary();
            }
        }).map(Person::getName).collect(Collectors.toList());
        System.out.println(list4);
    }

    public static void distinct_limit_skip(){
        String[] arr1 = { "a", "b", "c", "d" };
        String[] arr2 = { "d", "e", "f", "g" };

        Stream<String> stream1 = Stream.of(arr1);
        Stream<String> stream2 = Stream.of(arr2);

        List<String> list1 = Stream.concat(stream1, stream2).distinct().collect(Collectors.toList());
        List<Integer> list2 = Stream.iterate( 1, x -> x + 2).limit(5).collect(Collectors.toList());
        List<Integer> list3 = Stream.iterate(1, x -> x + 2).skip(3).limit(5).collect(Collectors.toList());

        System.out.println(list1);
        System.out.println(list2);
        System.out.println(list3);
    }


    public static void main(String[] args) {
        //createStream();
        //parallelStream();
        //foreach_find_match();
        //filter();
        //max_min_count();
        //map_flatMap();
        //reduce(); learn more about reduce
        //collect();
        //statics();
        //partitioningBy_groupingBy();
        //sort();
        distinct_limit_skip();

        /**
         *  Terminal opertions:
         *    - forEach
         *    - find
         *    - match
         *    - max, min, count
         *    - reduce?
         *    - collect (toList, toSet, toMap, joining, partitioningBy, groupingBy, reduce?)
         *
         *  Nonterminal operations:
         *    - filter
         *    - map, flatMap
         *    - sorted
         *    - skip, limit, distinct
         *
         *    See details: https://mp.weixin.qq.com/s/V4dTOx5G3DZoxNXwxwosEw
         */
    }

}
