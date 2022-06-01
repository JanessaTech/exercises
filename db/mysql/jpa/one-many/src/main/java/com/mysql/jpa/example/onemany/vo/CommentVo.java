package com.mysql.jpa.example.onemany.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class CommentVo implements Serializable {
    private Long id;
    private String content;
    private Long tutorialId;
}
