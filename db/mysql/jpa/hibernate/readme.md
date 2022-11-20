Prepare database
----------------------------------
```aidl
CREATE database jpa_service;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jpa_service.* TO 'demouser'@'%';

CREATE TABLE IF NOT EXISTS `GAME` (
	`GAME_ID`      		    BIGINT NOT NULL AUTO_INCREMENT,
	`NAME`    			    VARCHAR(50) NOT NULL,
	PRIMARY KEY (`GAME_ID`)
 )
ENGINE = InnoDB DEFAULT CHARSET=utf8;
```

Test how session works