This demo shows how to inject object in different ways. </br>

Basically, there are three widely used ways to inject beans: </br>
* Field injection
* Setting injection
* Constructor injection


1. Field injection
   As shown in ListInjectionDemo. For field injection, we use @Autowired on the field we want to inject.</br>
   (Notice: In this example, we inject myServices as a List<MyService> because we have three implementation for MyService interface.<br>
</br>
2. Setting injection
   As shown in SettingInjectionDemo. For Setting injection, we use @Autowired on the setting method.</br>
   </br>
3. Constructor injection
   As shown in ConstructorInjectionDemo. For Constructor injection, we use @Autowired on a constructor.</br>

   
How to run this demo:
 - Run ListInjectionDemoTest to see how Field injection works
 - Run SettingInjectionDemoTests to see how Setting injection works
 - Run ConstructorInjectionDemoTests to see how Constructor injection works
