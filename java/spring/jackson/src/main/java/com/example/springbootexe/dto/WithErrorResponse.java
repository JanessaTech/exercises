package com.example.springbootexe.dto;

public interface WithErrorResponse {
    String getError();

    int getErrorCode();

    default boolean hasError() { return getError() != null; }
}
