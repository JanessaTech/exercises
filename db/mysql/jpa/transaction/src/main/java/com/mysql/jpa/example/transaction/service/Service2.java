package com.mysql.jpa.example.transaction.service;

import com.mysql.jpa.example.transaction.dao.Table2;
import com.mysql.jpa.example.transaction.exception.MyException;

public interface Service2 {
    Table2 create(String name) throws MyException;
}
