package com.example.transaction.xml;

import com.example.transaction.xml.data.Employee;
import com.example.transaction.xml.service.EmployeeService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Boot {
    public static void main(final String[] args) throws Exception {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("context.xml", Boot.class);
        //EmployeeService employeeService = (EmployeeService) ctx.getBean("employeeService");
        EmployeeService employeeService = (EmployeeService) ctx.getBean(EmployeeService.class);
        employeeService.insertEmployee(new Employee("jane", 20));
    }
}
