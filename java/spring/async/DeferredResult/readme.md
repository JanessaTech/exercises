How to run this demo:
- Run DeferredResultApplication in IDE
- Launch http://127.0.0.1:8080/hello (GET) in postman, you will see logs in console like below:
```aidl
2022-07-24 16:08:28.644  INFO 3812 --- [nio-8080-exec-1] c.a.e.d.c.DeferredResultController       : Thread http-nio-8080-exec-1 is running in DeferredResultController.sayHello()
2022-07-24 16:08:28.646  INFO 3812 --- [nio-8080-exec-1] c.a.e.d.c.DeferredResultController       : Thread http-nio-8080-exec-1 is finished in DeferredResultController.sayHello()
2022-07-24 16:08:28.646  INFO 3812 --- [onPool-worker-1] c.a.e.d.c.DeferredResultController       : Processing in separate thread: ForkJoinPool.commonPool-worker-1
2022-07-24 16:08:31.651  INFO 3812 --- [onPool-worker-1] c.a.e.d.c.DeferredResultController       : Finished process in separate thread: ForkJoinPool.commonPool-worker-1
2022-07-24 16:08:31.664  INFO 3812 --- [nio-8080-exec-3] c.a.e.d.c.DeferredResultController       : Processing deferredResult.onCompletion in separate thread: http-nio-8080-exec-3
```

From the logs above, we know that the code defined from line23 - line 26 is executed by a separate thread named ForkJoinPool.commonPool-worker-1, </br>
which is different from the thread calling DeferredResultController.sayHello() method 