How to run this demo:</br>
 - run AopApplicationTests

This demo shows how to use AOP on an ordinary java class or an annotation. </br>
In order to make better use of AOP, some knowledge about java reflection is a must. Here list some APIs we often use about java refection:
 - ((MethodSignature))ProceedingJoinPoint.getSignature : Get signature of the joinPoint
 - ProceedingJoinPoint.args  // get arguments of the joinPoint

 - MethodSignature.getMethod()  // the Method obj of the signature
 - Method.getAnnotation        // get annotation of the method by the parameter 
 - Method.parameterAnnotations  // get the list of annotations on parameters
 - Method.isAnnotationPresent, Field.isAnnotationPresent, class.isAnnotationPresent  // identify if an annotation exists for method, field and class


See more detais about AOP, see link : https://dzone.com/articles/implementing-aop-with-spring-boot-and-aspectj