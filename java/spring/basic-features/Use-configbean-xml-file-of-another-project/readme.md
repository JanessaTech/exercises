This is a demo to show how to use a bean defined in  an outside bean xml.

1. define a bean xml file: reference-beans.xml
2. Use the line below to reference beans.xml defined in another project
```
<import resource="classpath*:/beans.xml"/>
```
3. to be able to make the reference valid, you need to add another project as dependence in pom.xml
```
<dependency>
            <groupId>com.example</groupId>
            <artifactId>Integrate-xml-configuration</artifactId>
            <version>0.0.1-SNAPSHOT</version>
        </dependency>
```
4. run mvn install for Integrate-xml-configuration project before running test case in this project
5. run UseConfigbeanXmlFileOfAnotherProjectApplicationTests