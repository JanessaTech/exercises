package com.demo;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CountDownLatchUsage {
    class Task implements Runnable {
        private CountDownLatch latch;

        Task(CountDownLatch latch) {
            this.latch = latch;
        }
        @Override
        public void run() {
            System.out.println("Thead " + Thread.currentThread().getName() + " is running");
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            latch.countDown();
            System.out.println("Thead " + Thread.currentThread().getName() + " count down");
        }
    }

    public void demo() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(3);
        List<Thread> threads = Stream.generate( () -> new Thread(new Task(latch))).limit(3).collect(Collectors.toList());
        threads.forEach(Thread::start);
        latch.await();
        System.out.println("latch is released");

    }

    public static void main(String[] args) {
        CountDownLatchUsage usage = new CountDownLatchUsage();
        try {
            usage.demo();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }
}
