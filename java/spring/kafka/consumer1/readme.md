This is a very simple kafka producer/consumer example. </br>

How to run this demo: </br>
1. Install kafka (By docker)
   Modify the docker-compose-kafka.yml under root project(kafka project): </br>
   Modify KAFKA_ADVERTISED_HOST_NAME to be the ip of kafka server. </br>
   Run command below: 
```
docker-compose -f docker-compose-kafka.yml up -d
```
   
2. Run producer1 project
3. Run consumer1 project
4. In postman, launch http://127.0.0.1:9000/kafka/publish?message=aaaaaaaaaaa with POST method
   You will see the following in consumer1 console:
```
#### -> Consumed message -> aaaaaaaaaaa
```