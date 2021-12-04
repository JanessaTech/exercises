package com.demo.howtotest.demo.mockito.example2;

public class CalculatorApp {

    public CalculatorService getCalculatorService() {
        return calculatorService;
    }

    public void setCalculatorService(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    //show how to use setting/field injection
    private CalculatorService calculatorService;

    public double add(double a, double b) {
        return calculatorService.add(a, b);
    }

    public double subtract(double a, double b) {
        return calculatorService.subtract(a, b);
    }

    public double multiply(double a, double b){
        return calculatorService.multiply(a, b);
    }

    public double divide(double a, double b) throws DivideZeroException {
        return calculatorService.divide(a, b);
    }
}
