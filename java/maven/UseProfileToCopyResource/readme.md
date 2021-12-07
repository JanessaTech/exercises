This demo shows  two functions:
 1. How to use properties defined in pom.xml to replace the place holders defined in application.properties.
 2. How to use maven profile to define a different set of properties

How to run:</br>
1. Go into this directory
2. run mvn clean package (By default, dev profile is activated)
3. run java -jar target/UseProfileToCopyResource-0.0.1-SNAPSHOT.jar. You will see like this:
```
db.username:mkyong
db.driverClassName:com.mysql.jdbc.Driver
db.url:jdbc:mysql://localhost:3306/dev
db.password:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
```

You will see like this if you run mvn clean package -Pprod:</br>
```
db.username:mkyong
db.driverClassName:com.mysql.jdbc.Driver
db.url:jdbc:mysql://live01:3306/prod
db.password:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
```
