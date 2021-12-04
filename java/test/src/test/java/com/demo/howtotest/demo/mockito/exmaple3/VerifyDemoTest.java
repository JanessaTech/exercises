package com.demo.howtotest.demo.mockito.exmaple3;

import com.demo.howtotest.demo.mockito.example3.MyObj;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verify;

/**
 * See link about how to use Verify: https://www.baeldung.com/mockito-verify
 */
@RunWith(MockitoJUnitRunner.class)
public class VerifyDemoTest {

    @Mock
    MyObj myObj;

    @Test
    public void verify_number_of_interactions_with_mock(){
        myObj.method1();
        verify(myObj, times(1)).method1();
    }

    @Test
    public void verify_no_interaction_with_mock_occurred(){
        verifyNoInteractions(myObj);
    }

    @Test
    public void verify_order_of_interactions(){
        InOrder inOrder = Mockito.inOrder(myObj);
        myObj.method1();
        myObj.method2();
        myObj.method2();
        myObj.method3();

        inOrder.verify(myObj).method1();
        inOrder.verify(myObj,times(2)).method2();
        inOrder.verify(myObj).method3();
    }

    @Test
    public void verify_an_interaction_has_not_occurred(){
        myObj.method3();
        verify(myObj, never()).method1();
    }

    @Test
    public void verify_interaction_with_exact_argument(){
        myObj.method4("test");
        verify(myObj).method4("test");
    }

    @Test
    public void verify_interaction_with_flexible_any_argument(){
        myObj.method4("hahha");
        verify(myObj).method4(anyString());
        verify(myObj).method4(any());
    }

    @Test
    public void verify_interaction_using_argument_capture(){
        myObj.method4("Jane");
        ArgumentCaptor<String> argumentCaptor = ArgumentCaptor.forClass(String.class);
        verify(myObj).method4(argumentCaptor.capture());
        String capturedArgument = argumentCaptor.getValue();
        Assert.assertEquals("Jane", capturedArgument);
    }
}
