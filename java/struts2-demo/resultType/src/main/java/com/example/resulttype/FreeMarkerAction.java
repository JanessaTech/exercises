package com.example.resulttype;

public class FreeMarkerAction implements Action{
    private String name;

    public String execute() throws Exception {
            return SUCCESS;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
