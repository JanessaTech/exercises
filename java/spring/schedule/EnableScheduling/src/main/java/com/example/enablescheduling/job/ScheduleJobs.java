package com.example.enablescheduling.job;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
public class ScheduleJobs {
    @Scheduled(fixedDelay = 2 * 1000)
    public void fixedDelayJob() throws InterruptedException {
        System.out.println("Task is executing：" + LocalDateTime.now());
    }
}
