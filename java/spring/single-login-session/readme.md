This demo shows how to login/logout and access to business logic only after login successfully

How to run this demo:

1. Login
    Launch http://127.0.0.1:8080/login?username=admin&password=12345 (GET method)  </br>
    You will see message : "login success" </br>
    You could see message if login again : "already logined" </br>
2. Logout
    Launch http://127.0.0.1:8080/logout?username=admin  (GET method) </br>
    You will see message if you'v logined successfully: "logout successfully" </br>
    You will see message if you don't login : "You need login first" </br>

3. Access business logic
   Launch http://127.0.0.1:8080/business  (GET method)   </br>
   You will see message if you don't login : "You need login first" </br>
   You will see message if you'v logined successfully: "access business successful" </br>


In this example, I used a custom intercepor - AddInterceptor to intercept all requests except login/logout requests