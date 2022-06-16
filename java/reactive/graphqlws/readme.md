How to run:
----------------------------
1. Install rabbitmq
```aidl
docker run -d --name rabbitmq -p 5672:5672 --restart=always -p 15672:15672 rabbitmq:3.8-management
webportal: http://192.168.1.107:15672/  (assume the ip of the host that docker is running on is 192.168.1.107)
configure username , password and permission in docker by running the following commands:
rabbitmqctl add_user admin admin
rabbitmqctl set_permissions -p / admin ".*" ".*" ".*"
rabbitmqctl set_user_tags admin administrator
```
3. Install common project
4. Run GraphqlwsApplication in IDE
5. Run GraphqlProducerApplication in graphqlws-producer project
6. In postman, launch http://127.0.0.1:8181/send POST
```aidl
{
"name": "wei",
"age": 15
}
```
7. You will see message received in chrome browser by launching http://localhost:8182/, opening developer tools, navigating console tab:
```aidl
Subscription data: 
                data:
                getStudent:
                    age: 15
                    name: "wei"
```