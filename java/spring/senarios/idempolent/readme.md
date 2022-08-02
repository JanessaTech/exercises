How to run this demo:
---------------------------
 - Run IdempotentApplication in IDE
 - Launch http://127.0.0.1:8080/test/uuid (GET), you will get an uuid string
   Eg: 9521e79b-6822-41d7-be8e-dd0d4de246f6
 - Launch http://127.0.0.1:8080/test/idempotent (GET), put the uuid you get as the value of the key named token in param
   key: token 
   value: 9521e79b-6822-41d7-be8e-dd0d4de246f6
   You will see logs like below:
```aidl
  Enter IdempotentInterceptor.preHandle
  Exit IdempotentInterceptor.preHandle
  Execute demoMethod 0
```
 The business logic in MyBusinessImpl.demoMethod is executed </br>
 
Then we sent the second url again, we will see log belows: </br>
```aidl
Enter IdempotentInterceptor.preHandle
cannot find token 9521e79b-6822-41d7-be8e-dd0d4de246f6
```
This time, code cannot enter into the business logic
