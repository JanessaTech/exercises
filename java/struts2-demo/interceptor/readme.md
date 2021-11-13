How to run:
1. configurate Intellij 
 Similar as helloword example. Application context is: /interceptor_war
2. http://localhost:8080/interceptor_war/index.action will be launched automatically
   input anything in text saying "Juan"
   we will see message in console below:

   Pre-Processing in MyInterceptor1
   Pre-Processing in MyInterceptor2
   HelloWorldAction is executing ...
   Post-Processing in MyInterceptor2
   Post-Processing in MyInterceptor1