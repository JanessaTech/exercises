package com.example.client.dto;

import com.example.client.util.VoucherDeserializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class PlayerVouchersResponse implements WithErrorResponse{
    private int errorCode;
    private String error;

    @JsonUnwrapped
    private PaginationResponse pagination;

    private List<Voucher> vouchers = new ArrayList<>();

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)

    @JsonDeserialize(using = VoucherDeserializer.class)
    public static class Voucher {
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

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private VoucherDetails detail;

    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class VoucherDetails {
        @JsonInclude(JsonInclude.Include.NON_NULL)
        private String currency;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private BigDecimal amount;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private String amountType;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private Boolean includeBonusAmountToTurnOver;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private Boolean includeToWithdrawalDeduction;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private BigDecimal maxCashLimit;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class BettingBonusDetails extends VoucherDetails{
        private String bonusType;
        private Integer bonusProvider;
        private String externalCampaignId;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FreeSpinsDetails extends VoucherDetails {
        @JsonInclude(JsonInclude.Include.NON_NULL)
        private Date freeSpinEndTime;

        private Integer freeSpinProvider;
        private Boolean freeSpinWinsAsCash;
        private String freeSpinsCoins;
        private String freeSpinsLines;
        private Boolean freeSpinLinesForAll;
        private String freeSpinsLineBet;
        private Boolean freeSpinLineBetForAll;
        private Integer freeSpinsSupplier;
        private String freeSpinsRuleType;
        private String freeSpinsRuleValue;
        private String freeSpinsRuleSubType;
        private String externalCampaignId;
        private Integer durationAfterExpiration;
        private String licenseId;
        private String gameIdsType;
        private String gameIds;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RebateDetails extends VoucherDetails {
        private Long rebateTemplateId;
    }
}
