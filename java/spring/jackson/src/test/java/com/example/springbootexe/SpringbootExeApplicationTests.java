package com.example.springbootexe;

import com.example.springbootexe.dto.PlayerVouchersResponse;
import com.example.springbootexe.service.Converter;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class SpringbootExeApplicationTests {
    @Autowired
    Converter converter;

    @Test
    void convertToObject() throws JsonProcessingException {
        String json = "{\n" +
                "    \"vouchers\": [\n" +
                "        {\n" +
                "            \"voucherId\": 260,\n" +
                "            \"campaignId\": 4087,\n" +
                "            \"createdTime\": 1645815432000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"endTime\": 1645703585000,\n" +
                "            \"bonusType\": \"cash\",\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": \"cash slug from compaign\",\n" +
                "            \"directMessage\": \"cash dddd from campaign\",\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": \"PT10H\",\n" +
                "            \"turnoverFactor\": 2,\n" +
                "            \"detail\": {\n" +
                "                \"currency\": \"USD\",\n" +
                "                \"amount\": 10.00,\n" +
                "                \"amountType\": \"fixed\",\n" +
                "                \"includeBonusAmountToTurnOver\": true,\n" +
                "                \"includeToWithdrawalDeduction\": false\n" +
                "            }\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 259,\n" +
                "            \"campaignId\": null,\n" +
                "            \"createdTime\": 1645660026000,\n" +
                "            \"claimedTime\": 1645660189000,\n" +
                "            \"endTime\": 1646323200000,\n" +
                "            \"bonusType\": \"freeSpins\",\n" +
                "            \"status\": \"CLAIMED\",\n" +
                "            \"slug\": \"jane sly\",\n" +
                "            \"directMessage\": \"jane ddddd\",\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": \"PT20H\",\n" +
                "            \"turnoverFactor\": 2,\n" +
                "            \"detail\": {\n" +
                "                \"currency\": \"USD\",\n" +
                "                \"amount\": 23.00,\n" +
                "                \"amountType\": \"fixed\",\n" +
                "                \"includeBonusAmountToTurnOver\": true,\n" +
                "                \"freeSpinEndTime\": 1646578189000,\n" +
                "                \"freeSpinProvider\": 3,\n" +
                "                \"freeSpinWinsAsCash\": true,\n" +
                "                \"freeSpinsCoins\": \"EUR=0.01;SEK=0.1;NOK=0.1;AUD=0.01;CAD=0.01;GBP=0.01;USD=0.01;PLN=0.04;VEF=0.07;NGN=2;MXN=0.2\",\n" +
                "                \"freeSpinsLines\": \"2\",\n" +
                "                \"freeSpinLinesForAll\": null,\n" +
                "                \"freeSpinsLineBet\": \"32\",\n" +
                "                \"freeSpinLineBetForAll\": null,\n" +
                "                \"freeSpinsSupplier\": null,\n" +
                "                \"freeSpinsRuleType\": null,\n" +
                "                \"freeSpinsRuleValue\": null,\n" +
                "                \"freeSpinsRuleSubType\": null,\n" +
                "                \"externalCampaignId\": null,\n" +
                "                \"durationAfterExpiration\": 10,\n" +
                "                \"licenseId\": null,\n" +
                "                \"gameIdsType\": \"ENTERING\",\n" +
                "                \"gameIds\": \"60037,60204\"\n" +
                "                \n" +
                "            }\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 254,\n" +
                "            \"campaignId\": null,\n" +
                "            \"createdTime\": 1645411529000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"endTime\": 1645718400000,\n" +
                "            \"bonusType\": \"bettingBonus\",\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": null,\n" +
                "            \"directMessage\": null,\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": \"PT20H\",\n" +
                "            \"turnoverFactor\": 2,\n" +
                "            \"detail\": {\n" +
                "                \"currency\": \"USD\",\n" +
                "                \"amount\": 1234.00,\n" +
                "                \"amountType\": \"fixed\",\n" +
                "                \"includeBonusAmountToTurnOver\": false,\n" +
                "                \"bonusType\": \"rollover\",\n" +
                "                \"bonusProvider\": 28,\n" +
                "                \"externalCampaignId\": \"4085\"\n" +
                "            }\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 253,\n" +
                "            \"campaignId\": 4085,\n" +
                "            \"createdTime\": 1645409805000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"endTime\": 1645804800000,\n" +
                "            \"bonusType\": \"promo\",\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": \"sssssss\",\n" +
                "            \"directMessage\": \"dddddddd\",\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": null,\n" +
                "            \"turnoverFactor\": 20,\n" +
                "            \"detail\": {\n" +
                "                \"currency\": \"USD\",\n" +
                "                \"amount\": 1456.00,\n" +
                "                \"amountType\": \"fixed\",\n" +
                "                \"includeBonusAmountToTurnOver\": true,\n" +
                "                \"includeToWithdrawalDeduction\": false\n" +
                "            }\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 248,\n" +
                "            \"campaignId\": null,\n" +
                "            \"createdTime\": 1645377784000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"endTime\": 1645977600000,\n" +
                "            \"bonusType\": \"rebate\",\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": \"rebate-slog\",\n" +
                "            \"directMessage\": \"rebate-driect message\",\n" +
                "            \"forfeit\": true,\n" +
                "            \"validity\": \"PT13H\",\n" +
                "            \"detail\": {\n" +
                "                \"currency\": \"USD\",\n" +
                "                \"rebateTemplateId\": 1\n" +
                "            }\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 246,\n" +
                "            \"campaignId\": null,\n" +
                "            \"createdTime\": 1645377074000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"endTime\": 1645804800000,\n" +
                "            \"bonusType\": \"promo\",\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": \"promo-slug\",\n" +
                "            \"directMessage\": \"prpmo-directMessage\",\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": null,\n" +
                "            \"turnoverFactor\": 2,\n" +
                "            \"detail\": {\n" +
                "                \"currency\": \"USD\",\n" +
                "                \"amount\": 20.00,\n" +
                "                \"amountType\": \"fixed\",\n" +
                "                \"includeBonusAmountToTurnOver\": true,\n" +
                "                \"includeToWithdrawalDeduction\": false\n" +
                "            }\n" +
                "        }\n" +
                "    ],\n" +
                "\t\"count\": 12,\n" +
                "    \"size\": 66,\n" +
                "    \"currentPage\": 1,\n" +
                "    \"pageCount\": 1\n" +
                "}";
        PlayerVouchersResponse response = converter.convertToObject(json);
        assertEquals(6, response.getVouchers().size());
    }

}
