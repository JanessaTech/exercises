This demo shows how to publish/receive event using the mechanism provided by spring framework </br>
rather than using some 3-party JMS solution saying rabbimq.

This demo shows two ways of publish/receive event:
1. Synchronous way
2. Asynchronos way

--------------------------------------------------------------------------------------------------------
How to run this demo in a synchronous way:
 - Run SpringEventApplication in your IDE
 - Launch http://127.0.0.1:8080/orders/1 (POST) in postman
You will see logs in console like below:
```aidl
2022-07-24 22:12:00.953  INFO 7880 --- [nio-8080-exec-1] c.s.e.e.s.controller.EventController     : Thread http-nio-8080-exec-1 is running in EventController.buyOrder. orderId=1
2022-07-24 22:12:00.954  INFO 7880 --- [nio-8080-exec-1] c.s.e.e.s.service.ProductOrderService    : Thread http-nio-8080-exec-1 starts to send ProductOrderEvent, orderId=1
2022-07-24 22:12:00.954  INFO 7880 --- [nio-8080-exec-1] c.s.e.e.s.listener.ProductOrderListener  : Thread http-nio-8080-exec-1 received ProductOrderEvent, orderId=1
2022-07-24 22:12:05.962  INFO 7880 --- [nio-8080-exec-1] c.s.e.e.s.listener.ProductOrderListener  : Thread http-nio-8080-exec-1 is finished with ProductOrderEvent, orderId=1
2022-07-24 22:12:05.962  INFO 7880 --- [nio-8080-exec-1] c.s.e.e.s.controller.EventController     : Thread http-nio-8080-exec-1 is finished in EventController.buyOrder. orderId=1
```
You will see that both ApplicationEventPublisher and ProductOrderListener are running in the same thread

How to run this demo in an asynchronous way:
- uncomment @Configuration for the class AsynchronousEventsConfig
- Run SpringEventApplication in your IDE
- Launch http://127.0.0.1:8080/orders/1 (POST) in postman
  You will see logs in console like below:
```aidl
2022-07-24 22:06:23.638  INFO 18376 --- [nio-8080-exec-1] c.s.e.e.s.controller.EventController     : Thread http-nio-8080-exec-1 is running in EventController.buyOrder. orderId=1
2022-07-24 22:06:23.638  INFO 18376 --- [nio-8080-exec-1] c.s.e.e.s.service.ProductOrderService    : Thread http-nio-8080-exec-1 starts to send ProductOrderEvent, orderId=1
2022-07-24 22:06:23.639  INFO 18376 --- [nio-8080-exec-1] c.s.e.e.s.controller.EventController     : Thread http-nio-8080-exec-1 is finished in EventController.buyOrder. orderId=1
2022-07-24 22:06:23.639  INFO 18376 --- [TaskExecutor-19] c.s.e.e.s.listener.ProductOrderListener  : Thread SimpleAsyncTaskExecutor-19 received ProductOrderEvent, orderId=1
2022-07-24 22:06:28.650  INFO 18376 --- [TaskExecutor-19] c.s.e.e.s.listener.ProductOrderListener  : Thread SimpleAsyncTaskExecutor-19 is finished with ProductOrderEvent, orderId=1
```
You will see that the ProductOrderListener is running in a thread named TaskExecutor-19,
different from the thread named nio-8080-exec-1 running ApplicationEventPublisher

For more details, see link: https://www.baeldung.com/spring-events