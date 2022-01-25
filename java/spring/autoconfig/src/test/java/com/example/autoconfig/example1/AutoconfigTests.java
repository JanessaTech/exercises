package com.example.autoconfig.example1;

import com.example.autoconfig.exmaple1.AutoconfigApplication;
import com.example.autoconfig.exmaple1.MyUser;
import com.example.autoconfig.exmaple1.MyUserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AutoconfigApplication.class)
@EnableJpaRepositories(basePackages = {"com.example.autoconfig"})
class AutoconfigTests {

    @Autowired
    private MyUserRepository userRepository;

    @Test
    public void whenSaveUser_thenOk() {
        MyUser user = new MyUser();
        user.email = "user@email.com";
        userRepository.save(user);
    }

}
