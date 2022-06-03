package com.mysql.jpa.example.transaction.service;

import com.mysql.jpa.example.transaction.dao.Table1;
import com.mysql.jpa.example.transaction.dao.Table2;
import com.mysql.jpa.example.transaction.exception.MyException;
import com.mysql.jpa.example.transaction.repository.Table1Repository;
import com.mysql.jpa.example.transaction.service.impl.Service1Impl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.util.Assert;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class Service1ImplTest {
    @InjectMocks
    Service1Impl target;
    @Mock Table1Repository table1Repository;
    @Mock Service2 service2;

    @Test
    //@Transactional we don't need this annotation becuase we are using @InjectMocks rather @Autowired to inject TutorialServiceImpl
    public void create() throws MyException {
        Table1 table1 = new Table1();
        table1.setName("some-table1");
        when(table1Repository.save(table1)).thenReturn(new Table1());
        when(service2.create("some-table2")).thenReturn(new Table2());

        Table1 res = target.create("some-table1", "some-table2");
        verify(table1Repository).save(table1);
        verify(service2).create("some-table2");
        Assert.notNull(res);
    }
}
