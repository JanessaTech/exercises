package threadpool

import groovy.util.logging.Slf4j

import java.util.concurrent.Callable
import java.util.concurrent.ExecutorService
import java.util.concurrent.Future
import java.util.concurrent.LinkedBlockingQueue
import java.util.concurrent.ThreadFactory
import java.util.concurrent.ThreadPoolExecutor
import java.util.concurrent.TimeUnit
import java.util.logging.Logger
import java.util.logging.Level

class BillfoldThreadPool {
    Logger logger = Logger.getLogger(BillfoldThreadPool.class.getName())
    private ExecutorService threadPool
    class ThreadFactoryBuilder implements ThreadFactory {
        private String threadNamePrefix = "Billfold-threadpool"
        private int index = 0

        ThreadFactoryBuilder(String prefix) {
            this.threadNamePrefix = prefix
        }

        @Override
        Thread newThread(Runnable r) {
            Thread t = new Thread(r)
            t.setName(threadNamePrefix + "_" + index);
            return t;
        }
    }

    void init(){
        ThreadFactory commonThreadFactory = new ThreadFactoryBuilder('demo')
        this.threadPool = new ThreadPoolExecutor(5, 10, 100L,
                TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>(1024), commonThreadFactory, new ThreadPoolExecutor.AbortPolicy());
    }

    Future<Object> submit(Callable<Object> task) {
        logger.log(Level.INFO, 'task is executing by Thread ' + Thread.currentThread().getName())
        Future<Object> future = null
        try {
            future = threadPool.submit(task)
        } catch (Exception e) {
            logger.log(Level.INFO, 'Task cannot be executed. Exception: ' + e.class.name + ', message' + e.message)
        }
        logger.log(Level.INFO, 'task is finished by Thread ' + Thread.currentThread().getName())
        if (future) {
            logger.log(Level.INFO,'future is not empty')
        }

        return future;
    }

}
