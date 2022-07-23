How to run it:
--------------------------------
- Run AysncUsageApplication in IDE
- In post run, launch http://127.0.0.1:8080/test/void GET </br>
  You will see message in console: 
```aidl
Execute non void method asynchronously - task-1
```
It means the method asyncMethodWithVoidReturnType is actually executed by a thread named task1,
which is different from the thread running springboot application (the name is nio-8080-exec-1)
- In post run, launch http://127.0.0.1:8080/test/nonvoid GET </br>
  You will see message in console:
```aidl
2022-07-23 22:39:38.230  INFO 14352 --- [         task-2] com.async.example.service.AsyncService   : Execute void method asynchronously. task-2
Execute non void method asynchronously - task-3
```
It means the method asyncMethodWithReturnType is actually executed by a thread named task3


More details, see: https://www.baeldung.com/spring-async