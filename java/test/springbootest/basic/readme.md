In this module, we show two basic examples on how to use @SpringBootTest

1. webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
   A web server will be started by using this way. </br>
   To avoid port conflict, we </br>
   provide a parameter(webEnvironment) for @SpringBootTest to tell web server </br>
   which port will be used<br/>
   Then we use @LocalServerPort to get random port, and use TestRestTemplate autowired to execute HTTP requests
   

3. @AutoConfigureMockMvc
   A web server will not be started. </br>
   However, the way it deals with all incoming HTTP requests is exactly the same as a web server was started 
   