package com.example.injection.setting;


import com.example.injection.MyBusiness;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class SettingInjectionDemoTests {
    @Autowired
    SettingInjectionDemo settingInjectionDemo;

    @Test
    void test() {
        MyBusiness myBusiness = settingInjectionDemo.getMyBusiness();
        assertEquals("service A,service B,service C", myBusiness.getAllNamesOfServices());
    }
}
