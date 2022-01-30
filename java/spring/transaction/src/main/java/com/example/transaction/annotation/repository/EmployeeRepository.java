package com.example.transaction.xml.repository;

import com.example.transaction.xml.data.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
