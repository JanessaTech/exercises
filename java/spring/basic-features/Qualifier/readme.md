Suppose you have more than one implementation for one interface, you want to inject a specific implementation. </br>
There are two steps to achieve it:
 - Give a name to the specific bean
 - Use @Qualifier to specify the bean name when injecting the bean

In this example, we have one interface MyService, two implementation for this interface: MyMacService and MyWindowsService. </br>
For each implementation, I gave a name in @Service annotation.
In MyFactory, I used @Qualifier to specify which implementation I want to inject. </br>

How to run this demo: </br>
 Run QualifierApplicationTests