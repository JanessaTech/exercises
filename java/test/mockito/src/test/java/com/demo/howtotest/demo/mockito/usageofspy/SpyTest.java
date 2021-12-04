package com.demo.howtotest.demo.mockito.usageofspy;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.*;

/**
 * This is a demo to show how to use spy
 * Spy is actually a way allowing us to call actual instance while still tracking every interaction , just as we would with a mock
 * Spy, in fact, is a wrapper of an actual instance
 */
@RunWith(MockitoJUnitRunner.class)
public class SpyTest {
    @Spy
    List<String> list = new ArrayList<String>();

    @Test
    public void test_use_spy_annotation(){
        list.add("test1");
        list.add("test2");

        verify(list, times(1)).add("test1");
        verify(list, times(1)).add("test2");
        Assert.assertEquals(2, list.size());
    }
}
