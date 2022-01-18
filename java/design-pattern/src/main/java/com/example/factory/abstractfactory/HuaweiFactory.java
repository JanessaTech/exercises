package com.example.factory.abstractfactory;

public class HuaweiFactory implements AbstractFactory{
    @Override
    public Phone makePhone() {
        return new HuaweiPhone();
    }

    @Override
    public PC makePC() {
        return new HuaweiPC();
    }

    @Override
    public Chip makeChip() {
        return new HuaweiChip();
    }
}
