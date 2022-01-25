How to run example1: </br>
 - create db/user and assign privilege:
```
CREATE database mydb;
CREATE USER 'mysqluser'@'%' IDENTIFIED BY 'mysqluser';
GRANT ALL PRIVILEGES ON mydb.* TO 'mysqluser'@'%' IDENTIFIED BY 'mysqluser';
```
 - create table:
 ```
CREATE TABLE `MY_USER` (
	`ID` BIGINT NOT NULL AUTO_INCREMENT ,
	`EMAIL` VARCHAR(32) NOT NULL,
	 PRIMARY KEY (`ID`)	
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;
```
 - modify 192.168.1.107 to be the ip of your mysql db server in MySQLAutoconfiguration
 ```
dataSource.setUrl("jdbc:mysql://192.168.1.107:3306/mydb?useSSL=false");
```
 - run com.example.autoconfig.example1.AutoconfigTests
 - you will see a new item added in table MY_USER