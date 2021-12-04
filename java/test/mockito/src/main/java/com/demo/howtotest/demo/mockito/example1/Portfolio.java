package com.demo.howtotest.demo.mockito.example1;

import java.util.List;

public class Portfolio {
    private StockService stockService;
    private List<Stock> stocks;

    // show how to do Constructor Injection
    public Portfolio(StockService stockService){
        this.stockService = stockService;
    }

    public void setStock(List<Stock> stocks){
        this.stocks = stocks;
    }

    public int getMarketValue(){
        int marketValue = 0;
        for(Stock  stock : stocks) {
            marketValue += stockService.getPrice(stock) * stock.getQuantity();
        }
        return marketValue;
    }






}
