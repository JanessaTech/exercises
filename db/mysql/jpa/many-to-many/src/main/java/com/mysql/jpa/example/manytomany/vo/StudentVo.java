package com.mysql.jpa.example.manytomany.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class StudentVo implements Serializable {
    Long id;

    String name;

    String password;

    List<CourseVo> courses;
}
