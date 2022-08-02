package com.example.asynaop.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.concurrent.*;

public interface ThreadPoolService {
    Future<String>  submit(Callable<String> callable);
}

@Service
@Slf4j
class ThreadPoolServiceImpl implements ThreadPoolService {

    private ExecutorService threadPool;

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

    @PostConstruct
    public void init() {
        log.info("running init() in ThreadPoolServiceImpl");
        ThreadFactory commonThreadFactory = new ThreadFactoryBuilder("demo-pool");
        this.threadPool = new ThreadPoolExecutor(5, 10, 300L,
                TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>(1024), commonThreadFactory, new ThreadPoolExecutor.AbortPolicy());

    }

    @Override
    public Future<String> submit(Callable<String> task) {
        Future<String> future = threadPool.submit(task);
        return future;
    }
}
