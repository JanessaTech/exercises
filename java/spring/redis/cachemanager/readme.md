This demo shows how to use reids as cache manager

Prepare database
--------------------------------------
1. Create database
```
CREATE database mydb;
CREATE USER 'mysqluser'@'%' IDENTIFIED BY 'mysqluser';
GRANT ALL PRIVILEGES ON mydb.* TO 'mysqluser'@'%' IDENTIFIED BY 'mysqluser';
```
2. Create table:
 ```
CREATE TABLE `employee` (
	`ID` BIGINT NOT NULL AUTO_INCREMENT ,
	`name` VARCHAR(32) NOT NULL,
	`age` INT NOT NULL,
	 PRIMARY KEY (`ID`)	
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;
```

2. Install redis
3. Operate CRUD
  - Get all employee :   http://127.0.0.1:8080/emp  GET
    you will see nothing
  - Create one employee: http://127.0.0.1:8080/emp/save  POST
```aidl
{
    "id": 23,
    "name":"Juan Zhao",
    "age":30
}
```
  - Get one employee:    http://127.0.0.1:8080/emp/23  GET </br>
    You will see:
```aidl
{
    "id": 23,
    "name":"Juan Zhao",
    "age":30
}
```
  - Update one employee : http://127.0.0.1:8080/emp/update  POST </br>
```aidl
{
    "id": 23,
    "name":"Juan Zhao's new name",
    "age":30
}
```

  - Delete one employee: http://127.0.0.1:8080/emp/23   DELETE </br>

You could run keys * in redis to check which keys are created after you finish CRUD operations </br>
and run get your-key to check the corresponding content


References:
 - https://www.cnblogs.com/fashflying/p/6908028.html
 - https://programming.vip/docs/detailed-tutorial-on-redis-caching-in-the-springboot-series.html
 - https://www.jianshu.com/p/ad168cc3603e

