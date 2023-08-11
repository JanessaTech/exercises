# Install dependencies
-  npm install --save express
-  npm i --save lodash
-  npm install --save body-parser
-  npm install --save cookie-parser
-  npm install --save express-validator
-  npm install --save express-session


# How to start app
```
    node .\server.js
```

# Some requests
 - http://127.0.0.1:8080/apis/v1/users/  (GET)

We see result in browser:
 ```
    {"success":{"msg":"getAllUser"}}
 ```
we see log in console:
```
Request was made to: /apis/v1/users
Verify token in middleware
getAllUser

```
 - http://127.0.0.1:8080/apis/v1/users/123  (GET)

We see result in browser:
```
    {"success":{"msg":"getUserById 123"}}
```
we see log in console:
```
Request was made to: /apis/v1/users/123
Verify token in middleware
getUserById: 123
```
 - http://127.0.0.1:8080/apis/v1/auth/login  (GET)

We see result in browser:
```
    {"success":{"msg":"login"}}
```
we see log in console:
```
Request was made to: /apis/v1/auth/login
Verify token in middleware
login
```