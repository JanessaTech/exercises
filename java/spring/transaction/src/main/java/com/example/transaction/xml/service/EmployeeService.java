package com.example.transaction.xml.service;

import com.example.transaction.xml.data.Employee;

public interface EmployeeService {
    Employee getEmployee(Long id);
    void insertEmployee(Employee employee);
    void updateEmployee(Employee employee);
    void deleteEmployee(Long id);
}
