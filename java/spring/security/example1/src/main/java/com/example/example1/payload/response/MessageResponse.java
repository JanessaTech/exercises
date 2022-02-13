package com.example.example1.payload.response;

import lombok.Data;

@Data
public class MessageResponse {
    private String message;
    public MessageResponse(String message) {
        this.message = message;
    }
}
