package com.mysql.jpa.example.racecondition.service.impl;

import com.mysql.jpa.example.racecondition.dao.Payment;
import com.mysql.jpa.example.racecondition.dao.Status;
import com.mysql.jpa.example.racecondition.repository.PaymentRepository;
import com.mysql.jpa.example.racecondition.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class PaymentServiceImpl implements PaymentService {
    private @Autowired
    PaymentRepository paymentRepository;

    @Override
    public Payment getPayment(Long paymentId) {
        return paymentRepository.findById(paymentId).orElse(null);
    }

    @Override
    @Transactional(readOnly = false, rollbackFor = Exception.class)
    public List<Payment> findPaymentById_TestLock(Long paymentId) {
        return paymentRepository.findAndLockPaymentById(paymentId);
    }

    @Override
    public void findAndLockPaymentById(Long paymentId) {
        paymentRepository.findAndLockPaymentById(paymentId);
    }

    @Override
    public void okDeposit(Payment payment) {
        try {
            payment.setStatus(Status.ok);
            paymentRepository.save(payment);
        } catch (Exception e) {
            log.error("okDeposit met error. reason: {}", e.getLocalizedMessage());
            e.printStackTrace();
        }
    }
}
