package com.demo;

import java.util.concurrent.*;

public class Demo {
    class ThreadFactoryBuilder implements ThreadFactory {
        private String threadNamePrefix = "prefix";
        private int index = 0;

        ThreadFactoryBuilder(String prefix) {
            this.threadNamePrefix = prefix;
        }
        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r);
            t.setName(threadNamePrefix + "_" + index);
            return t;
        }
    }
    public void run() {
        ThreadFactory commonThreadFactory = new ThreadFactoryBuilder("demo-pool");
        ExecutorService  threadPool = new ThreadPoolExecutor(5, 10, 300L,
                TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>(1024), commonThreadFactory, new ThreadPoolExecutor.AbortPolicy());

        CountDownLatch latch = new CountDownLatch(1);
        Future<String> future = threadPool.submit( () -> {
            System.out.println(Thread.currentThread().getName() + " is running in call()");
            Thread.sleep(5000L);
            System.out.println(Thread.currentThread().getName() + " is finished in call()");
            latch.countDown();
            return "Hello world";
        });

        /*
        Future<String> future = threadPool.submit(new Callable<String>() {
            @Override
            public String call() throws Exception {
                System.out.println(Thread.currentThread().getName() + " is running in call()");
                Thread.sleep(5000L);
                System.out.println(Thread.currentThread().getName() + " is finished in call()");
                return "Hello world";
            }
        }); */
        try {
            latch.await();
            String res = future.get();
            System.out.println("res = " + res);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {
        System.out.println("Main thread " + Thread.currentThread().getName() + " started");
        Demo demo = new Demo();
        demo.run();
    }
}
