package com.graphql.example.graphqldemo2.dao;

public enum Rating {
    FIVE("5"),
    FOUR("4"),
    THREE("3"),
    TWO("2"),
    ONE("1");

    private String star;

    Rating(String star) {
        this.star = star;
    }

    public String getStar() {
        return star;
    }
}
