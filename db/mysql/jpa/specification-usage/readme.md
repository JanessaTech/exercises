Prepare database
----------------------------------
```aidl
CREATE database jpa_service;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jpa_service.* TO 'demouser'@'%';

CREATE TABLE IF NOT EXISTS `BOOK` (
	`BOOK_ID`      BIGINT NOT NULL AUTO_INCREMENT ,
	`NAME`         VARCHAR(50) NOT NULL,
	`TITLE`        VARCHAR(150) NOT NULL,
	`AUTHOR`       VARCHAR(50) NOT NULL,
	 PRIMARY KEY (`BOOK_ID`)
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;

INSERT INTO BOOK(`NAME`, `TITLE`,`AUTHOR`) VALUES('book1','wind','zhaojuan');
INSERT INTO BOOK(`NAME`, `TITLE`,`AUTHOR`) VALUES('book2','snowdemo','wei');
INSERT INTO BOOK(`NAME`, `TITLE`,`AUTHOR`) VALUES('book2','winddemo','juan');
```

This demo shows how to use Predicate to query table. </br>
Here I provided two ways:
 1. Use Criteria API boilerplate  code to query
 2. Use Specification API (Which is actually the convenient tool to generate Criteria API boilerplate  code)

How to run this demo:
-------------------------
1. If you want to run in #1, uncomment line 18 in BookController
2. If you want to run in #2, uncomment line 19 in BookController
3. Then run SpecificationUsageApplication
4. Launch http://127.0.0.1:8080?title=wind&author=juan in postname, GET ,method,  you will see </br>
```aidl
[
    {
        "id": 3,
        "title": "winddemo",
        "author": "juan"
    }
]
```