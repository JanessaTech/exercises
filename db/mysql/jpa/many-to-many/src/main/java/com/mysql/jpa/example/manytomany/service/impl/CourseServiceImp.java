package com.mysql.jpa.example.manytomany.service.impl;

import com.mysql.jpa.example.manytomany.dao.Course;
import com.mysql.jpa.example.manytomany.repository.CourseRepository;
import com.mysql.jpa.example.manytomany.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImp implements CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Course getCourseById(Long id) throws Exception {
        return courseRepository.findById(id).orElseThrow(() -> new Exception("cannot find course " + id));
    }

    @Override
    public List<Course> getAll() {
        return courseRepository.findAll();
    }
}
