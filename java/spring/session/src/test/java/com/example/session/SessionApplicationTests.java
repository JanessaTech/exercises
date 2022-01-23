package com.example.session;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Base64;

import static org.junit.Assert.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SessionApplicationTests {
    @LocalServerPort
    private int port;

    private String getUrl() {
        return  "http://localhost:" + port;
    }


    @Test
    public void testUnauthenticated() {
        RestTemplate restTemplate = new RestTemplate();
        Assertions.assertThrows(HttpClientErrorException.Unauthorized.class, () -> {
            restTemplate.getForEntity(getUrl(), String.class);
        });
    }

    @Test
    public void testSpringSessionAPI() {

        URI uri = URI.create(getUrl());
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity < String > firstResponse = firstRequest(restTemplate, uri);
        String sessionId1 = firstResponse.getBody();
        String cookie = firstResponse.getHeaders().getFirst("Set-Cookie");
        String sessionId2 = nextRequest(restTemplate, uri, cookie).getBody();
        assertEquals(sessionId1, sessionId2);
    }

    private ResponseEntity < String > firstRequest(RestTemplate restTemplate, URI uri) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + Base64.getEncoder().encodeToString("admin:nimda".getBytes()));
        RequestEntity < Object > request = new RequestEntity< >(headers, HttpMethod.GET, uri);
        return restTemplate.exchange(request, String.class);
    }

    private ResponseEntity < String > nextRequest(RestTemplate restTemplate, URI uri,
                                                  String cookie) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Cookie", cookie);
        RequestEntity < Object > request = new RequestEntity < > (headers, HttpMethod.GET, uri);
        return restTemplate.exchange(request, String.class);
    }
}
