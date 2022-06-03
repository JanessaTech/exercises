package com.mysql.jpa.example.transaction.service;

import com.mysql.jpa.example.transaction.dao.Table1;
import com.mysql.jpa.example.transaction.exception.MyException;

public interface Service1 {
    Table1 create(String table1Name, String table2Name) throws MyException;
}
