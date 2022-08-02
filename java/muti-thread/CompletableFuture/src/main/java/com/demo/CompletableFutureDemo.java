package com.demo;

import java.util.concurrent.CompletableFuture;

public class CompletableFutureDemo {
    public static void main(String[] args) throws InterruptedException {
        CompletableFuture<Void> future = CompletableFuture.supplyAsync(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 3;
        }).thenApply( (i) -> "Hello " + i)
                .thenAccept(System.out::println);
        future.join();
    }
}
