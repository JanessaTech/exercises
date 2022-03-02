package com.example.client.dto;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

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

    @JsonSubTypes({
            @JsonSubTypes.Type(name = "promo", value = PromoBonusVoucher.class),
            @JsonSubTypes.Type(name = "cash", value = CashBonusVoucher.class),
            @JsonSubTypes.Type(name = "freeSpins", value = FreeSpinsVoucher.class),
            @JsonSubTypes.Type(name = "bettingBonus", value = BettingBonusVoucher.class),
            @JsonSubTypes.Type(name = "rebate", value = RebateVoucher.class)
    })
    @JsonTypeInfo(
            use = JsonTypeInfo.Id.NAME,
            include = JsonTypeInfo.As.EXISTING_PROPERTY,
            property = "type",
            visible = true
    )
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Voucher {
        private Long voucherId;
        private Long campaignId;
        private Date createdTime;
        private Date claimedTime;
        private Date freeSpinEndTime;
        private String status;
        private String slug;
        private String directMessage;
        private Boolean forfeit;
        private String validity;
        @JsonInclude(JsonInclude.Include.NON_NULL)
        private Long turnoverFactor;

        private String type;

        @JsonInclude(JsonInclude.Include.NON_NULL)
        private Date endTime;

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

    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CashBonusVoucher extends Voucher{
        private BigDecimal maxCashLimit;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PromoBonusVoucher extends Voucher{
        private BigDecimal maxPromoLimit;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class BettingBonusVoucher extends Voucher{
        private String bonusType;
        private Integer bonusProvider;
        private String externalCampaignId;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class FreeSpinsVoucher extends Voucher {

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
        private Long[] games;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RebateVoucher extends Voucher {
        private Long rebateTemplateId;
    }
}
