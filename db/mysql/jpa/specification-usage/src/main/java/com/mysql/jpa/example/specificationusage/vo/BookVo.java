package com.mysql.jpa.example.specificationusage.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class BookVo implements Serializable {
    Long id;

    String title;

    String author;
}
