package com.example.usage.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@ImportResource("classpath*:/businessA-service.xml")
public class MyConfig {
}
