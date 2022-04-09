package com.sso.springsession.example.authenticationservice.dao.model;

import com.sso.springsession.example.authenticationservice.vo.ROLE;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "ROLE")
@Setter
@Getter
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROLE_ID")
    Long id;

    @Column(name = "NAME")
    @Enumerated(EnumType.STRING)
    ROLE name;

    @ManyToMany(mappedBy = "roles")
    Set<User> users;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return id.equals(role.id) && name == role.name && users.equals(role.users);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name=" + name +
                '}';
    }
}
