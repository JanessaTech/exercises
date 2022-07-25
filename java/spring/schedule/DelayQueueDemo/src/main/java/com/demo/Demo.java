package com.demo;

import java.text.DateFormat;
import java.util.Date;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

public class Demo {
    class DelayElement implements Delayed {
        long delayTime  = System.currentTimeMillis();

        DelayElement(long delay) {
            delayTime = delayTime + delay;
        }

        @Override
        public long getDelay(TimeUnit unit) {
            return unit.convert(delayTime - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
        }

        @Override
        public int compareTo(Delayed o) {
            if (this.getDelay(TimeUnit.MILLISECONDS) > o.getDelay(TimeUnit.MILLISECONDS)) {
                return 1;
            } else if (this.getDelay(TimeUnit.MILLISECONDS) < o.getDelay(TimeUnit.MILLISECONDS)) {
                return -1;
            } else {
                return 0;
            }
        }
        @Override
        public String toString() {
            return DateFormat.getDateTimeInstance().format(new Date(delayTime));
        }
    }

    void run() throws InterruptedException {
        DelayQueue delayQueue = new DelayQueue();
        // add delayed tasks
        delayQueue.put(new DelayElement(1000));
        delayQueue.put(new DelayElement(3000));
        delayQueue.put(new DelayElement(5000));
        System.out.println("Begin：" +  DateFormat.getDateTimeInstance().format(new Date()));
        while (!delayQueue.isEmpty()){
            // execute tasks
            System.out.println(delayQueue.take());
        }
        System.out.println("Finished：" +  DateFormat.getDateTimeInstance().format(new Date()));
    }
    public static void main(String[] args) {
        Demo demo  = new Demo();
        try {
            demo.run();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
