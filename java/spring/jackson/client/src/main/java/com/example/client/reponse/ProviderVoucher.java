package com.example.client.reponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.util.Date;

@JsonSubTypes({
        @JsonSubTypes.Type(name = "promo", value = ProviderVoucher.PromoBonusVoucher.class),
        @JsonSubTypes.Type(name = "cash", value = ProviderVoucher.CashBonusVoucher.class),
        @JsonSubTypes.Type(name = "freeSpins", value = ProviderVoucher.FreeSpinsVoucher.class),
        @JsonSubTypes.Type(name = "bettingBonus", value = ProviderVoucher.BettingBonusVoucher.class),
        @JsonSubTypes.Type(name = "rebate", value = ProviderVoucher.RebateVoucher.class)
})
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.EXISTING_PROPERTY,
        property = "type",
        visible = true
)
@Data
public class ProviderVoucher {

    private Long voucherId;
    private Long campaignId;
    private Date createdTime;
    private Date claimedTime;
    @JsonInclude(JsonInclude.Include.NON_NULL)
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

    @EqualsAndHashCode(callSuper = true)
    @Data
    public static
    @JsonIgnoreProperties(ignoreUnknown = true)
    class CashBonusVoucher extends ProviderVoucher {
        private BigDecimal maxCashLimit;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static
    class PromoBonusVoucher extends ProviderVoucher {
        private BigDecimal maxPromoLimit;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    public static
    @JsonIgnoreProperties(ignoreUnknown = true)
    class BettingBonusVoucher extends ProviderVoucher {
        private String bonusType;
        private Integer bonusProvider;
        private String externalCampaignId;
    }

    @EqualsAndHashCode(callSuper = true)
    @Data
    public static
    @JsonIgnoreProperties(ignoreUnknown = true)
    class FreeSpinsVoucher extends ProviderVoucher {

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
    public static
    @JsonIgnoreProperties(ignoreUnknown = true)
    class RebateVoucher extends ProviderVoucher {
        private Long rebateTemplateId;
    }
}



