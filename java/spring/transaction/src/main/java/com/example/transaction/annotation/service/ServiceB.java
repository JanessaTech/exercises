package com.example.transaction.annotation.service;

import com.example.transaction.annotation.data.Employee;
import com.example.transaction.annotation.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ServiceB {
    @Autowired
    private EmployeeRepository employeeRepository;

    public void case5() {
        employeeRepository.save(new Employee("case5", 52));
        throw new RuntimeException("throw for test case5");
    }

    @Transactional(rollbackFor = Exception.class)
    public void case6() {
        employeeRepository.save(new Employee("case6", 62));
        throw new RuntimeException("throw for test case6");
    }

    @Transactional(rollbackFor = Exception.class)
    public void case7() {
        employeeRepository.save(new Employee("case7", 72));
        throw new RuntimeException("throw for test case7");
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    public void case8() {
        employeeRepository.save(new Employee("case8", 82));
        throw new RuntimeException("throw for test case8");
    }
}
