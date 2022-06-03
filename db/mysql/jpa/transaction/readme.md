Prepare database
----------------------------------
```aidl
CREATE database jpa_service;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jpa_service.* TO 'demouser'@'%';

CREATE TABLE IF NOT EXISTS `TABLE1` (
	`TABLE_ID`      BIGINT NOT NULL AUTO_INCREMENT ,
	`NAME`    VARCHAR(50) NOT NULL,
	 PRIMARY KEY (`TABLE_ID`)
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `TABLE2` (
	`TABLE_ID`      BIGINT NOT NULL AUTO_INCREMENT ,
	`NAME`    VARCHAR(50) NOT NULL,
	 PRIMARY KEY (`TABLE_ID`)
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;
```

How to run it
-----------------------------------
1. Run TransactionApplication </br>
2. Test case in which data is inserted successfully </br>
   Launch http://127.0.0.1:8080?table1=mytable1&table2=mytable2 (POST) </br>
   Check database, you could see data are inserted into TABLE1 and TABLE2 successfully </br>
3. Test case in which data is not inserted successfully </br>
   http://127.0.0.1:8080?table1=mytable1&table2=rollback </br>
   Check database, you could see no data inserted at all
