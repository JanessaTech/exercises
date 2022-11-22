package com.mysql.jpa.example.onemany.dao;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "TUTORIAL")
@Getter
@Setter
public class Tutorial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TUTORIAL_ID")
    Long id;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "PUBLISH")
    private boolean published;

    @OneToMany(mappedBy = "tutorial", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Comment> comments;

    @Override
    public String toString() {
        return "Tutorial{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", published=" + published +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Tutorial tutorial = (Tutorial) o;
        return published == tutorial.published && Objects.equals(id, tutorial.id) && Objects.equals(title, tutorial.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, published);
    }
}
