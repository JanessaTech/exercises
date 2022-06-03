package com.mysql.jpa.example.transaction.service.impl;

import com.mysql.jpa.example.transaction.dao.Table1;
import com.mysql.jpa.example.transaction.dao.Table2;
import com.mysql.jpa.example.transaction.exception.MyException;
import com.mysql.jpa.example.transaction.repository.Table1Repository;
import com.mysql.jpa.example.transaction.service.Service1;
import com.mysql.jpa.example.transaction.service.Service2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class Service1Impl implements Service1 {
    @Autowired
    private Table1Repository table1Repository;
    @Autowired
    private Service2 service2;

    @Transactional(rollbackFor = MyException.class)
    @Override
    public Table1 create(String table1Name, String table2Name) throws MyException {
        Table1 table1 = new Table1();
        table1.setName(table1Name);
        Table1 saved1 = table1Repository.save(table1);
        Table2 saved2 = service2.create(table2Name);
        return saved1;
    }
}
