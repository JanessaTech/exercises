package com.demo.security.login.session.singleloginsession.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class UserInterceptor implements HandlerInterceptor {
    Logger logger = LoggerFactory.getLogger(UserInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        logger.info("preHandle in UserInterceptor:" +request.getContextPath());
        HttpSession session = request.getSession();
        if (session.getAttribute("user") != null){
            return true;
        }else {
            response.getWriter().println("You need login first");
        }
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {

    }
}
