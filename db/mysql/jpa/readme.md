Prepare database
-----------------------------
```aidl
CREATE database books_service;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on books_service.* TO 'demouser'@'%';
```


How to run it:
 - Run JpaApplication in IDE directly