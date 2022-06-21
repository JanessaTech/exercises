package com.classic.structure.example.classicstructure.vo;

public enum ResultCode implements StatusCode {
    SUCCESS(0, "success"),
    FAILED(1, "failed"),
    VALIDATION_FAILED(2, "invalid parameters");

    ResultCode(int code, String msg) {
        this.code = code;
        this.message = msg;
    }

    private int code;
    private String message;

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public String message() {
        return message;
    }
}
