package com.example.asynaop.aspect;

import com.example.asynaop.annotation.Upload;
import com.example.asynaop.service.ThreadPoolService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.Callable;
import java.util.concurrent.Future;

@Component
@Aspect
@Slf4j
public class AsynUploadAspect {
    @Autowired
    private ThreadPoolService threadPoolService;

    @Around("@annotation(com.example.asynaop.annotation.Upload)")
    public Object Around(ProceedingJoinPoint joinPoint) {
        log.info("Enter Around method in AsynUploadAspect");
        MethodSignature signature = (MethodSignature)joinPoint.getSignature();

        boolean hasUploadAnnotation = signature.getMethod().isAnnotationPresent(Upload.class);
        Object[] args = joinPoint.getArgs();
        String fileName = (String)args[0];
        if (hasUploadAnnotation) {
            log.info("Begin uploading {} ....", fileName);
            Future<String> future = threadPoolService.submit(new Callable<String>() {
                @Override
                public String call() throws Exception {
                    log.info("Thread {} is uploading file {}", Thread.currentThread().getName(), fileName);
                    /**
                     * uploading file
                     */
                    Thread.sleep(5000);

                    log.info("Thread {} is finished with uploading file {}", Thread.currentThread().getName(), fileName);
                    return fileName + " is uploaded";
                }
            });
        }

        Object res = null;

        try {
            res = joinPoint.proceed();
        } catch (Throwable e) {
            e.printStackTrace();
        }

        log.info("Exit before Around in AsynUploadAspect");
        return res;
    }
}
