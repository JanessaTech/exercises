Prepare database
-------------------------------------
```aidl
CREATE database jwt_demo;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jwt_demo.* TO 'demouser'@'%';
```

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

How to run this demo:
1. Run DefaultSecurityUsingDbApplication
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
3. Access business code
 3.1   Access to http://127.0.0.1:8080/api/business/test1 (GET method)
    - With "oneUser"'s Authentication
      In authentication tab in postman, choose type to be Basic Auth, username is oneUser, password is 123456 </br>
      You will message: test1 is accessed by ROLE_USER </br>
    - With "oneAdmin"'s authentication
      In authentication tab in postman, choose type to be Basic Auth, username is oneAdmin, password is 456789 </br>
      You will see : 403 Forbidden, no message returned </br>
    - With "useradmin"'s authentication
      In authentication tab in postman, choose type to be Basic Auth, username is useradmin, password is 124578 </br>
      You will message:  "test1 is accessed by ROLE_USER" </br>
   
 3.2   Access to http://127.0.0.1:8080/api/business/test2 (GET method)
  - With "oneUser"'s Authentication
     In authentication tab in postman, choose type to be Basic Auth, username is oneUser, password is 123456 </br>
     You will see : 403 Forbidden, no message returned </br>
  - With "oneAdmin"'s authentication
     In authentication tab in postman, choose type to be Basic Auth, username is oneAdmin, password is 456789 </br>
    You will message: test2 is accessed by ROLE_ADMIN </br>
  - With "useradmin"'s authentication
    In authentication tab in postman, choose type to be Basic Auth, username is useradmin, password is 124578 </br>
    You will message: test2 is accessed by ROLE_ADMIN </br>

 3.3   Access to http://127.0.0.1:8080/api/business/test3 (GET method)
  - With "oneUser"'s Authentication
     In authentication tab in postman, choose type to be Basic Auth, username is oneUser, password is 123456 </br>
     You will see message: test3 is accessed by ROLE_ADMIN or ROLE_USER </br>
  - With "oneAdmin"'s authentication
     In authentication tab in postman, choose type to be Basic Auth, username is oneAdmin, password is 456789 </br>
     You will see message: test3 is accessed by ROLE_ADMIN or ROLE_USER </br>
  - With "useradmin"'s authentication
    In authentication tab in postman, choose type to be Basic Auth, username is useradmin, password is 124578 </br>
    You will see message: test3 is accessed by ROLE_ADMIN or ROLE_USER </br>
  


More details about filters: </br>
  - Set breakpoint at line 24 in UserDetailService.java
  - Run DefaultSecurityUsingDbApplication in debug mode
  - Launch http://127.0.0.1:8080/api/business/test1 (GET method) with oneUser authentication
  - Click FilterChainProxy.VirtualFilterChain class in call back stack, the variable additionalFilters contains the list of filters which are: </br>
    1. WebAsyncManagerIntegrationFilter
    2. SecurityContextPersistenceFilter
    3. HeaderWriterFilter
    4. LogoutFilter
    5. BasicAuthenticationFilter
    6. RequestCacheAwareFilter 
    7. SecurityContextHolderAwareRequestFilter 
    8. AnonymousAuthenticationFilter 
    9. SessionManagementFilter 
    10. ExceptionTranslationFilter 
    11. FilterSecrurityInterceptor