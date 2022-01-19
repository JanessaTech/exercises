package com.example.strategy;

public class Calculator {
    private Operation operation;
    void setOperation(Operation op) {
        this.operation = op;
    }

    int doOperate(int param1, int param2) {
        return operation.operate(param1, param2);
    }
}
