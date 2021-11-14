How to run:
1. Configure Intellij 
 Similar as helloword example. Application context is: /interceptor_war
2. Run the new configuration
3. http://localhost:8080/interceptor_war/index.action will be launched automatically<br>
   input anything in text saying "Juan", click [Say Hello],<br>
   we will see message in console below:
   ```
   Pre-Processing in MyInterceptor1
   Pre-Processing in MyInterceptor2
   HelloWorldAction is executing ...
   Post-Processing in MyInterceptor2
   Post-Processing in MyInterceptor1
   ```