package com.example.convert;

import org.apache.struts2.util.StrutsTypeConverter;

import java.util.Map;

public class UserConverter extends StrutsTypeConverter {
    @Override
    public Object convertFromString(Map map, String[] values, Class aClass) {
        for(String v: values){
            System.out.println(v);
        }
        return new User(values[0]);
    }

    @Override
    public String convertToString(Map map, Object o) {
        User user = (User) o;
        return user.getName();
    }
}
