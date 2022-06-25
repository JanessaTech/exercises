package com.example.graphql.entities;

import lombok.Data;

@Data
public class AddPetInput {
    private String name;
    private int age;
}
