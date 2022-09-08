package com.security.example.mfa.service;


import com.security.example.mfa.vo.UserVo;

import java.util.List;

public interface UserService {
    List<UserVo> getAllUsers();
    UserVo get(Long id);
    UserVo create(UserVo user) throws Exception;
    boolean existsByName(String name);
    UserVo update(UserVo user);
    void delete(Long id);
}
