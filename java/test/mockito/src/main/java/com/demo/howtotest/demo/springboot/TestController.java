package com.demo.howtotest.demo.springboot;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @RequestMapping(value = "/employee", method = RequestMethod.GET)
    public Employee getEmployee(){
        Employee employee = new Employee();
        employee.setName("Jane");
        employee.setDesignation("freeLancer");
        employee.setEmpId("1");
        employee.setSalary(3000);
        return employee;
    }
}
