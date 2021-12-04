package com.demo.howtotest.demo.mockito.example2;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class CalculatorAppTest {
    @InjectMocks
    CalculatorApp calculatorApp;

    @Mock
    CalculatorService calculatorService;

    @Test
    public void testAdd(){
        when(calculatorApp.add(2.0, 3.0)).thenReturn(5.0);
        Assert.assertEquals(5.0, calculatorApp.add(2.0, 3.0), 0);
        verify(calculatorService, times(1)).add(2.0, 3.0);
    }

    @Test
    public void testSubtract(){
        when(calculatorApp.subtract(5.0, 3.0)).thenReturn(2.0);
        Assert.assertEquals(2.0, calculatorApp.subtract(5.0, 3.0), 0);
    }

    @Test
    public void testMultiply(){
        when(calculatorApp.multiply(2.0, 3.0)).thenReturn(6.0);
        Assert.assertEquals(6.0, calculatorApp.multiply(2.0, 3.0), 0);
    }

    @Test
    public void testDivide(){
        when(calculatorApp.divide(10.0, 2.0)).thenReturn(5.0);
        Assert.assertEquals(5.0, calculatorApp.divide(10.0,2.0), 0);
    }

}
