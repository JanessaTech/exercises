package com.reactive.example.mvcstyle.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@RestController
public class TestController {
    @GetMapping(value = "/testMono")
    public Mono<String> testMono() {
        return Mono.just("I am Mono");
    }

    @GetMapping(value = "/testFlux", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> testFlux() {
        return Mono.delay(Duration.ofSeconds(2))
                .flatMapMany(aLong -> Flux.just("Hi!", "Bonjour!", "Hola!", "Ciao!", "Zdravo!"));
    }
}
