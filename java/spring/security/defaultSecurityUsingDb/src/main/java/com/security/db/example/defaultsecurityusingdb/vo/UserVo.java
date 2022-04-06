package com.security.db.example.defaultsecurityusingdb.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UserVo implements Serializable {
    private Long id;
    private String username;
    private String password;
    private List<String> roles;
}
