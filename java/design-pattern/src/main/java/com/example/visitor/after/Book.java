package com.example.visitor.after;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Book implements Item{
    private int price;
    private String isbnNumber;

    public int getCost(Visitor visitor) {
        return visitor.getCost(this);
    }
}
