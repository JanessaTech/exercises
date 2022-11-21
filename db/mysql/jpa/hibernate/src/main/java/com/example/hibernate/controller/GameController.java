package com.example.hibernate.controller;

import com.example.hibernate.dao.Game;
import org.hibernate.Session;
import org.hibernate.StatelessSession;
import org.hibernate.Transaction;
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

        long start = System.currentTimeMillis();
        String name = "game name";
        Session session = entityManager.unwrap(Session.class);
        //StatelessSession session = ((Session) entityManager.getDelegate()).getSessionFactory().openStatelessSession();
        Transaction t=session.beginTransaction();
        for (int i = 0; i < 100000; i++) {
            Game game = new Game();
            game.setName(name + i);
            // session.insert(game);  //StatelessSession
            if ( i % 100 == 0) {
                session.flush();
                session.clear();
            }

        }
        t.commit();//transaction is committed
        session.close();
        long end = System.currentTimeMillis();
        System.out.println("It takes " + (end - start)/1000 + " seconds to insert " + 10000 + "games");
        return "insert games successfully";
    }
}
