# This demo shows how to use JWT + spring security to implement sso(Single Sign On). The key ideas are: </br>
 1. AuthticationServiceApplication focuses on authentication
 2. BusinessServiceApplication focuses on authorization

Let me explain each idea in detail
 - AuthticationServiceApplication

   AuthticationServiceApplication provides two functions : register and login (I will implement logout later on) </br>
   You could register several users with different roles (To simplify this demo, only 2 roles are supported: ROLE_USER, ROLE_ADMIN) </br>
   When login, you are asked to provide username and password which are used to create an UsernamePasswordAuthenticationToken object </br>
   passed to AuthenticationManager. AuthenticationManager will do authentication based on the authentication configuration we configured in WebSecurityConfig </br>
   Once authentication succeeds, AuthenticationManager returns an Authentication object. This object is critical because we will </br>
   it to create a jwt token. I am not intended to dive into what's jwt here, you could check some articles about it. Anyway the critical information included </br>
   in the token are username & roles which we will use later on.
   Once you login successfully, you will get a jwt token returned 

 - BusinessServiceApplication

    Now you are able to access methods defined in BusinessServiceApplication. 
    For each request, you must take the token generated previously in the form of Bearer Authorization in head</br>
    Here I introduced a custom filter in which we fetch & decode the token in the head of request and then create an </br>
    UsernamePasswordAuthenticationToken object and put it into SecurityContext.  FilterSecrurityInterceptor will use UsernamePasswordAuthenticationToken to process authorization </br>

# Prepare database
```aidl
CREATE database jwt_demo;
CREATE USER 'demouser'@'%' IDENTIFIED BY 'password';
GRANT ALL on jwt_demo.* TO 'demouser'@'%';

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

# How to run this demo
## 1. Run AuthticationServiceApplication and BusinessServiceApplication
## 2. Register 3 users, one with user role, one with admin role, one with user and admin roles
### 2.1 Creat a user with a role ROLE_USER only
  - Launch http://127.0.0.1:8080/api/auth/register (POST method) </br>
  - Set request body to be below:</br>
```aidl
{
    "username" : "oneUser",
    "password" : "123456",
    "roles" : ["ROLE_USER"]
}
```
### 2.2 Creat a user with a role ROLE_ADMIN only
 - Launch http://127.0.0.1:8080/api/auth/register (POST method) </br>
 - Set request body to be below:</br>
```aidl
{
"username" : "oneAdmin",
"password" : "456789",
"roles" : ["ROLE_ADMIN"]
}
```
### 2.1 Creat a user with the roles both ROLE_USER and ROLE_ADMIN
- Launch http://127.0.0.1:8080/api/auth/register (POST method) </br>
- Set request body to be below:</br>
```aidl
{
    "username" : "useradmin",
    "password" : "124578",
    "roles" : ["ROLE_USER", "ROLE_ADMIN"]
}
```

## 3.  Access business code
In WebSecurityConfig under business-service project, we've configured permissions as below:
```aidl
 http.cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/api/business/test1").hasRole("USER")
                .antMatchers("/api/business/test2").hasRole("ADMIN")
                .antMatchers("/api/business/test3").hasAnyRole("USER", "ADMIN");
```

 It means: 
 - /api/business/test1 can be accessed by users who have the role ROLE_USER 
 - /api/business/test2 can be accessed by users who have the role ROLE_ADMIN
 - /api/business/test1 can be accessed by users who have the role ROLE_USER or ROLE_ADMIN

Therefore :
 - oneUser is able to access to /api/business/test1 and /api/business/test3
 - oneAdmin is able to access to /api/business/test2 and /api/business/test3
 - useradmin is able to access to /api/business/test1, /api/business/test2 and /api/business/test3

Let's verify them

### 3.1 Login as oneAdmin
1. Launch http://127.0.0.1:8080/api/auth/login?username=oneAdmin&password=456789 (GET method) in postman
You will get the response like below: </br>
```aidl
{
    "username": "oneAdmin",
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvbmVBZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNjQ5NTA1MzgzLCJleHAiOjE2NDk1OTE3ODN9.kek52my9ioOQa-K7VI8_6gJabghaTYdII40oC0kSutdyUJ-h5hlCQkZ4OscWzUpDS8jHFwvGgi00MuKPAtkCIA",
    "roles": [
        "ROLE_ADMIN"
    ]
}
```
2. Access to http://127.0.0.1:8081/api/business/test1 </br>
 - Input token generated in step1 into Token input form under Authorization tab, choose Bearer token as type
- You will see error like below saying you are forbidden:
```aidl
{
    "timestamp": "2022-04-09T11:54:31.874+00:00",
    "status": 403,
    "error": "Forbidden",
    "path": "/api/business/test1"
}
```
3. Access to http://127.0.0.1:8081/api/business/test2
- You will receive message as below:
```aidl
test2 is accessed by ROLE_ADMIN
```
4. Access to http://127.0.0.1:8081/api/business/test3
- You will receive message as below:
```aidl
test3 is accessed by ROLE_USER or ROLE_ADMIN
```

### 3.2 Login as oneUser
1. Launch http://127.0.0.1:8080/api/auth/login?username=oneUser&password=123456 (GET method) in postman
   You will get the response like below: </br>
```aidl
{
    "username": "oneUser",
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvbmVVc2VyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0OTUwNDc5MiwiZXhwIjoxNjQ5NTkxMTkyfQ.WT_fzdWuEIWvZ8xqBdp2WN4F-vM0mVwpPUiuiXap2qnWMnQZjCMbEi4mh8eeFQXEUbQO-x15pLG6iP-Da6DhZw",
    "roles": [
        "ROLE_USER"
    ]
}
```
2. Access to http://127.0.0.1:8081/api/business/test1 </br>
- Input token generated in step1 into Token input form under Authorization tab, choose Bearer token as type
- You will receive message as below:
```aidl
test1 is accessed by ROLE_USER
```
3. Access to http://127.0.0.1:8081/api/business/test2
- You will see error like below saying you are forbidden:
```aidl
{
    "timestamp": "2022-04-09T11:54:31.874+00:00",
    "status": 403,
    "error": "Forbidden",
    "path": "/api/business/test2"
}
```
4. Access to http://127.0.0.1:8081/api/business/test3
- You will receive message as below:
```aidl
test3 is accessed by ROLE_USER or ROLE_ADMIN
```

### 3.3 Login as useradmin
1. Launch http://127.0.0.1:8080/api/auth/login?username=useradmin&password=124578 (GET method) in postman
   You will get the response like below: </br>
```aidl
{
    "username": "oneUser",
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvbmVVc2VyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY0OTUwNDc5MiwiZXhwIjoxNjQ5NTkxMTkyfQ.WT_fzdWuEIWvZ8xqBdp2WN4F-vM0mVwpPUiuiXap2qnWMnQZjCMbEi4mh8eeFQXEUbQO-x15pLG6iP-Da6DhZw",
    "roles": [
        "ROLE_ADMIN",
        "ROLE_USER"
    ]
}
```
2. Access to http://127.0.0.1:8081/api/business/test1 </br>
- Input token generated in step1 into Token input form under Authorization tab, choose Bearer token as type
- You will receive message as below:
```aidl
test1 is accessed by ROLE_USER
```
3. Access to http://127.0.0.1:8081/api/business/test2
- You will receive message as below:
```aidl
test2 is accessed by ROLE_ADMIN
```
4. Access to http://127.0.0.1:8081/api/business/test3
- You will receive message as below:
```aidl
test3 is accessed by ROLE_USER or ROLE_ADMIN
```

The behaviors are what we expected

Reference:
SpringBoot + JPA @ManyToMany 操作要点:
对应的Entity的建立。此处注意不可使用lombok @Data 注解。使用@Setter 、@Getter注解。主要原因时要自己覆写hash() equals(),toString() 方法。《、不然》 </br>
这样添加和删除的时候不会出现异常。否则出现循环的引用，不能删除或stackOver；</br>
see details: https://blog.csdn.net/weixin_40445684/article/details/101023477  </br>