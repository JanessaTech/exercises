package com.demo.lambda.more;

public class VUtils {
    public static ThrowExceptionFunction isTure(boolean b) {
        return (errorMessage) -> {
            if (b)
                throw new RuntimeException(errorMessage);
        };
    }

    public static BranchHandle isTureOrFalse(boolean b) {

        return (trueHandle, falseHandle) -> {
            if (b) {
                trueHandle.run();
            } else {
                falseHandle.run();
            }
        };
    }

    public static PresentOrElseHandler<?> isBlankOrNoBlank(String str) {
        return (consumer, action) -> {
            if (str == null || str.isEmpty()) {
                action.run();
            } else {
                consumer.accept(str);
            }
        };
    }
}
