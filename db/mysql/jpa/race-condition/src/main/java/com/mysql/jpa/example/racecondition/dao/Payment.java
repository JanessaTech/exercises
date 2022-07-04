package com.mysql.jpa.example.racecondition.dao;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "PAYMENT")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PAYMENT_ID")
    Long id;

    @Column(name = "STATUS")
    @Enumerated(EnumType.STRING)
    Status status;

    @Column(name = "AMOUNT")
    Integer amount;

    @Column(name = "REASON")
    String reason;


}
