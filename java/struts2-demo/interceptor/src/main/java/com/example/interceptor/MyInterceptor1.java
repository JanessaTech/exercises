package com.example.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class MyInterceptor1 extends AbstractInterceptor {
    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {
        System.out.println("Pre-Processing in MyInterceptor1");
        String result = actionInvocation.invoke();
        System.out.println("Post-Processing in MyInterceptor1");
        return result;
    }
}
