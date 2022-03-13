package com.example.cachemanager.controller;

import com.example.cachemanager.model.Employee;
import com.example.cachemanager.service.EmployeeService;
import com.example.cachemanager.vo.EmployeeVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/emp")
    public List<EmployeeVO> getAll() {
        List<Employee> emp = employeeService.getAll();
        return emp.stream().map(this::dtoToVo).collect(Collectors.toList());
    }

    @GetMapping("/emp/{id}")
    public EmployeeVO getEmployee(@PathVariable("id") Long id) {
        Employee emp = employeeService.getEmp(id);
        return dtoToVo(emp);
    }

    @PostMapping("/emp/save")
    public EmployeeVO create(@RequestBody EmployeeVO employeeVO){
        Employee emp = employeeService.createEmp(voToDto(employeeVO));
        return dtoToVo(emp);
    }

    @PostMapping("/emp/update")
    public EmployeeVO update(@RequestBody EmployeeVO employeeVO) throws Exception {
        Employee emp = employeeService.updateEmp(voToDto(employeeVO));
        return dtoToVo(emp);
    }

    @DeleteMapping("/emp/{id}")
    public String deleteEmp(@PathVariable("id") Long id) {
        employeeService.deleteEmp(id);
        return "success";
    }

    private Employee voToDto(EmployeeVO employeeVO) {
        if (employeeVO == null) return null;
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeVO, employee);
        return employee;
    }

    private EmployeeVO dtoToVo(Employee employee) {
        if (employee == null) return null;
        EmployeeVO employeeVO = new EmployeeVO();
        BeanUtils.copyProperties(employee, employeeVO);
        return employeeVO;
    }
}
