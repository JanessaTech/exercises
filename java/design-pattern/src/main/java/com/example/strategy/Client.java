package com.example.strategy;

public class Client {

    private static void cal(Calculator calculator, int a, int b) {
        int res = calculator.doOperate(a, b);

        System.out.println(String.format("param1=%d  param2=%d   result=%d", a, b, res));
    }
    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        Operation add = new AddOpertion();
        calculator.setOperation(add);

        int a = 2; int b = 3;

        cal(calculator, a, b);

        Operation subtract = new SubtractOperation();
        calculator.setOperation(subtract);
        cal(calculator, a, b);
    }
}
