In this demo, I added two classes extended from WebSecurityConfigurerAdapter. </br>
Each one can be thought of as a spring security filter chain builder. </br>
Here we have two builders. </br>

Each builder creates a filter chain, each chain contains several filters. we could also add custom </br>
filter into filter chain </br>
In this demo, we have two filter chains, one let's call chain1 created by Custom1WebSecurityConfigurerAdapter, </br>
another let' call chain2 created by Custom1WebSecurityConfigurerAdapter. </br>

<p></p>
chain1 accepts requests starting with "/match1/", and a custom filter called Custom1Filter is added</br>
chain2 accepts requests starting with "/match2/" , and a custom filter called Custom2Filter is added </br>

How to run this demo:
--------------------------
1. Run CustomFilterInSpringSecurityApplication in debug mode, put break point at line 11 and line 16 in MyController
2. Send request http://127.0.0.1:8080/match1 (GET method) in postman
3. In the call stack, you will see a class FilterChainProxy$VirtualFilterChain </br>
   the variable defined in additionalFilters is the list of filters http://127.0.0.1:8080/match1 will go through
   


