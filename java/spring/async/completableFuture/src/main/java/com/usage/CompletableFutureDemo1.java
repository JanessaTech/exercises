package com.usage;

import lombok.SneakyThrows;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureDemo1 {
    class FetchResultTask implements Runnable {
        private CompletableFuture<Integer> _f = null;
        FetchResultTask(CompletableFuture<Integer> f) {
            this._f = f;
        }
        @Override
        public void run() {
            try {
                int res = _f.get() * _f.get();
                System.out.println("res = " + res);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        }
    }

    void showDemo() throws InterruptedException {
        final CompletableFuture<Integer> future = new CompletableFuture<>();
        new Thread(new FetchResultTask(future)).start();
        Thread.sleep(2000);
        future.complete(20);
        Thread.sleep(1000);
        System.out.println("main ends");
    }
    public static void main(String[] args) throws InterruptedException {
        CompletableFutureDemo1 demo = new CompletableFutureDemo1();
        demo.showDemo();
    }
}
