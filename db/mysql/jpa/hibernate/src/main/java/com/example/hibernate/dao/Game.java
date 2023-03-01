package com.example.hibernate.dao;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "GAME")
@Getter
@Setter
public class Game implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GAME_ID")
    Long id;

    @Column(name = "NAME")
    String name;

    @Column(name="FK_GAME_GROUP_ID", insertable = false, updatable = false)
    Long fkGameGroupId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="FK_GAME_GROUP_ID", nullable=false)
    Group group;

    @Column(name="ADDR")
    String addr;

    @Column(name="TIME")
    Date time;

    @Column(name="SITE_ID")
    Integer siteId;

    @Column(name="NEW_GAME")
    Boolean newGame;

    @Column(name="RATIO")
    BigDecimal ratio;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Game game = (Game) o;
        return Objects.equals(id, game.id) && Objects.equals(name, game.name) && Objects.equals(fkGameGroupId, game.fkGameGroupId) && Objects.equals(addr, game.addr) && Objects.equals(time, game.time) && Objects.equals(siteId, game.siteId) && Objects.equals(newGame, game.newGame) && Objects.equals(ratio, game.ratio);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, fkGameGroupId, addr, time, siteId, newGame, ratio);
    }

    @Override
    public String toString() {
        return "Game{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", fkGameGroupId=" + fkGameGroupId +
                ", addr='" + addr + '\'' +
                ", time=" + time +
                ", siteId=" + siteId +
                ", newGame=" + newGame +
                ", ratio=" + ratio +
                '}';
    }
}
