package com.example.factory.factorymethod;

public class XiaomiFactory implements Factory {
    @Override
    public Phone createPhone() {
        return new XiaomiPhone();
    }
}
