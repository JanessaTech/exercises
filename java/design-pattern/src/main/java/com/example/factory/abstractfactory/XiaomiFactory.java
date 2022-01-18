package com.example.factory.abstractfactory;

public class XiaomiFactory implements AbstractFactory{
    @Override
    public Phone makePhone() {
        return new XiaomiPhone();
    }

    @Override
    public PC makePC() {
        return new XiaomiPC();
    }

    @Override
    public Chip makeChip() {
        return new XiaomiChip();
    }
}
