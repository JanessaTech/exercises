package com.mysql.jpa.example.racecondition.service;

public interface DepositNotificationHandler {
    void toOkWithTransactional(Long id, int amount, String reason);
    void toOkWithOutTransactional(Long id, int amount, String reason) throws Exception;
}
