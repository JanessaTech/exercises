package com.graphql.example.graphqldemo2.dao;

public record Author(Integer id, String firstName, String lastName) {
    public String fullName() {
        return firstName +" " +lastName;
    }
}
