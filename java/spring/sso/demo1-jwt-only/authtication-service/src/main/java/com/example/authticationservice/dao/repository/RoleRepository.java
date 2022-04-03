package com.example.authticationservice.dao.repository;

import com.example.authticationservice.dao.model.Role;
import com.example.authticationservice.vo.ROLE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ROLE name);
}
