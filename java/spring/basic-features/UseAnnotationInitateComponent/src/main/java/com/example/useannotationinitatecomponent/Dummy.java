package com.example.useannotationinitatecomponent;

import org.springframework.stereotype.Component;



@Component
//@FooContainer({@Foo("baz"), @Foo("qux")})
//@ConfigContainer(value = {
        //@Config(name = "jane", age = 20),
        //@Config(name = "wei", age = 30)
//})
//@ConfigContainer(value = {"jane"})

@Auditable("person.sleep")
public class Dummy {}
