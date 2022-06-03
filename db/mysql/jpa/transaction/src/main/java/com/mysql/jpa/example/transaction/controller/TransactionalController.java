package com.mysql.jpa.example.transaction.controller;

import com.mysql.jpa.example.transaction.exception.MyException;
import com.mysql.jpa.example.transaction.service.Service1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionalController {
    @Autowired
    private Service1 service1;
    @PostMapping
    String create(@RequestParam(name = "table1", required = true) String table1,
                  @RequestParam(name = "table2", required = true) String table2) throws MyException {
        service1.create(table1, table2);
        return "success";
    }
}
