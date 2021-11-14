package com.example.validation;

import com.opensymphony.xwork2.ActionSupport;

public class Employee extends ActionSupport{
    private String name;
    private int age;
    public String execute() throws Exception {
        return SUCCESS;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
    public void validate() {
        if(name == null || name.trim().equals("")){
            addFieldError("name", "The Name is required");
        }
        if(age < 10 || age > 30){
            addFieldError("age", "The Age must be between 10 and 30");
        }
    }
}
