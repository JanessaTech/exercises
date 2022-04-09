package com.sso.springsession.example.authenticationservice.dao.repository;


import com.sso.springsession.example.authenticationservice.dao.model.Role;
import com.sso.springsession.example.authenticationservice.vo.ROLE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ROLE name);
}
