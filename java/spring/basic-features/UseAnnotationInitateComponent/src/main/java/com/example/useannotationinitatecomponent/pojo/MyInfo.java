package com.example.useannotationinitatecomponent.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class MyInfo {
    String name;
    int age;
    boolean flag;
}
