package com.reactive.example.fluxusage;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.reactivestreams.Subscription;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import reactor.core.publisher.BaseSubscriber;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@RunWith(SpringRunner.class)
@SpringBootTest
class FluxusageApplicationTests {

    @Test
    void contextLoads() {

    }

    @Test
    public void testReactor(){
        Flux<Integer> flux = Flux.just(1, 2, 3, 4, 5, 6);
        Mono<Integer> mono = Mono.just(1);

        Integer[] arr = {1,2,3,4,5,6};
        Flux<Integer> flux1 = Flux.fromArray(arr);

        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6);
        Flux<Integer> flux2 = Flux.fromIterable(list);

        Flux<Integer> flux3 = Flux.from(flux);

        Flux<Integer> flux4 = Flux.fromStream(Stream.of(1, 2, 3, 4, 5, 6));

        flux.subscribe();
        System.out.println("flux.subscribe() end");

        flux1.subscribe(System.out::println);
        System.out.println("flux1.subscribe(System.out::println) end");

        flux2.subscribe(System.out::println,System.err::println);
        System.out.println("flux2.subscribe(System.out::println,System.err::println) end");


        flux3.subscribe(System.out::println,System.err::println,() -> System.out.println("complete"));
        System.out.println(" flux3.subscribe(System.out::println,System.err::println,() -> System.out.println(\"complete\") end");

        flux4.subscribe(System.out::println,
                        System.err::println,() -> System.out.println("complete"),
                        subscription -> subscription.request(3));
        System.out.println("flux4.subscribe(System.out::println, .. end");

        flux4.subscribe(new DemoSubscriber());
        System.out.println("flux4.subscribe(new DemoSubscriber() end");
    }

    class DemoSubscriber extends BaseSubscriber<Integer> {
        @Override
        protected void hookOnSubscribe(Subscription subscription) {
            System.out.println("Subscribe");
            subscription.request(1);
        }

        @Override
        protected void hookOnNext(Integer value) {
            if(value == 4){
                //背压，通知数据源，不要发送数据了
                cancel();
            }
            System.out.println(value);
            request(1);
        }
    }

}
