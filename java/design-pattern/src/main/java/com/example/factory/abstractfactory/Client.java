package com.example.factory.abstractfactory;

public class Client {
    public static void main(String[] args) {
        AbstractFactory huaweiFactory = new HuaweiFactory();
        AbstractFactory xiaomiFactory = new XiaomiFactory();

        Phone huaweiPhone = huaweiFactory.makePhone();
        PC huaweiPC = huaweiFactory.makePC();
        Chip huaweiChip = huaweiFactory.makeChip();
        huaweiChip.show();
        huaweiPC.show();
        huaweiChip.show();


        Phone xiaomiPhone = xiaomiFactory.makePhone();
        PC xiaomiPC = xiaomiFactory.makePC();
        Chip xiaomiChip = xiaomiFactory.makeChip();
        xiaomiPhone.show();
        xiaomiPC.show();
        xiaomiChip.show();

    }
}
