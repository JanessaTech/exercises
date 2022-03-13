package com.example.cachemanager.service;

import com.example.cachemanager.model.Employee;
import com.example.cachemanager.repository.EmployeeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class EmployeeServiceImpl implements EmployeeService{
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    @Cacheable(value={"emp"}, key="#id")
    public Employee getEmp(Long id) {
        log.info("calling getEmp. id=" + id);

        Employee employee = null;
        try {
            employee = employeeRepository.findById(id).orElseThrow(() -> new Exception("cannot find employee"));
        }catch (Exception e) {
            log.warn("cannot find employee with id ={}", id);
            return null;
        }
        return employee;
    }

    @Override
    @Cacheable(value="emp")
    public List<Employee> getAll() {
        log.info("calling getAll");
        return employeeRepository.findAll();
    }

    @Override
    public Employee createEmp(Employee employee) {

        if (employee == null) {
            log.warn("cannot save null");
            return null;
        }
        return employeeRepository.save(employee);
    }

    @Override
    @CachePut(value = "emp" ,key = "#employee.id")
    public Employee updateEmp(Employee employee){
        log.info("calling updateEmp. employee=" + employee);
        Employee emp = null;
        try {
            emp = employeeRepository.findById(employee.getId()).orElseThrow(() -> new Exception("Not found employee " + employee.getId()));
            emp.setName(employee.getName());
            emp.setAge(employee.getAge());
        } catch (Exception e) {
            log.warn(e.getMessage());
            return emp;
        }

        return employeeRepository.save(emp);
    }

    @Override
    @CacheEvict(value = "emp", key = "#id")
    public void deleteEmp(Long id) {
        log.info("Delete employee id:" +id);
        try {
            employeeRepository.findById(id).orElseThrow(() -> new Exception("Not found employee " + id));

        } catch (Exception e) {
            log.warn(e.getMessage());
            return;
        }
        employeeRepository.deleteById(id);
    }

    @Override
    public String toString(){
        return "EmployeeServiceImpl";
    }
}
