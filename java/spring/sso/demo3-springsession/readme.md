This demo shows how to use spring session to share session between different spring boot application </br>
Then I make use of this feature to implement sso (Single Sign On). The key ideas are : </br>
 - AuthenticationServiceApplication focuses on authentication.
   In details, AuthenticationServiceApplication provides 3 functions : register, login, logout </br>
   You could create several users with different roles (To simplify this demo, it only supports 2 roles: ROLE_USER and ROLE_ADMIN) </br>
   In AuthController.login method. Once your user/password are matched, </br>
   AuthenticationManager returns an authentication object which includes some key information like role info(stored in authorities of the authentication object) </br>
   to be used to do authorization process in another springboot application
   
 - BusinessServiceApplication focuses on authorization
   Once you login successfully, you are able to access methods defined in MyBusinessController </br>
   I introduced a custom filter which is used to get the authentication object created in AuthenticationServiceApplication </br>
   since the session among different spring boot applications is shared, we are able to fetch the authentication object created previously from the shared session </br>
   Once we get the authentication object, we create an UsernamePasswordAuthenticationToken object and put it into SecurityContext, <br>
   FilterSecrurityInterceptor will use it to process authorization

Preparation:
--------------------------
1. Install redis </br>
   We assume your docker env is ready before setting up redis. </br>
   modify docker-compose-redis-sentiel.yml by setting REDIS_MASTER_HOST to be your owned redis master, </br>
   then run the command below to install redis:</br>

```aidl
docker-compose -f docker-compose-redis-sentiel.yml up -d
```
2. Prepare database
```aidl
CREATE database sso_spring_session;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on sso_spring_session.* TO 'demouser'@'%';


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

INSERT INTO ROLE(`NAME`) values ('ROLE_USER');
INSERT INTO ROLE(`NAME`) values ('ROLE_ADMIN');
```


How to run this demo:
----------------------------
1. Run AuthenticationServiceApplication and BusinessServiceApplication
2. Register 3 users, one with user role, one with admin role, one with user and admin roles
   Launch http://127.0.0.1:8080/api/auth/register (POST method) </br>
   For user with user role, </br>
   Set request body to be something like below, eg:</br>
```aidl
{
    "username" : "oneUser",
    "password" : "123456",
    "roles" : ["ROLE_USER"]
}
```
For user with admin role, </br>
Set request body to be something like below, eg:</br>
```aidl
{
    "username" : "oneAdmin",
    "password" : "456789",
    "roles" : ["ROLE_ADMIN"]
}
```

For user with user & admin role, </br>
Set request body to be something like below, eg:</br>
```aidl
{
    "username" : "useradmin",
    "password" : "124578",
    "roles" : ["ROLE_USER", "ROLE_ADMIN"]
}
```

3. Access business code </br>

   3.1   Access to http://127.0.0.1:8080/api/business/test1 (GET method)

     - Login as oneUser :
       Launch http://127.0.0.1:8080/api/auth/login?username=oneUser&password=123456 (GET method), 
     - Launch /api/business/test1
       Launch http://127.0.0.1:8080/api/business/test1 (GET method)
     - You will see: </br>
       test1 is accessed by ROLE_USER, </br>
       Because  oneUser has ROLE_USER permission
   
     - Login as oneAdmin
       Logout first. Launch http://127.0.0.1:8080/api/auth/logout?username=oneUser
       Launch http://127.0.0.1:8080/api/auth/login?username=oneAdmin&password=456789 (GET method)
     - Launch /api/business/test1
       Launch http://127.0.0.1:8080/api/business/test1 (GET method)
     - There will be a 403 forbidden error because oneAdmin doesn't have  ROLE_USER permission

     - Login as useradmin
       Logout first. Launch http://127.0.0.1:8080/api/auth/logout?username=oneAdmin
       Launch http://127.0.0.1:8080/api/auth/login?username=useradmin&password=124578 (GET method)
     - Launch /api/business/test1
       Launch http://127.0.0.1:8080/api/business/test1 (GET method)
     - You will see:
       "test1 is accessed by ROLE_USER" </br>
        Because  useradmin has ROLE_USER permission
   
   3.2   Access to http://127.0.0.1:8080/api/business/test2 (GET method)
     - Login as oneUser :
       Logout first. Launch http://127.0.0.1:8080/api/auth/logout?username=useradmin
       Launch http://127.0.0.1:8080/api/auth/login?username=oneUser&password=123456 (GET method),
     - Launch /api/business/test2
       Launch http://127.0.0.1:8080/api/business/test2 (GET method)
     - There will be a 403 forbidden error because oneUser doesn't have  ROLE_ADMIN permission
     
     - Login as oneAdmin
       Logout first. Launch http://127.0.0.1:8080/api/auth/logout?username=oneUser
       Launch http://127.0.0.1:8080/api/auth/login?username=oneAdmin&password=456789 (GET method)
     - Launch /api/business/test2
       Launch http://127.0.0.1:8080/api/business/test2 (GET method)
     - You will see: </br>
       test2 is accessed by ROLE_ADMIN, </br>
       Because  oneAdmin has ROLE_ADMIN permission

      - Login as useradmin
        Logout first. Launch http://127.0.0.1:8080/api/auth/logout?username=oneAdmin
        Launch http://127.0.0.1:8080/api/auth/login?username=useradmin&password=124578 (GET method)
      - Launch /api/business/test2
        Launch http://127.0.0.1:8080/api/business/test2 (GET method)
      - You will see:
        "test2 is accessed by ROLE_ADMIN" </br>
        Because  useradmin has ROLE_ADMIN permission
   
      3.3   Access to http://127.0.0.1:8080/api/business/test3 (GET method)

   - Login as oneUser :
     Logout first. Launch http://127.0.0.1:8080/api/auth/logout?username=useradmin
     Launch http://127.0.0.1:8080/api/auth/login?username=oneUser&password=123456 (GET method),
   - Launch /api/business/test3
     Launch http://127.0.0.1:8080/api/business/test3 (GET method)
   - You will see: </br>
     test3 is accessed by ROLE_USER or ROLE_ADMIN, </br>
     Because  oneUser has ROLE_USER permission

   - Login as oneAdmin
     Logout first. Launch http://127.0.0.1:8080/api/auth/logout?username=oneUser
     Launch http://127.0.0.1:8080/api/auth/login?username=oneAdmin&password=456789 (GET method)
   - Launch /api/business/test3
     Launch http://127.0.0.1:8080/api/business/test3 (GET method)
   - You will see: </br>
     test3 is accessed by ROLE_USER or ROLE_ADMIN, </br>
     Because  oneAdmin has ROLE_ADMIN permission

   - Login as useradmin
     Logout first. Launch http://127.0.0.1:8080/api/auth/logout?username=oneAdmin
     Launch http://127.0.0.1:8080/api/auth/login?username=useradmin&password=124578 (GET method)
   - Launch /api/business/test3
     Launch http://127.0.0.1:8080/api/business/test3 (GET method)
   - You will see:
     test3 is accessed by ROLE_USER or ROLE_ADMIN </br>
     Because  useradmin has ROLE_ADMIN permission
