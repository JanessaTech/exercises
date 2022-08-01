package com.idempotent.example.idempotent.Interceptor;

import com.idempotent.example.idempotent.annotation.Idemponent;
import com.idempotent.example.idempotent.service.RedisService;
import com.idempotent.example.idempotent.service.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

@Component
@Slf4j
public class IdempotentInterceptor implements HandlerInterceptor {
    private static String TOKEN_KEY = "token";
    @Autowired
    TokenService tokenService;
    @Autowired
    RedisService redisService;

    private String getToken(HttpServletRequest request) {
        return request.getParameter(TOKEN_KEY);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("Enter IdempotentInterceptor.preHandle");
        if (!(handler instanceof HandlerMethod)) return true;
        HandlerMethod handlerMethod = (HandlerMethod)handler;
        Method method = handlerMethod.getMethod();
        if (method.isAnnotationPresent(Idemponent.class)) {
            String token = getToken(request);
            if (token == null) return false;
            else {
                if (redisService.exists(token)) {
                    log.info("token {} is existing. It will be deleted", token);
                    redisService.remove(token);
                } else {
                    log.info("cannot find token {}", token);
                    return false;
                }
            }
        }
        log.info("Exit IdempotentInterceptor.preHandle");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
    }
}
