package com.example.injection.setting;

import com.example.injection.MyBusiness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingInjectionDemo {

    private MyBusiness myBusiness;

    @Autowired
    public void setMyBusiness(MyBusiness myBusiness) {
        this.myBusiness = myBusiness;
    }

    public MyBusiness getMyBusiness() {
        return this.myBusiness;
    }
}
