package com.hibernate.example.hibernate.utils;

import com.hibernate.example.hibernate.data.Employee;
import com.hibernate.example.hibernate.vo.EmployeeVo;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeConverter {
     public Employee toDto(EmployeeVo vo) {
        Employee employee = new Employee();
        employee.setId(vo.getId());
        employee.setAge(vo.getAge());
        employee.setName(vo.getName());
        return employee;
    }

    public EmployeeVo toVo(Employee dto) {
        EmployeeVo employeeVo = new EmployeeVo();
        employeeVo.setId(dto.getId());
        employeeVo.setAge(dto.getAge());
        employeeVo.setName(dto.getName());
        return employeeVo;
    }

    public List<Employee> toDtos(List<EmployeeVo> employeeVos) {
        List<Employee> employees = new ArrayList<>();
        employeeVos.forEach( it -> {
            Employee employee = new Employee();
            employee.setId(it.getId());
            employee.setAge(it.getAge());
            employee.setName(it.getName());
            employees.add(employee);
        });
        return employees;
    }

    public List<EmployeeVo> toVos(List<Employee> employees) {
        List<EmployeeVo> employeeVos = new ArrayList<>();
        employees.forEach( it -> {
            EmployeeVo vo = new EmployeeVo();
            vo.setId(it.getId());
            vo.setAge(it.getAge());
            vo.setName(it.getName());
            employeeVos.add(vo);
        });
        return employeeVos;
    }
}
