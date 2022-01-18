package com.example.prototype;

public class Test {
    public static void main(String[] args) throws CloneNotSupportedException {
        Student student1 = new Student("Jane", 10);
        Student student2 = student1.clone();

        System.out.println(student1.hashCode() + ":" + student1);
        System.out.println(student2.hashCode() + ":" + student2);
    }
}
