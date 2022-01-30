package com.example.transaction.annotation;

import com.example.transaction.annotation.data.Employee;
import com.example.transaction.annotation.service.EmployeeService;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = TransactionApplication.class)
class TransactionApplicationTests {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private SessionFactory sessionFactory;


    @Test
    void getEmployee() {
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        Long id = 10L;
        Employee employee = employeeService.getEmployee(10L);
        session.getTransaction().commit();
        session.close();
        System.out.println(employee);
    }

    @Test
    void insertEmployee() {

    }

    @Test
    void updateEmployee() {

    }

    @Test
    void deleteEmployee() {

    }

}
