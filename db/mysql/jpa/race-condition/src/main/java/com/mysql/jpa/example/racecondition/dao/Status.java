package com.mysql.jpa.example.racecondition.dao;

public enum Status {
    pending("pending"),
    ok("ok"),
    error("error");

    private String name;

    Status(String name) {
        this.name = name;
    }

    String getName() {
        return this.name;
    }
}
