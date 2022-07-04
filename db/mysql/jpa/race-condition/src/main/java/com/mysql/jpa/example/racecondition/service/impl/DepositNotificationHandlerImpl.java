package com.mysql.jpa.example.racecondition.service.impl;

import com.mysql.jpa.example.racecondition.dao.Payment;
import com.mysql.jpa.example.racecondition.service.DepositNotificationHandler;
import com.mysql.jpa.example.racecondition.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
public class DepositNotificationHandlerImpl implements DepositNotificationHandler {
    private @Autowired
    PaymentService paymentService;

    @Override
    @Transactional(readOnly = false, rollbackFor = Exception.class)
    public void toOkWithTransactional(Long paymentId, int amount, String reason) {

        try {
            Payment original = paymentService.getPayment(paymentId);

            if (original != null) {
                paymentService.findAndLockPaymentById(paymentId);

                original.setAmount(amount);
                original.setReason(reason);
                paymentService.okDeposit(original);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    @Override
    public void toOkWithOutTransactional(Long paymentId, int amount, String reason){
        Payment payment = paymentService.getPayment(paymentId);
        payment.setAmount(amount);
        payment.setReason(reason);
        paymentService.okDeposit(payment);
    }
}
