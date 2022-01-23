This demo shows how to use redis to make spring session works. </br>
For the details about spring session, see https://www.javadevjournal.com/spring/spring-session/ </br>
 <p></p>
How to run this demo: </br>
1. setup redis
   we assume your docker env is ready before setting up redis. </br>
   modify docker-compose-redis-sentiel.yml by setting REDIS_MASTER_HOST to be your owned redis master, </br>
   then run the command below to install redis:</br>

```aidl
docker-compose -f docker-compose-redis-sentiel.yml up -d
```

2. run SessionApplication with postman
 Start SessionApplication first. when it is ready, use postname to send request. </br>
 Request info: </br>
  - url: http://127.0.0.1:8080
  - request type: get
  - authorization: 
     1. type: Basic
     2. username: admin
     3. password: nimda
 
You will see session id returned if the request is successful: </br>
 session id looks like this: a889494c-6e65-4ec5-a596-bc86e89713df

3. run SessionApplicationTests (optional)
   You could run SessionApplicationTests you don't what to use postman </br>
   There are two test cases.
   1. testUnauthenticated </br>
   This is to test what would hanppen if you send request without authorization info attached
   2. testSpringSessionAPI </br>
   This case send two requests: first request with authorization info attached, second request </br>
   has no authorization but has cookie info returned by the first request. </br>
   we expect both two requests have the same session id returned.
   