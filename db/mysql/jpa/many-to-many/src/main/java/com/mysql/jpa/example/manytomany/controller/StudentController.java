package com.mysql.jpa.example.manytomany.controller;

import com.mysql.jpa.example.manytomany.dao.Course;
import com.mysql.jpa.example.manytomany.dao.Student;
import com.mysql.jpa.example.manytomany.service.StudentService;
import com.mysql.jpa.example.manytomany.vo.CourseVo;
import com.mysql.jpa.example.manytomany.vo.StudentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping
    StudentVo create(@RequestBody(required = true) StudentVo studentVo) {
        Student student = toDto(studentVo);
        Student saved = studentService.create(student);
        return toStudentVo(saved);
    }

    @PostMapping(value = "/assign")
    StudentVo assign(@RequestParam(name = "studentId", required = true) Long studentId,
                     @RequestParam(name = "courseId", required = true) Long courseId) throws Exception {
        Student student = studentService.assignTo(studentId, courseId);
        return toStudentVo(student);
    }

    @GetMapping
    List<StudentVo> getAll() {
        List<Student> students = studentService.getAll();
        return toStudentVos(students);
    }

    @DeleteMapping(value = "/{id}")
    void delete(@PathVariable(name = "id", required = true) Long id) {
        studentService.delete(id);
    }

    private Student toDto(StudentVo studentVo) {
        Student student = new Student();
        student.setName(studentVo.getName());
        student.setPassword(studentVo.getPassword());
        return student;
    }

    private List<CourseVo> toCourseVos(Set<Course> courses) {
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
        return vo;
    }

    private StudentVo toStudentVo(Student student) {
        StudentVo vo = new StudentVo();
        vo.setId(student.getId());
        vo.setName(student.getName());
        vo.setPassword(student.getPassword());
        vo.setCourses(toCourseVos(student.getCourses()));
        return vo;
    }

    private List<StudentVo> toStudentVos(List<Student> students) {
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
