package com.example.hibernate.dao;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "GAME")
@Data
public class Game implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GAME_ID")
    Long id;

    @Column(name = "NAME")
    String name;
}
