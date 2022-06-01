package com.mysql.jpa.example.manytomany.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class CourseVo implements Serializable {
    Long id;

    String name;

    List<StudentVo> students;
}
