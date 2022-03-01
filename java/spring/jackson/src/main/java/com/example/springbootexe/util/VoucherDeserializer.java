package com.example.springbootexe.util;

import com.example.springbootexe.dto.PlayerVouchersResponse;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;

public class VoucherDeserializer extends StdDeserializer<PlayerVouchersResponse.Voucher> {
    public  VoucherDeserializer(Class<?> vc) {
        super(vc);
    }
    public  VoucherDeserializer() {
        this(null);
    }

    @Override
    public PlayerVouchersResponse.Voucher deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        Long voucherId = node.get("voucherId") == null || node.get("voucherId").isNull() ? null : node.get("voucherId").asLong();
        Long campaignId = node.get("campaignId") == null || node.get("campaignId").isNull() ? null : node.get("campaignId").asLong();
        Date createdTime = node.get("createdTime") == null || node.get("createdTime").isNull() ? null : new Date(node.get("createdTime").asLong());
        Date claimedTime = node.get("claimedTime") == null || node.get("claimedTime").isNull() ? null : new Date(node.get("claimedTime").asLong());
        Date endTime = node.get("endTime") == null || node.get("endTime").isNull() ? null : new Date(node.get("endTime").asLong());
        String bonusType = node.get("bonusType").asText();
        String status =  node.get("status") == null || node.get("status").isNull() ? null : node.get("status").asText();
        String slug =  node.get("slug") == null || node.get("slug").isNull() ? null : node.get("slug").asText();
        String directMessage =  node.get("directMessage") == null || node.get("directMessage").isNull() ? null : node.get("directMessage").asText();
        Boolean forfeit = node.get("forfeit") == null || node.get("forfeit").isNull() ? null : node.get("forfeit").asBoolean();
        String validity =  node.get("validity") == null || node.get("validity").isNull() ? null : node.get("validity").asText();
        Long turnoverFactor = node.get("turnoverFactor") == null || node.get("turnoverFactor").isNull() ? null : node.get("turnoverFactor").asLong();

        PlayerVouchersResponse.Voucher voucher = new PlayerVouchersResponse.Voucher();
        voucher.setVoucherId(voucherId);
        voucher.setCampaignId(campaignId);
        voucher.setCreatedTime(createdTime);
        voucher.setClaimedTime(claimedTime);
        voucher.setEndTime(endTime);
        voucher.setBonusType(bonusType);
        voucher.setStatus(status);
        voucher.setSlug(slug);
        voucher.setDirectMessage(directMessage);
        voucher.setForfeit(forfeit);
        voucher.setValidity(validity);
        voucher.setTurnoverFactor(turnoverFactor);

        ObjectNode detail = (ObjectNode) node.get("detail");  // detail is not null

        switch (bonusType) {
            case "bettingBonus":
                PlayerVouchersResponse.BettingBonusDetails bettingBonusDetails = new PlayerVouchersResponse.BettingBonusDetails();

                if (detail != null) {
                    String type =  detail.get("bonusType") == null || detail.get("bonusType").isNull() ? null : detail.get("bonusType").asText();
                    Integer bonusProvider = detail.get("bonusProvider") == null || detail.get("bonusProvider").isNull() ? null : detail.get("bonusProvider").asInt();
                    String externalCampaignId =  detail.get("externalCampaignId") == null || detail.get("externalCampaignId").isNull() ? null : detail.get("externalCampaignId").asText();

                    bettingBonusDetails.setBonusType(type);
                    bettingBonusDetails.setBonusProvider(bonusProvider);
                    bettingBonusDetails.setExternalCampaignId(externalCampaignId);
                }

                voucher.setDetail(bettingBonusDetails);
                break;

            case "rebate":
                PlayerVouchersResponse.RebateDetails rebateDetails = new PlayerVouchersResponse.RebateDetails();
                if (detail != null) {
                    Long rebateTemplateId = detail.get("rebateTemplateId") == null || detail.get("rebateTemplateId").isNull() ? null : detail.get("rebateTemplateId").asLong();
                    rebateDetails.setRebateTemplateId(rebateTemplateId);
                }
                voucher.setDetail(rebateDetails);
                break;

            case "freeSpins":
                PlayerVouchersResponse.FreeSpinsDetails freeSpinsDetails = new PlayerVouchersResponse.FreeSpinsDetails();
                if (detail != null) {
                    Date freeSpinEndTime = detail.get("freeSpinEndTime") == null || detail.get("freeSpinEndTime").isNull() ? null : new Date(detail.get("freeSpinEndTime").asLong());
                    Integer freeSpinProvider = detail.get("freeSpinProvider") == null || detail.get("freeSpinProvider").isNull() ? null : detail.get("freeSpinProvider").asInt();
                    Boolean freeSpinWinsAsCash = detail.get("freeSpinWinsAsCash") == null || detail.get("freeSpinWinsAsCash").isNull() ? null : detail.get("freeSpinWinsAsCash").asBoolean();
                    String freeSpinsCoins = detail.get("freeSpinsCoins") == null || detail.get("freeSpinsCoins").isNull() ? null : detail.get("freeSpinsCoins").asText();
                    String freeSpinsLines = detail.get("freeSpinsLines") == null || detail.get("freeSpinsLines").isNull() ? null : detail.get("freeSpinsLines").asText();
                    Boolean freeSpinLinesForAll = detail.get("freeSpinLinesForAll") == null || detail.get("freeSpinLinesForAll").isNull() ? null : detail.get("freeSpinLinesForAll").asBoolean();
                    String freeSpinsLineBet = detail.get("freeSpinsLineBet") == null || detail.get("freeSpinsLineBet").isNull() ? null : detail.get("freeSpinsLineBet").asText();
                    Boolean freeSpinLineBetForAll = detail.get("freeSpinLineBetForAll") == null || detail.get("freeSpinLineBetForAll").isNull() ? null : detail.get("freeSpinLineBetForAll").asBoolean();
                    Integer freeSpinsSupplier = detail.get("freeSpinsSupplier") == null || detail.get("freeSpinsSupplier").isNull() ? null : detail.get("freeSpinsSupplier").asInt();
                    String freeSpinsRuleType = detail.get("freeSpinsRuleType") == null || detail.get("freeSpinsRuleType").isNull() ? null : detail.get("freeSpinsRuleType").asText();
                    String freeSpinsRuleValue = detail.get("freeSpinsRuleValue") == null || detail.get("freeSpinsRuleValue").isNull() ? null : detail.get("freeSpinsRuleValue").asText();
                    String freeSpinsRuleSubType = detail.get("freeSpinsRuleSubType") == null || detail.get("freeSpinsRuleSubType").isNull() ? null : detail.get("freeSpinsRuleSubType").asText();
                    String externalCampaignId = detail.get("externalCampaignId") == null || detail.get("externalCampaignId").isNull() ? null : detail.get("externalCampaignId").asText();
                    Integer durationAfterExpiration = detail.get("durationAfterExpiration") == null || detail.get("externalCampaignId").isNull() ? null : detail.get("durationAfterExpiration").asInt();
                    String licenseId = detail.get("licenseId") == null || detail.get("licenseId").isNull() ? null : detail.get("licenseId").asText();
                    String gameIdsType = detail.get("gameIdsType") == null || detail.get("gameIdsType").isNull() ? null : detail.get("gameIdsType").asText();
                    String gameIds = detail.get("gameIds") == null || detail.get("gameIds").isNull() ? null : detail.get("gameIds").asText();

                    freeSpinsDetails.setFreeSpinEndTime(freeSpinEndTime);
                    freeSpinsDetails.setFreeSpinProvider(freeSpinProvider);
                    freeSpinsDetails.setFreeSpinWinsAsCash(freeSpinWinsAsCash);
                    freeSpinsDetails.setFreeSpinsCoins(freeSpinsCoins);
                    freeSpinsDetails.setFreeSpinsLines(freeSpinsLines);
                    freeSpinsDetails.setFreeSpinLinesForAll(freeSpinLinesForAll);
                    freeSpinsDetails.setFreeSpinsLineBet(freeSpinsLineBet);
                    freeSpinsDetails.setFreeSpinLineBetForAll(freeSpinLineBetForAll);
                    freeSpinsDetails.setFreeSpinsSupplier(freeSpinsSupplier);
                    freeSpinsDetails.setFreeSpinsRuleType(freeSpinsRuleType);
                    freeSpinsDetails.setFreeSpinsRuleValue(freeSpinsRuleValue);
                    freeSpinsDetails.setFreeSpinsRuleSubType(freeSpinsRuleSubType);
                    freeSpinsDetails.setExternalCampaignId(externalCampaignId);
                    freeSpinsDetails.setDurationAfterExpiration(durationAfterExpiration);
                    freeSpinsDetails.setLicenseId(licenseId);
                    freeSpinsDetails.setGameIdsType(gameIdsType);
                    freeSpinsDetails.setGameIds(gameIds);
                }
                voucher.setDetail(freeSpinsDetails);
                break;
            default:
                PlayerVouchersResponse.VoucherDetails promoteOrCashDetail = new PlayerVouchersResponse.VoucherDetails();
                voucher.setDetail(promoteOrCashDetail);
                break;
        }


        String currency = detail.get("currency") == null || detail.get("currency").isNull() ? null : detail.get("currency").asText();
        BigDecimal amount = detail.get("amount") == null || detail.get("amount").isNull() ? null : BigDecimal.valueOf(detail.get("amount").asDouble());
        String amountType = detail.get("amountType") == null || detail.get("amountType").isNull() ? null : detail.get("amountType").asText();
        Boolean includeBonusAmountToTurnOver = detail.get("includeBonusAmountToTurnOver") == null || detail.get("includeBonusAmountToTurnOver").isNull() ? null : detail.get("includeBonusAmountToTurnOver").asBoolean();
        Boolean includeToWithdrawalDeduction = detail.get("includeToWithdrawalDeduction") == null || detail.get("includeToWithdrawalDeduction").isNull() ? null : detail.get("includeToWithdrawalDeduction").asBoolean();
        BigDecimal maxCashLimit = detail.get("maxCashLimit") == null || detail.get("maxCashLimit").isNull() ? null : BigDecimal.valueOf(detail.get("maxCashLimit").asDouble());

        voucher.getDetail().setCurrency(currency);
        voucher.getDetail().setAmount(amount);
        voucher.getDetail().setAmountType(amountType);
        voucher.getDetail().setIncludeBonusAmountToTurnOver(includeBonusAmountToTurnOver);
        voucher.getDetail().setIncludeToWithdrawalDeduction(includeToWithdrawalDeduction);
        voucher.getDetail().setMaxCashLimit(maxCashLimit);

        return voucher;
    }
}
