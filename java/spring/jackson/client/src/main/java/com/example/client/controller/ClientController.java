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
            ProviderVoucher providerVoucher = null;
            switch (voucher.getType()) {
                case "promo":
                    providerVoucher = new ProviderVoucher.PromoBonusVoucher();
                    BeanUtils.copyProperties(voucher, providerVoucher);
                    break;
                case "cash":
                    providerVoucher = new ProviderVoucher.CashBonusVoucher();
                    BeanUtils.copyProperties(voucher, providerVoucher);
                    break;
                case "freeSpins":
                    providerVoucher = new ProviderVoucher.FreeSpinsVoucher();
                    BeanUtils.copyProperties(voucher, providerVoucher);
                    break;

                case "bettingBonus":
                    providerVoucher = new ProviderVoucher.BettingBonusVoucher();
                    BeanUtils.copyProperties(voucher, providerVoucher);
                    break;
                case "rebate":
                    providerVoucher = new ProviderVoucher.RebateVoucher();
                    BeanUtils.copyProperties(voucher, providerVoucher);
                    break;
                default: break;
            }
            list.add(providerVoucher);
        }

        return list;
    }
}
