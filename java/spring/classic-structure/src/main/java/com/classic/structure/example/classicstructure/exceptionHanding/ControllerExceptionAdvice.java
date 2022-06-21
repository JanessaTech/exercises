package com.classic.structure.example.classicstructure.exceptionHanding;

import com.classic.structure.example.classicstructure.vo.ResultCode;
import com.classic.structure.example.classicstructure.vo.ResultVo;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerExceptionAdvice {
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResultVo<?> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        ObjectError objectError = e.getBindingResult().getAllErrors().get(0);
        return new ResultVo<>(ResultCode.VALIDATION_FAILED, objectError.getDefaultMessage() );
    }
}
