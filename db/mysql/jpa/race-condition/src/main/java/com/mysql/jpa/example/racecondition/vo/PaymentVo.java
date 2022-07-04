package com.mysql.jpa.example.racecondition.vo;

import com.mysql.jpa.example.racecondition.dao.Payment;
import com.mysql.jpa.example.racecondition.dao.Status;
import lombok.Data;

import java.io.Serializable;

@Data
public class PaymentVo implements Serializable {
    Long id;

    Status status;

    Integer amount;

    String reason;

    public PaymentVo(Payment payment) {
        this.id = payment.getId();
        this.status = payment.getStatus();
        this.amount = payment.getAmount();
        this.reason = payment.getReason();
    }

}
