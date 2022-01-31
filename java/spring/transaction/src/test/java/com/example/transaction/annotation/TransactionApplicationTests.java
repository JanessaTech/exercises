package com.example.transaction.annotation;

import com.example.transaction.annotation.data.Employee;
import com.example.transaction.annotation.repository.EmployeeRepository;
import com.example.transaction.annotation.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.junit.Assert;

@SpringBootTest(classes = TransactionApplication.class)
class TransactionApplicationTests {

    @Autowired
    private EmployeeService employeeService;

    @Test
    @Transactional
    void insertEmployee() {
        Employee employee = new Employee("Jane", 20);
        employee = employeeService.insertEmployee(employee);
        Assert.assertNotNull(employee.getId());
    }

    @Test
    @Transactional
    void getEmployee() {
        // assume the employee with id 23 exists
        Long id = 23L;
        Employee employee = employeeService.getEmployee(id);
        System.out.println(employee);
    }

    @Test
    @Transactional
    void deleteEmployee() {
        // assume the employee with id 23 exists
        employeeService.deleteEmployee(23L);
    }

}
