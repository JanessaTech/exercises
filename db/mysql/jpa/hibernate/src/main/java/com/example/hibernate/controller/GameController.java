package com.example.hibernate.controller;

import com.example.hibernate.dao.Game;
import com.example.hibernate.dao.Group;
import org.hibernate.Session;
import org.hibernate.StatelessSession;
import org.hibernate.Transaction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@RestController
@RequestMapping("/games")
public class GameController {

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/insert")
    String testInsert() {

        long start = System.currentTimeMillis();
        String name = "game ";
        Session session = entityManager.unwrap(Session.class);
        Transaction t=session.beginTransaction();

        Group group = new Group();
        group.setName("new game group");
        Serializable identifier = session.save(group);
        group.setId((Long) identifier);

        /*
        for (int i = 0; i < 10; i++) {
            Game game = new Game();
            game.setName(name + i);
            game.setGroup(group);
            game.setAddr("old addr");
            game.setTime(new Date());
            game.setSiteId(32);
            game.setNewGame(true);
            game.setRatio(new BigDecimal(5.4));
            session.save(game);
            if ( i % 100 == 0) {
                session.flush();
                session.clear();
            }
        } */

        String hql = buildHQL(identifier);
        System.out.println(hql);
        Query query = session.createQuery(hql);
        int createdEntities = query.executeUpdate();

        t.commit();//transaction is committed
        session.close();
        long end = System.currentTimeMillis();
        System.out.println("It takes " + (end - start)/1000 + " seconds to insert " + 10000 + "games");
        return "insert games successfully";
    }

    private String buildHQL(Serializable identifier) {
        Long newGroupId = (Long) identifier;
        String newAdress = "new Address";
        Date newTime = new Date();
        Integer newSiteId = 100;
        Boolean newNewGame = false;
        BigDecimal newRatio = new BigDecimal("3.1");

        String hqlInsert = "insert into Game(name, fkGameGroupId, addr, time, siteId, newGame, ratio) select name, "
                + convert(newGroupId) + ", " + convert(newAdress) + ", "  + "time" + ", " + convert(newSiteId) + ", " + convert(newNewGame) + ", " + "ratio" + " from Game";
        return  hqlInsert;
    }

    private Object convert(Serializable identifier) {
        if (identifier instanceof Long) return identifier + "L";
        if (identifier instanceof String) return "'" + identifier + "'";
        return identifier;
    }
}
