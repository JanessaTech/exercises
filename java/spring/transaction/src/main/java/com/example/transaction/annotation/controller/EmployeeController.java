package com.example.transaction.annotation.controller;

import com.example.transaction.annotation.data.Employee;
import com.example.transaction.annotation.service.EmployeeService;
import com.example.transaction.annotation.vo.EmployeeVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<EmployeeVO> getAll() {
        List<Employee> employeeList = employeeService.getAll();
        List<EmployeeVO>  employeeVOList = convertToVOs(employeeList);
        return new ResponseEntity(employeeVOList, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<EmployeeVO> get(@PathVariable(name = "id", required = true) Long id) {
        Employee employee = employeeService.getEmployee(id);
        EmployeeVO employeeVO = convertToVO(employee);
        return new ResponseEntity(employeeVO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EmployeeVO> create(@RequestBody EmployeeVO employeeVO) {
        Employee employee = convertToDo(employeeVO);
        employee = employeeService.insertEmployee(employee);
        employeeVO.setId(employee.getId());
        return new ResponseEntity(employeeVO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(value = "id", required = true) Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity("delete successfully", HttpStatus.OK);
    }

    private Employee convertToDo(EmployeeVO employeeVO) {

        Employee employee = new Employee();
        employee.setId(employeeVO.getId());
        employee.setName(employeeVO.getName());
        employee.setAge(employeeVO.getAge());
        return employee;
    }

    private EmployeeVO convertToVO(Employee employee) {
        EmployeeVO employeeVO = new EmployeeVO();
        employeeVO.setId(employee.getId());
        employeeVO.setName(employee.getName());
        employeeVO.setAge(employee.getAge());
        return employeeVO;

    }

    private List<EmployeeVO> convertToVOs(List<Employee> employeeList) {
        List<EmployeeVO> list = new ArrayList<>();
        for(Employee employee : employeeList) {
            list.add(convertToVO(employee));
        }
        return list;
    }
}
