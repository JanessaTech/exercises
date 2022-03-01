package com.example.client.controller;

import com.example.client.dto.PlayerVouchersResponse;
import com.example.client.reponse.ProviderVoucher;
import com.example.client.service.Caller;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ClientController {
    @Autowired
    Caller caller;

    @GetMapping
    public List<ProviderVoucher> get() {
        PlayerVouchersResponse response = caller.call();
        List<ProviderVoucher> list = new ArrayList<>();

        for( PlayerVouchersResponse.Voucher voucher : response.getVouchers()) {
            ProviderVoucher item = new ProviderVoucher();
            BeanUtils.copyProperties(voucher, item);
            list.add(item);
        }

        return list;
    }
}
