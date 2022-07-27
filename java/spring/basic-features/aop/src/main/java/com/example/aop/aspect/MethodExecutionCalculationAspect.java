package com.example.aop.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MethodExecutionCalculationAspect {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Around("@annotation(com.example.aop.annotation.TrackTime)")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();

        Object res = joinPoint.proceed();  // we should return res, otherwise, the method annotated with TrackTime cannot return the correct result

        long timeTaken = System.currentTimeMillis() - startTime;
        logger.info("Time Taken by {} is {}", joinPoint, timeTaken);
        return res;
    }
}
