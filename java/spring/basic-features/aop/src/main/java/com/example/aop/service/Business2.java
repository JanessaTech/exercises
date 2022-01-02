package com.example.aop.service;

import com.example.aop.dao.Dao2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Business2 {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private Dao2 dao2;

    public String calculateSomething() {
        String value = dao2.retrieveSomething();
        logger.info("In Business - {}", value);
        return value;
    }
}
