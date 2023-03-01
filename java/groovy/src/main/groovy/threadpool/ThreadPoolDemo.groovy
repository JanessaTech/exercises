package threadpool

import java.util.concurrent.Callable
import java.util.concurrent.CountDownLatch
import java.util.concurrent.Future
import java.util.logging.Level
import java.util.logging.Logger

class ThreadPoolDemo {
    static final logger = Logger.getLogger(BillfoldThreadPool.class.getName())
    static void main(String[] args) {
        def billfoldThreadPool = new BillfoldThreadPool();
        billfoldThreadPool.init()
        def latch = new CountDownLatch(2)
        def taskx = billfoldThreadPool.submit(new Callable<String>() {
            @Override
            String call() throws Exception {
                try {
                    Thread.sleep(1000)
                } catch (Exception e) {
                    e.printStackTrace()
                }
                latch.countDown()
                return 'task1'
            }
        }) as Future<String>
        /*
        def task1 = billfoldThreadPool.submit({
            try {
                Thread.sleep(1000)
            } catch (Exception e) {
                e.printStackTrace()
            }
            latch.countDown()
            return 'task1'

        } as Callable<String>) */

        def task2 = billfoldThreadPool.submit({
            try {
                Thread.sleep(1000)
            } catch (Exception e) {
                e.printStackTrace()
            }
            latch.countDown()
            return 'task2'

        } as Callable<String>) as Future<String>
        latch.await()
        logger.log(Level.INFO, 'task1 result:'  +  taskx.get())
        logger.log(Level.INFO, 'task2 result:'  +  task2.get())

    }
}
