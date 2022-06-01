package com.mysql.jpa.example.onemany.service.impl;

import com.mysql.jpa.example.onemany.dao.Comment;
import com.mysql.jpa.example.onemany.dao.Tutorial;
import com.mysql.jpa.example.onemany.repository.CommentRepository;
import com.mysql.jpa.example.onemany.repository.TutorialRepository;
import com.mysql.jpa.example.onemany.service.TutorialService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TutorialServiceImpl implements TutorialService {
    @Autowired
    private TutorialRepository tutorialRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Tutorial create(Tutorial tutorial) {
        Tutorial dbTutorial = tutorialRepository.save(tutorial);
        log.info("tutorial id {} is created", dbTutorial.getId());
        return dbTutorial;
    }

    @Override
    public Tutorial update(Tutorial tutorial) {
        Tutorial dbTutorial = tutorialRepository.save(tutorial);
        log.info("tutorial id {} is updated", tutorial.getId());
        return dbTutorial;
    }

    @Override
    public List<Tutorial> getAll() {
        return tutorialRepository.findAll();
    }

    @Override
    public Tutorial getById(Long id) throws Exception {
        Tutorial tutorial = tutorialRepository.findById(id).orElseThrow(() -> new Exception("cannot find tutorial with id = " + id));
        return tutorial;
    }

    @Override
    public void delete(Long id) {
        Tutorial tutorial = tutorialRepository.getById(id);
        for(Comment comment : tutorial.getComments()) {
            commentRepository.delete(comment);
            log.info("Comment id {} is deleted", comment.getId());
        }
        tutorialRepository.deleteById(id);
        log.info("Tutorial id {} is deleted", tutorial.getId());
    }
}
