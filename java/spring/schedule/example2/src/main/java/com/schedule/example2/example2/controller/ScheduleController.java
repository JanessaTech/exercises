package com.schedule.example2.example2.controller;

import com.schedule.example2.example2.config.ScheduleTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
public class ScheduleController {
    @Autowired
    ScheduleTask scheduleTask;

    @PostMapping("/updateCron")
    public String updateCron(String cron) {
        log.info("new cron :{}", cron);
        scheduleTask.setCron(cron);
        return "ok";
    }

    @PostMapping("/updateTimer")
    public String updateTimer(Long timer) {
        log.info("new timer :{}", timer);
        scheduleTask.setTimer(timer);
        return "ok";
    }
}
