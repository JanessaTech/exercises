package com.business.impl;

import com.PoJo.ServiceAObj;
import com.base.AbstractOperation;
import com.business.ServiceA;

public class ServiceAImpl extends AbstractOperation<ServiceAObj> implements ServiceA {

    @Override
    public void customMethodA() {
        System.out.println("execute customMethodB");
    }
}
