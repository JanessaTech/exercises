This demo shows how to import classes outside the project by using @ImportResource.

In this example, I specified businessA-service.xml to be imported. <br/>
Note that, in order to make businessA-service.xml available,  you need to import the follow dependence:
```aidl
<dependency>
            <groupId>com.example</groupId>
            <artifactId>service</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
```

How to run this demo:
1. Install service project
2. Run UsageApplication, you will see message below printed in console:
```aidl
==================ServiceA is initiated====================
```
