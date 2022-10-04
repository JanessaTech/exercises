package com.sso.example.utils;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.List;

@Slf4j
public class JwtUtils {
    public static String generateJwtToken(String userName, List<String> roles, String jwtSecret, int jwtExpirationMs) {
        return Jwts.builder()
                .setSubject(userName)
                .claim("roles", roles) // add roles info into payload
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
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

    public static String getUserNameFromJwtToken(String token, String jwtSecret) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public static List getRoleFromJwtToken(String token, String jwtSecret) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("roles", List.class);
    }
}