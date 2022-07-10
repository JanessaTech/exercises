package com.demo;

public class ThreadGroupDemo {
    public static void main(String[] args) {
        ThreadGroup threadGroup = new ThreadGroup("group");
        Thread thread1 = new Thread(threadGroup, () -> {
            String groupName = Thread.currentThread().getThreadGroup().getName();
            String threadName = Thread.currentThread().getName();

            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(groupName + "-" + threadName);
        }, "thread1");

        Thread thread2 = new Thread(threadGroup, () -> {
            String groupName = Thread.currentThread().getThreadGroup().getName();
            String threadName = Thread.currentThread().getName();

            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(groupName + "-" + threadName);
        }, "thread2");

        Thread daemon = new Thread(()-> {
            System.out.println("I am daemon");

        }, "threadDaemon");
        daemon.setDaemon(true);


        thread1.start();
        thread2.start();
        daemon.start();
    }
}
