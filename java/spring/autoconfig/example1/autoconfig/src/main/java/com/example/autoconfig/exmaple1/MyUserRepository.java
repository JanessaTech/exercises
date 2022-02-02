package com.example.autoconfig.exmaple1;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MyUserRepository extends JpaRepository<MyUser, String> {
}
