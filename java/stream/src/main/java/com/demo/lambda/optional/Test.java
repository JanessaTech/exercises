package com.demo.lambda.optional;

import java.util.Optional;

public class Test {
    static String B() {
        System.out.println("B()...");
        return "B";
    }

    public static void test_orElse_orElseGet() {
        System.out.println(Optional.of("A").orElse(B()));
        System.out.println(Optional.of("A").orElseGet(() -> B()));
        System.out.println("========================================");
        System.out.println(Optional.ofNullable(null).orElse(B()));
        System.out.println(Optional.ofNullable(null).orElseGet(() -> B()));
        System.out.println("========================================");
        System.out.println(Optional.empty().orElse(B()));
        System.out.println(Optional.empty().orElseGet(() -> B()));

        /**
         * Conclusion:
         * - orElse always runs no matter the previous optional object has value or not
         * - orElseGet is lazy. it runs only when the previous optional object has null value(Optional.isPresent() == false)
         * - For orElse,
         *     1. final result is other set by orElse if the previous optional object is null(Optional.isPresent() == false)
         *     2. final result is the get() if the previous optional object is not null (Optional.isPresent() == false)
         * - For orElseGet,
         *     1. final result is got by executing Supplier in orElseGet if the previous optional object is null(Optional.isPresent() == false)
         *     2. final result is the get() if the previous optional object is not null (Optional.isPresent() == false)
         */
    }

    public static void test_orElseThrow() throws Exception {
        String name = (String) Optional.empty().orElseThrow(() -> new IllegalArgumentException("rowCount not present"));
    }

    public static void test_ifPresent() {
        Optional<String> name1 = Optional.of("Jane");
        name1.ifPresent(name -> System.out.println(name));
        Optional<String> name2 = Optional.ofNullable(null);
        name2.ifPresent(name -> System.out.println(name));
    }
    public static void main(String[] agrs) {
        //test_orElse_orElseGet
        /*
        try {
            test_orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
        }*/
        test_ifPresent();
    }
}
