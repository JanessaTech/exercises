package com.example.client.reponse;

import com.example.client.dto.PlayerVouchersResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.hateoas.server.core.Relation;

import java.util.Date;

@Data
public class ProviderVoucher {

    private Long voucherId;
    private Long campaignId;
    private Date createdTime;
    private Date claimedTime;
    private Date endTime;
    private String bonusType;
    private String status;
    private String slug;
    private String directMessage;
    private Boolean forfeit;
    private String validity;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long turnoverFactor;

    private PlayerVouchersResponse.VoucherDetails detail;
}