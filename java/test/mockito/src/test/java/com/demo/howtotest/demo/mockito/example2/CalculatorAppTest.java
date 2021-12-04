package com.demo.howtotest.demo.mockito.example2;

import org.junit.*;
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

    @BeforeClass
    public static void setUp(){
        System.out.println("Here you could setup some variable used by test cases before runing all these test cases");
        System.out.println("setUp method runs only once");
        System.out.println("setUp should be static");
        System.out.println("==========================setUp==============================");
    }

    @AfterClass
    public static void destroy(){
        System.out.println("==========================destroy==============================");
        System.out.println("destroy method runs only after all test cases are done");
        System.out.println("destroy method should be static");
    }

    @Before
    public void runBefore(){
        System.out.println("runBefore method runs before every test case");
    }

    @After
    public void runAfter(){
        System.out.println("runAfter method runs after every test case");
    }

    @Test
    public void testAdd(){
        System.out.println("start testAdd ...");
        when(calculatorService.add(2.0, 3.0)).thenReturn(5.0);
        Assert.assertEquals(5.0, calculatorApp.add(2.0, 3.0), 0);
        verify(calculatorService, times(1)).add(2.0, 3.0);
    }

    @Test
    public void testSubtract(){
        System.out.println("start testSubtract ...");
        when(calculatorService.subtract(5.0, 3.0)).thenReturn(2.0);
        Assert.assertEquals(2.0, calculatorApp.subtract(5.0, 3.0), 0);
    }

    @Test
    public void testMultiply(){
        System.out.println("start testMultiply ...");
        when(calculatorService.multiply(2.0, 3.0)).thenReturn(6.0);
        Assert.assertEquals(6.0, calculatorApp.multiply(2.0, 3.0), 0);
    }

    @Test
    public void testDivide() throws DivideZeroException {
        System.out.println("start testDivide ...");
        when(calculatorService.divide(10.0, 2.0)).thenReturn(5.0);
        Assert.assertEquals(5.0, calculatorApp.divide(10.0,2.0), 0);
    }

    @Test(expected = DivideZeroException.class)
    public void testDivideByZero() throws DivideZeroException {
        System.out.println("start testDivideByZero ...");
        doThrow(new DivideZeroException("Cannot divide Zero")).when(calculatorService).divide(10,0);
        calculatorApp.divide(10, 0);
    }

}
