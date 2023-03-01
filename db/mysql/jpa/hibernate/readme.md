Prepare database
----------------------------------
```aidl
CREATE database jpa_service;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jpa_service.* TO 'demouser'@'%';

CREATE TABLE IF NOT EXISTS `GAME` (
	`GAME_ID`      		    BIGINT NOT NULL AUTO_INCREMENT,
	`NAME`    			    VARCHAR(50) NOT NULL,
	`FK_GAME_GROUP_ID`    	BIGINT NOT NULL,
	`ADDR`                  VARCHAR(50) NULL,
	`TIME`                  TIMESTAMP NULL,
	`SITE_ID`               INT NULL,
	`NEW_GAME`              TINYINT NULL,
	`RATIO`                 DECIMAL(17,2) NULL,	
	 PRIMARY KEY (`GAME_ID`)
 )
ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `GAME_GROUP` (
	`GAME_GROUP_ID`      		    BIGINT NOT NULL AUTO_INCREMENT,
	`NAME`    			    VARCHAR(50) NOT NULL,
	PRIMARY KEY (`GAME_GROUP_ID`)
 )
ENGINE = InnoDB DEFAULT CHARSET=utf8;

```

Test how session works

See below articles:
https://refactorfirst.com/spring-boot-boost-jpa-bulk-insert-performance-by-100x
https://medium.com/@wahyaumau/boost-jpa-bulk-insert-performance-by-90-3a6232d9068d
https://vladmihalcea.com/hibernate-identity-sequence-and-table-sequence-generator/
https://docs.jboss.org/hibernate/orm/4.3/manual/en-US/html/ch15.html