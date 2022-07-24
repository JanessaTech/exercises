How to run it:
--------------------------------
- Run AysncUsageApplication in IDE
- In post run, launch http://127.0.0.1:8080/test/void GET </br>
  You will see message in console: 
```aidl
2022-07-24 12:59:07.383  INFO 5964 --- [         task-1] com.async.example.service.AsyncService   : Thread task-1 executing asyncMethodWithVoidReturnType
2022-07-24 12:59:12.392  INFO 5964 --- [         task-1] com.async.example.service.AsyncService   : Thread task-1 finished asyncMethodWithVoidReturnType
```
It means the method asyncMethodWithVoidReturnType is actually executed by a thread named task1,
which is different from the thread running springboot application (the name is nio-8080-exec-1)
- In post run, launch http://127.0.0.1:8080/test/nonvoid GET </br>
  You will see message in console:
```aidl
2022-07-24 12:57:08.814  INFO 5964 --- [         task-2] com.async.example.service.AsyncService   : Thread task-2 executing asyncMethodWithReturnType
2022-07-24 12:57:13.829  INFO 5964 --- [         task-2] com.async.example.service.AsyncService   : Thread task-2 finished asyncMethodWithReturnType
```
It means the method asyncMethodWithReturnType is actually executed by a thread named task2


More details, see: 
https://www.baeldung.com/spring-async
https://www.cnblogs.com/thisiswhy/p/15233243.html