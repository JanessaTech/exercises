package com.demo.security.login.session.singleloginsession.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AddInterceptor implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // You could add multiple custom interceptors here
        registry.addInterceptor(new UserInterceptor()).addPathPatterns("/**")
                .excludePathPatterns("/login")
                .excludePathPatterns("logout");
    }

}
