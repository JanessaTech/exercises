package com.example.helloworld;

public class HelloWorldAction implements Action{
    private String name;

    public String execute() throws Exception {
        if(name.equals("Juan")){
            return SUCCESS;
        }
        return ERROR;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}