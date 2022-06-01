Prepare database
----------------------------------
```aidl
CREATE database jpa_service;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jpa_service.* TO 'demouser'@'%';

CREATE TABLE IF NOT EXISTS `TUTORIAL` (
	`TUTORIAL_ID`      BIGINT NOT NULL AUTO_INCREMENT ,
	`TITLE`            VARCHAR(50) NOT NULL,
	`PUBLISH`          TINYINT	NOT NULL DEFAULT 0,
	 PRIMARY KEY (`TUTORIAL_ID`)
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `COMMENT` (
	`COMMENT_ID`      BIGINT NOT NULL AUTO_INCREMENT ,
	`CONTENT`         VARCHAR(100) NOT NULL,
	`FK_TUTORIAL_ID`  BIGINT NOT NULL,
	 PRIMARY KEY (`COMMENT_ID`)
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;
```