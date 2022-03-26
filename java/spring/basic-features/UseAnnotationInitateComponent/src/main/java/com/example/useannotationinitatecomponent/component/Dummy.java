package com.example.useannotationinitatecomponent.component;

import com.example.useannotationinitatecomponent.annotation.PropertyConfig;
import com.example.useannotationinitatecomponent.annotation.PropertyValue;
import org.springframework.stereotype.Component;



@Component
@PropertyConfig
public class Dummy {
    @PropertyValue(name = "Juan Zhao", age = 20, flag = true)
    public void customMethod() {
    }
}
