package com.sso.springsession.example.authenticationservice.service;


import com.sso.springsession.example.authenticationservice.vo.UserVo;

import java.util.List;

public interface UserService {
    List<UserVo> getAllUsers();
    UserVo get(Long id);
    UserVo create(UserVo user) throws Exception;
    boolean existsByName(String name);
    UserVo update(UserVo user);
    void delete(Long id);
}
