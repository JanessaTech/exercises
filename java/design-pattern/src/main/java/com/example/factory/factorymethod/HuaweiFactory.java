package com.example.factory.factorymethod;

public class HuaweiFactory implements Factory {
    @Override
    public Phone createPhone() {
        return new HuaweiPhone();
    }
}
