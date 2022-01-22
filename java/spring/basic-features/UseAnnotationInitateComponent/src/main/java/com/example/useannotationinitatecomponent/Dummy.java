package com.example.useannotationinitatecomponent;

import org.springframework.stereotype.Component;

@ConfigContainer(value = {
         @Config(name = "jane", age = 20),
         @Config(name = "wei", age = 30)
})
@Component
public class Dummy {}
