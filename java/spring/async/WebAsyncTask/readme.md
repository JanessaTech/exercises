How to run this demo:
- Run WebAsyncTaskApplication in you IDE
- Launch http://127.0.0.1:8080/hello (GET) in postman, you will see logs on console like below: </br>
```aidl
2022-07-24 15:40:40.398  INFO 11416 --- [nio-8080-exec-1] c.a.e.w.c.WebAsyncTaskController         : Thread http-nio-8080-exec-1 starts executing WebAsyncTaskController.sayHello
2022-07-24 15:40:40.399  INFO 11416 --- [nio-8080-exec-1] c.a.e.w.c.WebAsyncTaskController         : Thread http-nio-8080-exec-1 is finihsed with executing WebAsyncTaskController.sayHello
2022-07-24 15:40:40.408  INFO 11416 --- [         task-1] c.a.e.w.c.WebAsyncTaskController         : Thread task-1 is running in webAsyncTask.call()
2022-07-24 15:40:45.413  INFO 11416 --- [         task-1] c.a.e.w.c.WebAsyncTaskController         : Thread task-1 is finished in webAsyncTask.call()
2022-07-24 15:40:45.432  INFO 11416 --- [nio-8080-exec-2] c.a.e.w.c.WebAsyncTaskController         : Thread http-nio-8080-exec-2 is finished with the execution of webAsyncTask
```
From the logs above, we know that :
 - The code in webAsyncTask.call() is executed by a thread named task1, which is different from the thread calling WebAsyncTaskController.sayHello() method