package com.example.autoconfig1;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;

class Autoconfig1ApplicationTests {
    private final ApplicationContextRunner contextRunner = new ApplicationContextRunner();

    @Test
    void contextLoads() {
        this.contextRunner.withUserConfiguration(MyAutoConfiguration.class).run(context -> {
            MyService myService = context.getBean(MyService.class);
            Assert.assertNotNull(myService);
        });
    }

}
