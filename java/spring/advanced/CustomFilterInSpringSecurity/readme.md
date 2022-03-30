In this demo, I added two classes extended from WebSecurityConfigurerAdapter. </br>
Each one can be thought of as a spring security filter chain builder. </br>
Here we have two builders. </br>

For each builder, we could add custom filter and tells spring which requests could be accepted. </br>
For example, for Custom1WebSecurityConfigurerAdapter, we tell spring this filter chain could 
accept requests starting with "/match1"


