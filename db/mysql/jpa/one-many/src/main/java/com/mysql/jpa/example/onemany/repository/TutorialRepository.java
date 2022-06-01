package com.mysql.jpa.example.onemany.repository;

import com.mysql.jpa.example.onemany.dao.Tutorial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TutorialRepository extends JpaRepository<Tutorial, Long> {
    Optional<Tutorial> findById(Long id);
}
