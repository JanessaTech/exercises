package com.business.impl;

import com.PoJo.ServiceBObj;
import com.base.AbstractOperation;
import com.business.ServiceB;

public class ServiceBImpl extends AbstractOperation<ServiceBObj> implements ServiceB {

    @Override
    public void customMethodB() {
        System.out.println("execute customMethodB");
    }
}
