package com.example.greeterspringbootautoconfigure;

import com.example.greeter.Greeter;
import com.example.greeter.GreetingConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConditionalOnClass(Greeter.class)
@EnableConfigurationProperties(GreeterProperties.class)
public class GreeterAutoConfiguration {
    @Autowired
    private GreeterProperties greeterProperties;

    @Bean
    @ConditionalOnMissingBean
    public GreetingConfig greeterConfig() {
        String userName = greeterProperties.getUserName() == null ? "default user" : greeterProperties.getUserName();
        String greetingMsg = "default greeting message";
        if (greeterProperties.getMorningMessage() != null) {
            greetingMsg = greeterProperties.getMorningMessage();
        } else {
            if (greeterProperties.getAfternoonMessage() != null) {
                greetingMsg = greeterProperties.getAfternoonMessage();
            } else {
                if (greeterProperties.getEveningMessage() != null) {
                    greetingMsg = greeterProperties.getEveningMessage();
                }
            }
        }

        GreetingConfig greetingConfig = new GreetingConfig();
        greetingConfig.setUserName(userName);
        greetingConfig.setGreetingMsg(greetingMsg);

        return greetingConfig;
    }

    @Bean
    @ConditionalOnMissingBean
    public Greeter greeter(GreetingConfig greetingConfig) {
        return new Greeter(greetingConfig);
    }
}
