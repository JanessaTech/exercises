This demo shows how to use @Primary </br>

In some situation, there are more than one implementation for one interface, and we want to inject one of them. </br>
@Primary tells springboot which implementation should be injected. </br>

In this example, we have two implementation for Manager interface: GeneralManager and DepartmentManager </br>
we want to inject GeneralManager. I used @Primary to tell springboot to inject GeneralManager only. </br>

How to run this demo:
 Run UsagePrimaryApplicationTests

