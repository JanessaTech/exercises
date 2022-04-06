package com.security.db.example.defaultsecurityusingdb.dao.repository;

import com.security.db.example.defaultsecurityusingdb.dao.model.Role;
import com.security.db.example.defaultsecurityusingdb.vo.ROLE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ROLE name);
}
