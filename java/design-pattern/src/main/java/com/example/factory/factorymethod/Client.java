package com.example.factory.factorymethod;

public class Client {
    public static void main(String[] args) {
        Factory huaweiFactory = new HuaweiFactory();
        Factory xiaomiFactory = new XiaomiFactory();

        Phone huawei = huaweiFactory.createPhone();
        Phone xiaomi = xiaomiFactory.createPhone();

        huawei.show();
        xiaomi.show();
    }
}
