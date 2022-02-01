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

Run plain example
------------------------------------------
There are three plain examples to show how we run sql statement in a primitive ways:</br>
- MySQLDemo
- MysqlPlainFailed
- MysqlPlainSuccess

Before running these three examples, we should modify the code a little bit: </br>
Change 192.168.1.107 to be the ip of your own mysql server
```aidl
static String URL = "jdbc:mysql://192.168.1.107:3306/mydb?useSSL=false";
```
And then we run them one by one:</br>
1. MySQLDemo </br>
 This example shows how we insert data into table employee in a primitive way
2. MysqlPlainFailed </br>
   This example shows how we start a transaction manually by using setAutoCommit(false). </br>
   In this example, the transaction rolls back because the sql statement fails, which results in </br>
   no data to be inserted.
3. MysqlPlainSuccess</br>
   As opposed to MysqlPlainFailed, it shows to the successful story

Run xml example
------------------------------------------
This example shows how we use content.xml configuration to configure transaction. </br>

Let explain content.xml a little bit:
Before defining transaction, three beans are necessary: 
- entityManagerFactory
- transactionManager
- dataSource

Then we use AOP to tell spring when it starts a transaction: </br>
In this example, spring starts a transaction when the method in EmployeeService is called. </br>
according to content.xml, all get methods in EmployeeService will trigger the transaction with readonly attribute </br>
For other methods, the transaction has default value.

How to run this example:
- Run Boot application directly

You can see that a transaction is triggered because the method insertEmployee is called at the end of this application </br>
The transaction is finally committed because no exception is thrown in the method insertEmployee. </br>
you could the data inserted in database after the transaction is committed successfully </br>

For more details, check out the links below: </br>
https://www.marcobehler.com/guides/spring-transaction-management-transactional-in-depth
https://docs.spring.io/spring-framework/docs/4.2.x/spring-framework-reference/html/transaction.html


Run annotation example
------------------------------------------
We could know that it is a little bit hard to use xml to configure spring transaction. Is there any better way to configure transaction? </br>
The answer is yes. @Transactional is what you want.
If you are using springboot, it helps you automatically configure the necessary beans like entityManagerFactory, transactionManager and dataSource </br>
In this example, there are only two things I need to tell spring:
1. The connection information needed by mysql
2. which methods should trigger a spring transaction

For #1, I configure the information in application.properties:
```spring.datasource.url=jdbc:mysql://192.168.1.107:3306/mydb?useSSL=false
spring.datasource.username=mysqluser
spring.datasource.password=mysqluser
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQLDialect
```
For #2, just put @Transactional on the method you think should work within a transaction <br>

To make better use of transaction, you need deeply understand the attribute in @Transactional : </br>
There are five key attributes for a transaction:
- Propagation
- Isolation
- Rollback rules
- Timeout
- Is readonly

1. Propagation
It tells spring how a transaction is reused if it exists. There are 7 types: <br>
   - REQUIRED  -- The default value. Create a transaction if it doesn't exist or reuse the existing one
   - SUPPORTS  -- Don't care about if there is an existing transaction or not, running in a non-transaction way
   - MANDATORY  -- I will cry if there is no transaction 
   - REQUIRES_NEW   -- Always create a new transaction
   - NOT_SUPPORTED  -- suspend the exsiting transaction if it exists, running in a non-transaction way
   - NEVER   -- I will cry if someone else started a transaction
   - NESTED  -- 
   
2. Isolation
   Isolation describes the degree to which how a transaction is isolated from another transaction. </br>
   There three types of errors when multiple transactions run in parallel:
   - Dirty reads
   - Nonrepeatable read (when update data)
   - Phantom read(when add/delete data)
   Therefore, we have isolation definition in four levels:
   
   |isolation level    | Dirty reads  | Nonrepeatable read | Phantom read |
   |-------------------|--------------|--------------------|--------------|
   |DEFAULT            |              |                    |              |
   |READ_UNCOMMITTED   |      yes     |        yes         |      yes     |
   |READ_COMMITTED     |      no      |        yes         |      yes     |
   |REPEATABLE_READ    |      no      |        no          |      yes     |
   |SERIALIZABLE       |      no      |        no          |      no
   
3. Rollback rules
   It tells spring which type of exception will trigger rollback

4. Timeout
   It tells spring how long a transaction should wait before roll back

5. Is readonly
   It tells spring the transaction only deals with reading operation

OK. Armed with the knowledge about @transational, let run cases under the different transaction with different parameters, </br>
we mainly focus on call with one class and call between two class to see what will happen. </br>

How to run:
Open browser, 
- case1:
  Input http://127.0.0.1:8080/test/case1
- case2:
  Input http://127.0.0.1:8080/test/case2
- case3:
  Input http://127.0.0.1:8080/test/case3
- case4:
  Input http://127.0.0.1:8080/test/case4
- case5:
  Input http://127.0.0.1:8080/test/case5
- case6:
  Input http://127.0.0.1:8080/test/case6
- case7:
  Input http://127.0.0.1:8080/test/case7
- case8:
  Input http://127.0.0.1:8080/test/case8

Checkout this article for the result of each case:
https://www.jianshu.com/p/befc2d73e487

Some best practices to use @Transational:
- Put on public method, it is useless on private/protected method
- Better to put on method rather than class
- It is useless to put on inner method


