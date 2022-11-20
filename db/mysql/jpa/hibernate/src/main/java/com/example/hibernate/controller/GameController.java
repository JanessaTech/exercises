package com.example.hibernate.controller;

import com.example.hibernate.dao.Game;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@RestController
@RequestMapping("/games")
public class GameController {

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/insert")
    String testInsert() {
        Game game = new Game();
        game.setName("first game");

        Session session = entityManager.unwrap(Session.class);
        Transaction t=session.beginTransaction();
        session.save(game);
        session.flush();
        t.commit();//transaction is commited
        session.close();
        return "insert games successfully";
    }
}
