package com.example.transaction.annotation.service;

import com.example.transaction.annotation.data.Employee;
import com.example.transaction.annotation.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional(rollbackFor = Exception.class)
    public void case1() {
        employeeRepository.save(new Employee("case1", 11));
        innerCase1();
    }

    private void innerCase1(){
        employeeRepository.save(new Employee("case1", 12));
        throw new RuntimeException("throw for test case1");

    }

    @Transactional(rollbackFor = Exception.class)
    public void case2() {
        employeeRepository.save(new Employee("case2", 21));
        innerCase2();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = Exception.class)
    void innerCase2(){
        employeeRepository.save(new Employee("case2", 22));
        throw new RuntimeException("throw for test case2");
    }

    public void case3() {
        employeeRepository.save(new Employee("case3", 31));
        innerCase3();
    }

    @Transactional(rollbackFor = Exception.class)
    void innerCase3(){
        employeeRepository.save(new Employee("case3", 32));
        throw new RuntimeException("throw for test case3");
    }

    @Transactional(rollbackFor = Exception.class)
    public void case4() {
        try {
            employeeRepository.save(new Employee("case4", 41));
            innerCase4();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void innerCase4() {
        employeeRepository.save(new Employee("case4", 42));
        throw new RuntimeException("throw for test case4");
    }

    @Transactional(rollbackFor = Exception.class)
    public void case5() {
        employeeRepository.save(new Employee("case5", 51));
        serviceB.case5();
    }

    @Transactional(rollbackFor = Exception.class)
    public void case6() {
        employeeRepository.save(new Employee("case6", 61));
        serviceB.case6();
    }

    @Transactional(rollbackFor = Exception.class)
    public void case7() {
        try {
            employeeRepository.save(new Employee("case7", 71));
            serviceB.case7();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public void case8() {
        try {
            employeeRepository.save(new Employee("case8", 81));
            serviceB.case8();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
