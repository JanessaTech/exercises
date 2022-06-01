package com.mysql.jpa.example.manytomany.service;

import com.mysql.jpa.example.manytomany.dao.Course;

import java.util.List;

public interface CourseService {
    Course getCourseById(Long id) throws Exception;
    List<Course> getAll();
}
