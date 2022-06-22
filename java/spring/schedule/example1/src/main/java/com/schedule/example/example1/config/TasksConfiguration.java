package com.schedule.example.example1.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.CronTask;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

import java.util.Date;
import java.util.concurrent.Executor;

@Configuration
@EnableScheduling
@PropertySource(value = "classpath:quartz.properties", ignoreResourceNotFound = true)
@Slf4j
public class TasksConfiguration implements SchedulingConfigurer {

    @Autowired
    private Environment env;

    @Autowired
    private ApplicationContext context;

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.setScheduler(taskScheduler());

        addTasks(taskRegistrar);
    }

    @Bean
    Executor taskScheduler() {
        int  poolSize = env.getProperty("scheduler.poolSize", Integer.class, 10);
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(poolSize);
        scheduler.setThreadNamePrefix( "scheduler-");
        return scheduler;
    }

    private void addTasks(final ScheduledTaskRegistrar taskRegistrar) {
        String taskConfiguration = env.getProperty("task.demoTask.expression", "-");
        log.info("Task configuration: " + taskConfiguration);

        if (taskConfiguration.startsWith("cron:")) {
            CronTask task = new CronTask(new Runnable() {
                @Override
                public void run() {
                    log.info("now is :" + new Date().toString());
                }
            }, taskConfiguration.substring(5));
            taskRegistrar.addCronTask(task);

        } else {
            // do nothing
        }
    }

}
