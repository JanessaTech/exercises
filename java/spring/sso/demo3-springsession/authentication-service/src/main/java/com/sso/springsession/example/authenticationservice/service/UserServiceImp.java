package com.sso.springsession.example.authenticationservice.service;


import com.sso.springsession.example.authenticationservice.dao.model.Role;
import com.sso.springsession.example.authenticationservice.dao.model.User;
import com.sso.springsession.example.authenticationservice.dao.repository.RoleRepository;
import com.sso.springsession.example.authenticationservice.dao.repository.UserRepository;
import com.sso.springsession.example.authenticationservice.vo.ROLE;
import com.sso.springsession.example.authenticationservice.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<UserVo> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::convertVo).collect(Collectors.toList());
    }

    @Override
    public UserVo get(Long id) {
        User user = userRepository.getById(id);
        return convertVo(user);
    }

    @Override
    public UserVo create(UserVo userVo) throws Exception {
        Set<Role> roles = new HashSet<>();
        for(String r : userVo.getRoles()) {
            Role role = roleRepository.findByName(ROLE.valueOf(r)).orElseThrow(() -> new Exception("cannot find role " + r));
            roles.add(role);
        }

        User user = new User();
        user.setName(userVo.getUsername());
        user.setPassword(userVo.getPassword());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        return convertVo(savedUser);
    }

    @Override
    public boolean existsByName(String name) {
        return userRepository.existsByName(name);
    }

    @Override
    public UserVo update(UserVo user) {
        return null;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    private UserVo convertVo(User user) {
        UserVo uservo = new UserVo();
        List<String> roles = new ArrayList<>();
        uservo.setId(user.getId());
        uservo.setUsername(user.getName());
        uservo.setPassword(user.getPassword());
        user.getRoles().forEach(it -> {roles.add(it.getName().toString());});
        uservo.setRoles(roles);
        return uservo;
    }
}
