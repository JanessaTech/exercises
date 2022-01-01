package com.demo;

public class JsonSerializationException extends Exception{
    public JsonSerializationException(String msg) {
        super(msg);
    }

    public JsonSerializationException(String msg, Throwable throwable) {
        super(msg, throwable);
    }
}
