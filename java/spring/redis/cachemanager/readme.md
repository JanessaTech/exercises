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

