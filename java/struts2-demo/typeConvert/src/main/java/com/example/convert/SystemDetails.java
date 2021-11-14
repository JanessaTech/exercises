package com.example.convert;

import com.opensymphony.xwork2.ActionSupport;

public class SystemDetails extends ActionSupport {
    private User user = new User("Juan");
    private String operatingSystem = "Windows7";
    public String execute() {
        return SUCCESS;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOperatingSystem() {
        return operatingSystem;
    }

    public void setOperatingSystem(String operatingSystem) {
        this.operatingSystem = operatingSystem;
    }
}
