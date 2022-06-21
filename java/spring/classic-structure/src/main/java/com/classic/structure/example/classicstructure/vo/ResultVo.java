package com.classic.structure.example.classicstructure.vo;

import lombok.Data;

@Data
public class ResultVo<T> {
    private int code;
    private String message;
    private T data;

    public ResultVo(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ResultVo(T data) {
        this.code = ResultCode.SUCCESS.getCode();
        this.message = ResultCode.SUCCESS.message();
        this.data = data;
    }


    public ResultVo(StatusCode statusCode, T data) {
        this.code = statusCode.getCode();
        this.message = statusCode.message();
        this.data = data;
    }

    public ResultVo(StatusCode statusCode) {
        this.code = statusCode.getCode();
        this.message = statusCode.message();
        this.data = null;
    }
}
