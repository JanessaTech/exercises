package com.mysql.jpa.example.manytomany.repository;

import com.mysql.jpa.example.manytomany.dao.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
