This is a demo to show how Spring security filter chain works

How to run this demo:
 - Run Demo.java in IDE directly
 - You will see output like below. 
```aidl
22:02:41.686 [main] INFO com.filterchain.ConcreteFilter - executing in filter filter1
22:02:41.688 [main] INFO com.filterchain.ConcreteFilter - executing in filter filter2
22:02:41.688 [main] INFO com.filterchain.ConcreteFilter - executing in filter filter3
```
 You see that filters defined in Demo run automatically one by one