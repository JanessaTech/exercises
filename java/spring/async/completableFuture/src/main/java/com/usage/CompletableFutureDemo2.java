package com.usage;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureDemo2 {

    public static Integer run(CompletableFuture<Integer> _f) {
        try {
            int res = _f.get() * _f.get();
            return res;
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        final CompletableFuture<Integer> future = new CompletableFuture<>();
        CompletableFuture.supplyAsync(() -> run(future))
                        .thenApply( i -> Integer.toString(i))
                        .thenApply(str -> "res = " + str)
                        .thenAccept(System.out::println);

        Thread.sleep(2000);
        future.complete(20);
        Thread.sleep(1000);
        System.out.println("main ends");
    }
}
