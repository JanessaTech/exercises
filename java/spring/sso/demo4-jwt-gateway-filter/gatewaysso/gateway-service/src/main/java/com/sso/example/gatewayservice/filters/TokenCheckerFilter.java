package com.sso.example.gatewayservice.filters;

import com.sso.example.utils.JwtUtils;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class TokenCheckerFilter implements GlobalFilter {

    private final static String TOKEN_HEADER = "token";
    @Value("${jannessa.app.jwtSecret}")
    private String jwtSecret;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        log.info("First Pre Global Filter: TokenCheckerFilter");
        String token  = exchange.getRequest().getHeaders().getFirst(TOKEN_HEADER);
        log.info("token = {}", token);
        boolean valid = JwtUtils.validateJwtToken(token, jwtSecret);
        if (!valid) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        String name = JwtUtils.getUserNameFromJwtToken(token, jwtSecret);
        ServerHttpRequest request = exchange.getRequest()
                .mutate()
                .header("username", name)
                .build();
        ServerWebExchange exchange1 = exchange.mutate().request(request).build();

        return chain.filter(exchange1)
                .then(Mono.fromRunnable(() -> {
                    log.info("Last Post Global Filter: TokenCheckerFilter");
                }));
    }


    public static boolean validateJwtToken(String authToken, String jwtSecret) {
        try{
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }
}
