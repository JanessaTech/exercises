1. Install activemq
```aidl
docker run -d --name rabbitmq -p 5672:5672 --restart=always -p 15672:15672 rabbitmq:3.8-management
http://192.168.1.107:15672/  (mq)
set up configuration in rabbitmq docker：
rabbitmqctl add_user admin admin
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
rabbitmqctl set_user_tags admin administrator 
```
2. Run "mvn install" for common project
3. Start consumer project. you will see that myexchange and myqueue are created automatically
4. Start producer project
5. In postman, launch http://127.0.0.1:8180/send, send json as following using post method:
```aidl
{
    "name":"jane",
    "age":20
}
```