package com.mysql.jpa.example.onemany.controller;

import com.mysql.jpa.example.onemany.dao.Comment;
import com.mysql.jpa.example.onemany.dao.Tutorial;
import com.mysql.jpa.example.onemany.service.TutorialService;
import com.mysql.jpa.example.onemany.vo.CommentVo;
import com.mysql.jpa.example.onemany.vo.TutorialVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/tutorials")
public class TutorialController {
    @Autowired
    private TutorialService tutorialService;
    @PostMapping
    TutorialVo create(@RequestBody(required = true) TutorialVo tutorialVo) {
        Tutorial tutorial = toDto(tutorialVo);
        Tutorial savedTutorial = tutorialService.create(tutorial);
        return toVo(savedTutorial);
    }

    @PutMapping
    TutorialVo update(@RequestBody(required = true) TutorialVo tutorialVo) {
        Assert.notNull(tutorialVo.getId(), "tutorial id cannot be null");
        Tutorial tutorial = toDto(tutorialVo);
        Tutorial savedTutorial = tutorialService.update(tutorial);
        return toVo(savedTutorial);
    }

    @GetMapping
    List<TutorialVo> getAll() {
        List<Tutorial> tutorials = tutorialService.getAll();
        return toVos(tutorials);
    }

    @GetMapping(value = "/{id}")
    TutorialVo getById(@PathVariable(name = "id", required = true) Long id) throws Exception {
        Tutorial tutorial = tutorialService.getById(id);
        return toVo(tutorial);
    }

    @DeleteMapping(value = "/{id}")
    void delete(@PathVariable(name = "id", required = true) Long id) {
        Assert.notNull(id, "tutorial id cannot be null when delete the tutorial");
        tutorialService.delete(id);
    }

    private List<TutorialVo> toVos(List<Tutorial> tutorials) {
        List<TutorialVo> tutorialVos = new ArrayList<>();
        tutorials.forEach( it -> {
            tutorialVos.add(toVo(it));
        });
        return tutorialVos;
    }


    private Tutorial toDto(TutorialVo tutorialVo) {
        Tutorial tutorial = new Tutorial();
        tutorial.setId(tutorialVo.getId());
        tutorial.setTitle(tutorialVo.getTitle());
        tutorial.setPublished(tutorialVo.isPublished());
        return tutorial;
    }

    private TutorialVo toVo(Tutorial tutorial) {
        TutorialVo tutorialVo = new TutorialVo();
        tutorialVo.setId(tutorial.getId());
        tutorialVo.setTitle(tutorial.getTitle());
        tutorialVo.setPublished(tutorial.isPublished());
        tutorialVo.setComments(toVos(tutorial.getComments()));
        return tutorialVo;
    }

    private List<CommentVo> toVos(Set<Comment> comments) {
        List<CommentVo> commentVos = new ArrayList<>();
        if (comments != null) {
            comments.forEach(it -> {
                commentVos.add(toVo(it));
            });
        }
        return commentVos;
    }

    private CommentVo toVo(Comment comment) {
        CommentVo commentVo = new CommentVo();
        commentVo.setId(comment.getId());
        commentVo.setContent(comment.getContent());
        commentVo.setTutorialId(comment.getTutorial().getId());
        return commentVo;
    }
}
