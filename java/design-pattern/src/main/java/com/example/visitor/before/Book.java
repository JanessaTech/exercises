package com.example.visitor.before;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Book {
    private int price;
    private String isbnNumber;

    int getCost() {
        int cost = 0;
        //apply 5$ discount if book price is greater than 50
        if(getPrice() > 50)
        {
            cost = getPrice() - 5;
        }
        else
            cost = getPrice();

        System.out.println("Book ISBN::"+ getIsbnNumber() + " cost = " + cost);
        return cost;
    }
}
