package com.example.testconfiguration;


import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

@TestConfiguration
public class MyTestConfiguration{
    @Bean
    @Primary
    public GreetingService getGreetingService(){
        return new GreetingServiceTestImp();
    }
}
