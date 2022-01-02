package com.example.aop.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

/**
 * There are  five types of AOP advices:
 *   - Before Advice
 *   - After Advice
 *   - Around Advice
 *   - After Throwing
 *   - After Returning
 *   After Advice = After Throwing + After Returning
 *   Around Advice = Before Advice + After Advice
 *
 */
@Aspect
@Configuration
public class UserAccessAspect {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Before("execution(* com.example.aop.service.*.*(..))")
    public void before(JoinPoint joinPoint) {
        //Advice
        logger.info(" Check for user access ");
        logger.info(" Allowed execution for {}", joinPoint);
    }

    @AfterReturning(value = "execution(* com.example.aop.service.*.*(..))",
            returning = "result")
    public void afterReturning(JoinPoint joinPoint, Object result) {
        logger.info("{} returned with value {}", joinPoint, result);
    }

    /*
    @After(value = "execution(* com.example.aop.service.*.*(..))")
    public void after(JoinPoint joinPoint) {
        logger.info("after execution of {}", joinPoint);
    }*/
}
