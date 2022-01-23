package com.demo.lambda.more;

import java.util.function.Consumer;

public interface PresentOrElseHandler <T>{
    void presentOrElseHandle(Consumer<T> consumer, Runnable action);
}
