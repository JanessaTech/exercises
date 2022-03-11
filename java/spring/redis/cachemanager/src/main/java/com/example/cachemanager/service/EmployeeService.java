package com.example.cachemanager.service;

import com.example.cachemanager.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee getEmp(Long id);
    List<Employee> getAll();
    Employee createEmp(Employee employee);
    Employee updateEmp(Employee employee);
    void deleteEmp(Long id);
}
