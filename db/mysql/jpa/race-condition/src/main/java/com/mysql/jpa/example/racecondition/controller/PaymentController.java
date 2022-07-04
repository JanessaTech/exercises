package com.mysql.jpa.example.racecondition.controller;

import com.mysql.jpa.example.racecondition.dao.Payment;
import com.mysql.jpa.example.racecondition.service.DepositNotificationHandler;
import com.mysql.jpa.example.racecondition.service.PaymentService;
import com.mysql.jpa.example.racecondition.vo.PaymentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/payments")
public class PaymentController {
    private @Autowired  PaymentService paymentService;
    private @Autowired
    DepositNotificationHandler depositNotificationHandler;


    @PostMapping(value = "/toOk1")
    void toOkWithTransactional(@RequestParam(value = "id", required = true) Long id,
                               @RequestParam(value = "amount", required = false, defaultValue = "0") int amount,
                               @RequestParam(value = "reason", required = false) String reason) {
        depositNotificationHandler.toOkWithTransactional(id, amount, reason);

    }

    @PostMapping(value = "/toOk2")
    void toOkWithOutTransactional(@RequestParam(value = "id", required = true) Long id,
                                  @RequestParam(value = "amount", required = false, defaultValue = "0") int amount,
                                  @RequestParam(value = "reason", required = false) String reason) throws Exception {
        depositNotificationHandler.toOkWithOutTransactional(id, amount, reason);

    }

    //For test purpose to test how to call sp using @Query in jpa
    @GetMapping("/{id}")
    List<PaymentVo> findPaymentById(@PathVariable(value = "id") Long id) {
        List<Payment> payments = paymentService.findPaymentById_TestLock(id);
        return payments.stream().map(PaymentVo::new).collect(Collectors.toList());
    }
}
