package com.mysql.jpa.example.onemany.service;

import com.mysql.jpa.example.onemany.dao.Tutorial;
import com.mysql.jpa.example.onemany.repository.CommentRepository;
import com.mysql.jpa.example.onemany.repository.TutorialRepository;
import com.mysql.jpa.example.onemany.service.impl.TutorialServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class TutorialServiceImplTest {
    @InjectMocks
    TutorialServiceImpl target;
    @Mock
    TutorialRepository tutorialRepository;
    @Mock
    CommentRepository commentRepository;

    @Test
    public void create() {
        Tutorial tutorial = new Tutorial();
        tutorial.setTitle("some-title");
        tutorial.setPublished(false);

        when(tutorialRepository.save(tutorial)).thenReturn(new Tutorial());

        Tutorial res = target.create(tutorial);
        verify(tutorialRepository).save(tutorial);
        Assert.assertNotNull(res);
    }
}
