package com.example.transaction.xml.service;

import com.example.transaction.xml.data.Employee;

public interface EmployeeService {
    Employee getEmployee(Integer id);
    void insertEmployee(Employee employee);
    void updateEmployee(Employee employee);
    void deleteEmployee(Integer id);
}
