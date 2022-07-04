package com.mysql.jpa.example.racecondition.service;

import com.mysql.jpa.example.racecondition.dao.Payment;

import java.util.List;

public interface PaymentService {
    Payment getPayment(Long paymentId);
    List<Payment> findPaymentById_TestLock(Long paymentId);
    void findAndLockPaymentById(Long paymentId);
    void okDeposit(Payment payment);
}
