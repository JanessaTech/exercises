package com.demo.lambda.more;

@FunctionalInterface
public interface BranchHandle {
    void trueOrFalseHandle(Runnable trueHandle, Runnable falseHandle);
}
