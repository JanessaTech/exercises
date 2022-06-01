package com.mysql.jpa.example.onemany.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public class TutorialVo implements Serializable {
    Long id;

    private String title;

    private boolean published;

    private List<CommentVo> comments = new ArrayList<>();
}
