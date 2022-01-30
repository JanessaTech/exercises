package com.example.transaction.annotation.service;

import com.example.transaction.annotation.data.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAll();
    Employee getEmployee(Long id);
    Employee insertEmployee(Employee employee);
    void deleteEmployee(Long id);
}
