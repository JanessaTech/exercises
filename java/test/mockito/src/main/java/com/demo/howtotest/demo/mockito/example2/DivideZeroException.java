package com.demo.howtotest.demo.mockito.example2;

public class DivideZeroException extends Exception{
    public DivideZeroException(String msg){
        super(msg);
    }
    public DivideZeroException(String msg, Throwable throwable){
        super(msg, throwable);
    }
}
