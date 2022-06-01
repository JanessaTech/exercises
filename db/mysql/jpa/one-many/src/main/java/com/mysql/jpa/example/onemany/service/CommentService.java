package com.mysql.jpa.example.onemany.service;

import com.mysql.jpa.example.onemany.dao.Comment;

import java.util.List;

public interface CommentService {
    Comment create(Comment comment, Long tutorial_id) throws Exception;
    Comment update(Comment comment) throws Exception;
    List<Comment> getAll();
    List<Comment> getCommentsByTutorialId(Long id);
    void delete(Long id);
}
