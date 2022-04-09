package com.sso.springsession.example.businessservice.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            log.info("In AuthTokenFilter, sessionid = {}", request.getSession().getId());

            Authentication session_authentication = (Authentication)request.getSession().getAttribute("authentication");
            if (session_authentication == null) {
                response.getWriter().println("You need login first");
            } else {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(session_authentication.getPrincipal(), null, session_authentication.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(request, response);
            }
        } catch (Exception e) {
            logger.error("authentication failed: {}", e);
        }

    }
}
