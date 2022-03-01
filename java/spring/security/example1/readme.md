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
CREATE TABLE `user` (
	`id` BIGINT NOT NULL AUTO_INCREMENT ,
	`name` VARCHAR(50) NOT NULL,
	`psw`  VARCHAR(200) NOT NULL,
	`role` VARCHAR(50) NOT NULL,
	 PRIMARY KEY (`id`)	
	)
ENGINE = InnoDB DEFAULT CHARSET=utf8;
```


How it works:
1. Sign up
2. login and generate a token containing some user info (role etc)
3. Access protected url along with token info with "Bearer" authorization

Details:
1. Sign up
  - launch http://127.0.0.1:8080/api/auth/signup in postman with POST type
  - Register 3 account:
  ```aidl
{
    "username": "user1234",
    "password": "1234",
    "role": "user"
}
{
    "username": "moder1234",
    "password": "1234",
    "role": "mod"
}
{
    "username": "admin1234",
    "password": "1234",
    "role": "admin"
}
```
   
2. login
   - launch http://127.0.0.1:8080/api/auth/signin
   - Login as one of accounts created above saying moder1234
```aidl
{
    "username": "moder1234",
    "password": "1234"
}
```
   - A token is returned which looks like below:
```aidl
{
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtb2RlciIsInJvbGUiOiJST0xFX01PREVSQVRPUiIsImlhdCI6MTY0NDc0NTU5NiwiZXhwIjoxNjQ0ODMxOTk2fQ.JNWAoJl0pmuARVpUW3e7Cda2wIX2Lrwo2Nh1z3MOJ_R3HcZUGJriAKuu_4E-XVBZkokfusn1ae8xpNgUKT3zJw",
    "type": null,
    "id": 2,
    "username": "moder",
    "role": "ROLE_MODERATOR"
}
```
3. Access protected url along with token info with "Bearer" authorization
   - Launch http://127.0.0.1:8080/api/test/mod
   - select Bearer Token as anthorization, input token generated in step2
   - you will see:
```aidl
Moderator Board.
```
    
   - Launch http://127.0.0.1:8080/api/test/user or http://127.0.0.1:8080/api/test/admin with the same token, you will be forbidden



