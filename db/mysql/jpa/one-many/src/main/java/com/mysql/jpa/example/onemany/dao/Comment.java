package com.mysql.jpa.example.onemany.dao;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "COMMENT")
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMMENT_ID")
    Long id;

    @Column(name = "CONTENT")
    String content;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="FK_TUTORIAL_ID", nullable=false)
    //@OnDelete(action = OnDeleteAction.CASCADE)
    Tutorial tutorial;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id) && Objects.equals(content, comment.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, content);
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", content='" + content + '\'' +
                '}';
    }
}
