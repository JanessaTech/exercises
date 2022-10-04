This demo shows how to implement sso using a set of tech stack like spring security, jwt, spring cloud gateway</br>

How does it work:</br>
 1. Send a login request along with username and password to gateway-service.</br>
    gateway-service routes the login request to authentication-service. </br>
    A token in the form of JWT is returned to gateway-service once authentication is successful on authentication-service
 2. Send a business request along with the token generated in #1 to gateway-service,</br>
    gateway-service will verify if the token taken by then business request is valid. Extract the userName from the token </br>
    if the token is valid, then put the userName into the header of the business request. The business request is routed to </br>
    mybusiness-service

How to run this demo:</br>
-----------------------------
1. Install common project
2. Run eureka-service, authentication-service, gateway-service and mybusiness-service one by one, make sure all services are succcfully registered on eureka-service </br>
3. Send a login request: http://127.0.0.1:8763/auth/login?userName=admin&password=123456 (GET) in postman, you will see a token like below returned: </br>
```aidl
eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY2NDg4MzUyMSwiZXhwIjoxNjY0OTY5OTIxfQ.RIpRbrXjUnxiZN3mViCGeHAzAA3_iztAJ2zZVAS5hTj6Lx0Piwu-1-6H1MNN53DRKAOgzgPJrvktKwtCys6q6A
```
4. Send a business request: http://127.0.0.1:8762/business/hello?msg=jannessa-message (GET) in postman, make sure a header named "token" is filled in before sending, the value of this header is the token retured in #3
5. You will see "ok" returned in response and a log saying below in the console of mybusiness-service:
```aidl
User admin is saying jannessa-message
```



