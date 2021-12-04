package com.demo.howtotest.demo.mockito.example1;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class PortfolioTest {
    @InjectMocks
    Portfolio portfolio;

    @Mock
    StockService stockService;

    @Test
    public void testGetPrice() {
        List<Stock> stocks = new ArrayList<Stock>();
        Stock googleStock = new Stock("1","Google", 10);
        Stock microsoftStock = new Stock("2","Microsoft",100);
        stocks.add(googleStock);
        stocks.add(microsoftStock);
        portfolio.setStock(stocks);
        when(stockService.getPrice(googleStock)).thenReturn(50);
        when(stockService.getPrice(microsoftStock)).thenReturn(1000);

        int marketValue = portfolio.getMarketValue();
        Assert.assertEquals(100500, marketValue);

    }
}
