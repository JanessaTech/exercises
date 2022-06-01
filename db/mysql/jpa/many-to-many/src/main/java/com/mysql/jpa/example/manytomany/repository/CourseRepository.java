package com.mysql.jpa.example.manytomany.repository;

import com.mysql.jpa.example.manytomany.dao.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}
