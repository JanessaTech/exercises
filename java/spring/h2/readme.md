This example shows how to use h2 to do CRUD.

How to run: 
------------------------
1. Run H2Application directly
2. Launch http://127.0.0.1:8080/countries, you will see:
```aidl
[{"id":1,"name":"USA"},{"id":2,"name":"France"},{"id":3,"name":"Brazil"},{"id":4,"name":"Italy"},{"id":5,"name":"Canada"}]
```
3. In postman, input url and json data as below, post request:
 - url: http://127.0.0.1:8080/countriespost </br>
 - json data:
```aidl
{"name":"taiwan"}
```
4. Launch http://127.0.0.1:8080/countries again, you will see the new contry was added:
```aidl
[{"id":1,"name":"USA"},{"id":2,"name":"France"},{"id":3,"name":"Brazil"},{"id":4,"name":"Italy"},{"id":5,"name":"Canada"},{"id":6,"name":"taiwan"}]
```

Check h2 console:
------------------------------
1. http://127.0.0.1:8080/h2-console/
2. input Driver Class, JDBC URL, User Name and Password specified in application.properties:
```aidl
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
```
3. Click [Connect] button. 
4. You could run some sql statements as you want

Reference: https://www.baeldung.com/spring-boot-h2-database

