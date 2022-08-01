package com;

import com.PoJo.ServiceAObj;
import com.PoJo.ServiceBObj;
import com.business.ServiceA;
import com.business.impl.ServiceAImpl;
import com.business.ServiceB;
import com.business.impl.ServiceBImpl;

public class Demo {
    public static void main(String[] args) {
        ServiceA serviceA = new ServiceAImpl();
        ServiceB serviceB = new ServiceBImpl();
        System.out.println(serviceA.op(new ServiceAObj()));
        serviceA.customMethodA();
        System.out.println(serviceB.op(new ServiceBObj()));
        serviceB.customMethodB();
    }
}
