package com.mysql.jpa.example.onemany.controller;

import com.mysql.jpa.example.onemany.dao.Comment;
import com.mysql.jpa.example.onemany.service.CommentService;
import com.mysql.jpa.example.onemany.vo.CommentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping
    CommentVo create(@RequestBody(required = true) CommentVo commentVo) throws Exception {
        Comment comment = toDto(commentVo);
        Comment saved = commentService.create(comment, commentVo.getTutorialId());
        return toVo(saved);
    }

    @PutMapping
    CommentVo update(@RequestBody(required = true) CommentVo commentVo) throws Exception {
        //assume we tutorial id is not changed
        Comment comment = toDto(commentVo);
        Comment updated = commentService.update(comment);
        return toVo(updated);
    }

    @GetMapping
    List<CommentVo> getAll() {
        List<Comment> comments = commentService.getAll();
        return toVos(comments);
    }

    @DeleteMapping(value = "/{id}")
    void delete(@PathVariable(name = "id", required = true)Long id) {
        commentService.delete(id);
    }

    private Comment toDto(CommentVo vo) {
        Comment comment = new Comment();
        comment.setId(vo.getId());
        comment.setContent(vo.getContent());
        return comment;
    }

    private CommentVo toVo(Comment comment) {
        CommentVo commentVo = new CommentVo();
        commentVo.setId(comment.getId());
        commentVo.setContent(comment.getContent());
        commentVo.setTutorialId(comment.getTutorial().getId());
        return commentVo;
    }

    private List<CommentVo> toVos(List<Comment> comments) {
        List<CommentVo> commentVos = new ArrayList<>();
        comments.forEach( it -> {
            commentVos.add(toVo(it));
        });
        return commentVos;
    }
}
