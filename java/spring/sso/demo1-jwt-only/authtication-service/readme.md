Prepare database
-------------------------------------
CREATE database jwt_demo;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jwt_demo.* TO 'demouser'@'%';

Prepare tables
---------------------------
```aidl
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `ROLE`;
DROP TABLE IF EXISTS `USER`;
DROP TABLE IF EXISTS `USER_ROLE`;

CREATE TABLE IF NOT EXISTS `ROLE` (
	`ROLE_ID`      BIGINT NOT NULL AUTO_INCREMENT ,
	`NAME`    VARCHAR(50) NOT NULL,
	 PRIMARY KEY (`ROLE_ID`)
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `USER` (
  `USER_ID`      		BIGINT NOT NULL AUTO_INCREMENT,
  `NAME`    			VARCHAR(50) NOT NULL,
  `PASSWORD`  	  	    VARCHAR(200) NOT NULL,
  PRIMARY KEY (`USER_ID`)
 )
ENGINE = InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `USER_ROLE` (
	`USER_ROLE_ID`      BIGINT NOT NULL AUTO_INCREMENT,
    `USER_ID`  			BIGINT NOT NULL,
    `ROLE_ID`  			BIGINT NOT NULL,
     PRIMARY KEY (`USER_ROLE_ID`)
)
ENGINE = InnoDB DEFAULT CHARSET=utf8;
```



Reference:
SpringBoot + JPA @ManyToMany 操作要点:
对应的Entity的建立。此处注意不可使用lombok @Data 注解。使用@Setter 、@Getter注解。主要原因时要自己覆写hash() equals(),toString() 方法。《、不然》 </br>
这样添加和删除的时候不会出现异常。否则出现循环的引用，不能删除或stackOver；</br>
see details: https://blog.csdn.net/weixin_40445684/article/details/101023477  </br>
