package com.graphql.example.graphqldemo2.dao;

import lombok.Data;

public record Book(Integer id, String title, Integer pages, Rating rating, Author author){}
