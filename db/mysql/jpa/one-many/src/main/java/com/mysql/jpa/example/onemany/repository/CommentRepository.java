package com.mysql.jpa.example.onemany.repository;

import com.mysql.jpa.example.onemany.dao.Comment;
import com.mysql.jpa.example.onemany.dao.Tutorial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByTutorial(Tutorial tutorial);
}
