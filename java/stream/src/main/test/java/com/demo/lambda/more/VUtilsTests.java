package com.demo.lambda.more;

import org.junit.Test;
import static org.junit.Assert.*;

public class VUtilsTests {

    @Test(expected = RuntimeException.class)
    public void isTure() {
        VUtils.isTure(true).throwMessage("test");
    }

    @Test
    public void isTureOrFalse() {
        VUtils.isTureOrFalse(true).
                trueOrFalseHandle(() -> System.out.println("running when true"),
                () -> System.out.println("running when false"));
    }

    @Test
    public void presentOrElseHandle_hello() {
        VUtils.isBlankOrNoBlank("hello").presentOrElseHandle(System.out::println,
                () -> System.out.println("empty str"));
    }

    @Test
    public void presentOrElseHandle_empty() {
        VUtils.isBlankOrNoBlank("").presentOrElseHandle(System.out::println,
                () -> System.out.println("empty str"));
    }




}
