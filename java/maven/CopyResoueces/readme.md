This demo shows how to use profile to decide which properties file to be copied </br>

How to run:
1. Go to this directory
2. run mvn clean package (default profile is dev)
3. run java -jar target/CopyResoueces-0.0.1-SNAPSHOT.jar, you will see like below
```
db.username:mkyong
db.driverClassName:com.mysql.jdbc.Driver
db.url:jdbc:mysql://localhost:3306/dev
db.password:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
```
You see that the application.properties under resources/dev is copied</br>
</br>

4. run mvn clean package -Ptest
5. run java -jat target/CopyResoueces-0.0.1-SNAPSHOT.jar, you will see like below:
```
db.username:mkyong
db.driverClassName:com.mysql.jdbc.Driver
db.url:jdbc:mysql://test01:3306/test
db.password:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
```
You see that the application.properties under resources/test is copied</br>
</br>

6. run mvn clean package -Pprod
7. run java -jar target/CopyResoueces-0.0.1-SNAPSHOT.jar, you will see like below
```
db.username:mkyong
db.driverClassName:com.mysql.jdbc.Driver
db.url:jdbc:mysql://live01:3306/prod
db.password:8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
```
You see that the application.properties under resources/prod is copied</br>
</br>