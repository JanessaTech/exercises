package com.mysql.jpa.example.manytomany.dao;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "STUDENT")
@Getter
@Setter
public class Student implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STUDENT_ID")
    Long id;

    @Column(name = "NAME")
    String name;

    @Column(name = "PASSWORD")
    String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "STUDENT_COURSE",joinColumns = @JoinColumn(name = "STUDENT_ID"),inverseJoinColumns = @JoinColumn(name="COURSE_ID"))
    @OnDelete(action = OnDeleteAction.CASCADE)  // not only delete the student but also delete relationship in table STUDENT_COURSE for the student
    Set<Course> courses;

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(id, student.id) && Objects.equals(name, student.name) && Objects.equals(password, student.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, password);
    }
}
