package com.example.example1.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user")
@ToString(includeFieldNames = true)
@EqualsAndHashCode
@Data
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "psw")
    String psw;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    Role role;

    public User(String username, String encodedPsw) {
        this.name = username;
        this.psw = encodedPsw;
    }

    public User() {}
}
