package com.mysql.jpa.example.racecondition.repository;

import com.mysql.jpa.example.racecondition.dao.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query(value = "CALL SP_LOCK_PENDING_PAYMENTS(:payment_id);", nativeQuery = true)
    List<Payment> findAndLockPaymentById(@Param("payment_id") Long payment_id);
}
