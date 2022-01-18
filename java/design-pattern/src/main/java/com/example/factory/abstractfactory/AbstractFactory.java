package com.example.factory.abstractfactory;

public interface AbstractFactory {
    Phone makePhone();
    PC makePC();
    Chip makeChip();
}
