package com.mysql.jpa.example.manytomany.service.impl;

import com.mysql.jpa.example.manytomany.dao.Course;
import com.mysql.jpa.example.manytomany.dao.Student;
import com.mysql.jpa.example.manytomany.repository.CourseRepository;
import com.mysql.jpa.example.manytomany.repository.StudentRepository;
import com.mysql.jpa.example.manytomany.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service
public class StudentServiceImp implements StudentService {
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student create(Student student) {
        Student saved = studentRepository.save(student);
        return saved;
    }

    @Override
    public Student assignTo(Long studentId, Long courseId) throws Exception {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new Exception("cannot find course " + courseId));
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new Exception("cannot find student " + studentId));
        if (student.getCourses() == null || student.getCourses().isEmpty()) {
            student.setCourses(new HashSet<>(Arrays.asList(course)));
        } else {
            student.getCourses().add(course);
        }

        Student saved = studentRepository.save(student);
        return saved;
    }

    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        studentRepository.deleteById(id);
    }
}
