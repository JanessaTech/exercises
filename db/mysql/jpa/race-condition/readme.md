
Prepare database
-------------------------------------------------------
```aidl
CREATE database jpa_service;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jpa_service.* TO 'demouser'@'%';

CREATE TABLE IF NOT EXISTS `PAYMENT` (
	`PAYMENT_ID`      BIGINT NOT NULL AUTO_INCREMENT,
	`STATUS`  		  VARCHAR(50) NOT NULL,
	`REASON`  		  VARCHAR(50) NULL,
	`AMOUNT`          INT NOT NULL DEFAULT 0,
	 PRIMARY KEY (`PAYMENT_ID`)
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

INSERT INTO PAYMENT(STATUS) VALUES('pending');
INSERT INTO PAYMENT(STATUS) VALUES('ok');
INSERT INTO PAYMENT(STATUS) VALUES('error');

```

This demo shows how to use jpa to call store procedure and how to use mysql pessimistic lock
==================================================================================================
How to run the demo:</br>
1. Open mysql, use jpa_service and create table PAYMENT then insert 3 payments according the script above
2. Run the store procedure named SP_LOCK_PENDING_PAYMENTS under resource/sp in mysql
3. Run RaceConditionApplication in debug
4. Open postman, send request like below
   http://127.0.0.1:8080/payments/toOk1?id=1&amount=10  (POST)
   You will see that code will hang at line 26 in DepositNotificationHandlerImpl until exception is thrown
   (You could make code execute by executing "commit;" in mysql console)
