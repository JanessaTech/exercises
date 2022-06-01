package com.mysql.jpa.example.manytomany.controller;

import com.mysql.jpa.example.manytomany.dao.Course;
import com.mysql.jpa.example.manytomany.dao.Student;
import com.mysql.jpa.example.manytomany.service.CourseService;
import com.mysql.jpa.example.manytomany.vo.CourseVo;
import com.mysql.jpa.example.manytomany.vo.StudentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    List<CourseVo> getAll() {
        List<Course> courses = courseService.getAll();
        return toCourseVos(courses);
    }

    @GetMapping(value = "/{id}")
    CourseVo getCourseById(@PathVariable(name = "id", required = true) Long id) throws Exception {
        Course course = courseService.getCourseById(id);
        return toCourseVo(course);
    }


    private List<CourseVo> toCourseVos(List<Course> courses) {
       List<CourseVo> courseVos = new ArrayList<>();
       if (courses != null) {
           courses.forEach(it -> {
               CourseVo vo = toCourseVo(it);
               courseVos.add(vo);
           }
         );
       }
       return courseVos;
    }

    private CourseVo toCourseVo(Course course) {
        CourseVo vo = new CourseVo();
        vo.setId(course.getId());
        vo.setName(course.getName());
        vo.setStudents(toStudentVos(course.getStudents()));
        return vo;
    }

    private StudentVo toStudentVo(Student student) {
        StudentVo vo = new StudentVo();
        vo.setId(student.getId());
        vo.setName(student.getName());
        vo.setPassword(student.getPassword());
        return vo;
    }

    private List<StudentVo> toStudentVos(Set<Student> students) {
        List<StudentVo> studentVos = new ArrayList<>();
        if (students != null) {
            students.forEach( it ->{
                StudentVo vo = toStudentVo(it);
                studentVos.add(vo);
            });
        }
        return studentVos;
    }
}
