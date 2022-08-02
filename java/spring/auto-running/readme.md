How to run this demo:
---------------------------------
- Run AutoRunningApplication in IDE

You will see logs as below in console:
```aidl
2022-08-02 08:56:16.195  INFO 2028 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-08-02 08:56:16.195  INFO 2028 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 454 ms
2022-08-02 08:56:16.222  INFO 2028 --- [           main] c.a.e.a.components.DemoPostConstruct     : ===========static=============
2022-08-02 08:56:16.222  INFO 2028 --- [           main] c.a.e.a.components.DemoPostConstruct     : =============DemoPostConstruct=============
2022-08-02 08:56:16.223  INFO 2028 --- [           main] c.a.e.a.components.DemoPostConstruct     : ============@PostConstruct===========
2022-08-02 08:56:16.375  INFO 2028 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2022-08-02 08:56:16.381  INFO 2028 --- [           main] c.a.e.a.AutoRunningApplication           : Started AutoRunningApplication in 0.846 seconds (JVM running for 1.186)
2022-08-02 08:56:16.382  INFO 2028 --- [           main] c.a.e.a.runners.DemoApplicationRunner    : ==== @Order(1) in DemoApplicationRunner ====
2022-08-02 08:56:16.382  INFO 2028 --- [           main] c.a.e.a.runners.DemoCommandLineRunner    : ==== @Order(2) in DemoCommandLineRunner ====
```
