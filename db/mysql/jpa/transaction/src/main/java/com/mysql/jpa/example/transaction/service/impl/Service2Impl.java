package com.mysql.jpa.example.transaction.service.impl;

import com.mysql.jpa.example.transaction.dao.Table2;
import com.mysql.jpa.example.transaction.exception.MyException;
import com.mysql.jpa.example.transaction.repository.Table2Repository;
import com.mysql.jpa.example.transaction.service.Service2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Service2Impl implements Service2 {
    @Autowired
    private Table2Repository table2Repository;

    @Override
    public Table2 create(String name) throws MyException {
        Table2 table2 = new Table2();
        table2.setName(name);
        Table2 saved = table2Repository.save(table2);
        if (name.equals("rollback")) {
            throw new MyException();
        }
        return saved;
    }
}
