package com.demo;

public class MultithreadingDemo {
    public static void main(String[] args) {
        ThreadGroup threadGroup = new ThreadGroup("group");
        Thread thread1 = new Thread(threadGroup, () -> {
            String groupName = Thread.currentThread().getThreadGroup().getName();
            String threadName = Thread.currentThread().getName();
            System.out.println(groupName + "-" + threadName);
        }, "thread1");

        Thread thread2 = new Thread(threadGroup, () -> {
            String groupName = Thread.currentThread().getThreadGroup().getName();
            String threadName = Thread.currentThread().getName();
            System.out.println(groupName + "-" + threadName);
        }, "thread2");

        thread1.start();
        thread2.start();
    }
}
