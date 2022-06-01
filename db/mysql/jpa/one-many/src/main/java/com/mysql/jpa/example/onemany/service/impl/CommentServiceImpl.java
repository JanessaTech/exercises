package com.mysql.jpa.example.onemany.service.impl;

import com.mysql.jpa.example.onemany.dao.Comment;
import com.mysql.jpa.example.onemany.dao.Tutorial;
import com.mysql.jpa.example.onemany.repository.CommentRepository;
import com.mysql.jpa.example.onemany.repository.TutorialRepository;
import com.mysql.jpa.example.onemany.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    public CommentRepository commentRepository;
    @Autowired
    public TutorialRepository tutorialRepository;

    @Override
    public List<Comment> getAll() {
        List<Comment> comments = commentRepository.findAll();
        return comments;
    }

    @Override
    public List<Comment> getCommentsByTutorialId(Long id) {
        Tutorial tutorial = tutorialRepository.getById(id);
        return commentRepository.findByTutorial(tutorial);
    }

    @Override
    public Comment create(Comment comment, Long tutorial_id) throws Exception {
        Tutorial tutorial = tutorialRepository.findById(tutorial_id).orElseThrow(() -> new Exception("cannot find tutorial with id = " + tutorial_id));
        comment.setTutorial(tutorial);
        commentRepository.save(comment);
        return comment;
    }

    @Override
    public Comment update(Comment comment) throws Exception {
        if (comment.getId() == null) throw new Exception("comment id cannot be null when updating a comment");
        Comment dbComment = commentRepository.findById(comment.getId()).orElseThrow(() -> new Exception("cannot find the comment by id: " + comment.getId()));
        dbComment.setContent(comment.getContent());
        commentRepository.save(dbComment);
        return dbComment;
    }

    @Override
    public void delete(Long id) {
        Comment comment = commentRepository.getById(id);
        commentRepository.delete(comment);
    }
}
