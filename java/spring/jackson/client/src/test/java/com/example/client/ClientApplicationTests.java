package com.example.client;

import com.example.client.dto.PlayerVouchersResponse;
import com.example.client.util.Converter;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
class ClientApplicationTests {
    @Autowired
    Converter converter;

    @Test
    void contextLoads() throws JsonProcessingException {
        String json = "{\n" +
                "    \"vouchers\": [\n" +
                "        {\n" +
                "            \"voucherId\": 260,\n" +
                "            \"campaignId\": 4087,\n" +
                "            \"createdTime\": 1645815432000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": \"cash slug from compaign\",\n" +
                "            \"directMessage\": \"cash dddd from campaign\",\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": \"PT10H\",\n" +
                "            \"turnoverFactor\": 2,\n" +
                "            \"type\": \"cash\",\n" +
                "            \"endTime\": 1645703585000,\n" +
                "            \"currency\": \"USD\",\n" +
                "            \"amount\": 10.00,\n" +
                "            \"amountType\": \"fixed\",\n" +
                "            \"includeBonusAmountToTurnOver\": true,\n" +
                "            \"includeToWithdrawalDeduction\": false\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 259,\n" +
                "            \"campaignId\": null,\n" +
                "            \"createdTime\": 1645660026000,\n" +
                "            \"claimedTime\": 1645660189000,\n" +
                "            \"freeSpinEndTime\": 1646578189000,\n" +
                "            \"status\": \"CLAIMED\",\n" +
                "            \"slug\": \"jane sly\",\n" +
                "            \"directMessage\": \"jane ddddd\",\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": \"PT20H\",\n" +
                "            \"turnoverFactor\": 2,\n" +
                "            \"type\": \"freeSpins\",\n" +
                "            \"endTime\": 1646323200000,\n" +
                "            \"currency\": \"USD\",\n" +
                "            \"amount\": 23.00,\n" +
                "            \"amountType\": \"fixed\",\n" +
                "            \"includeBonusAmountToTurnOver\": true,\n" +
                "            \"freeSpinProvider\": 3,\n" +
                "            \"freeSpinWinsAsCash\": true,\n" +
                "            \"freeSpinsCoins\": \"EUR=0.01;SEK=0.1;NOK=0.1;AUD=0.01;CAD=0.01;GBP=0.01;USD=0.01;PLN=0.04;VEF=0.07;NGN=2;MXN=0.2\",\n" +
                "            \"freeSpinsLines\": \"2\",\n" +
                "            \"freeSpinLinesForAll\": null,\n" +
                "            \"freeSpinsLineBet\": \"32\",\n" +
                "            \"freeSpinLineBetForAll\": null,\n" +
                "            \"freeSpinsSupplier\": null,\n" +
                "            \"freeSpinsRuleType\": null,\n" +
                "            \"freeSpinsRuleValue\": null,\n" +
                "            \"freeSpinsRuleSubType\": null,\n" +
                "            \"freeSpinsValidityDuration\": null,\n" +
                "            \"durationAfterExpiration\": 10,\n" +
                "            \"licenseId\": null,\n" +
                "            \"gameIdsType\": \"ENTERING\",\n" +
                "            \"games\": [\n" +
                "                60037,\n" +
                "                60204\n" +
                "            ]\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 254,\n" +
                "            \"campaignId\": null,\n" +
                "            \"createdTime\": 1645411529000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": null,\n" +
                "            \"directMessage\": null,\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": \"PT20H\",\n" +
                "            \"turnoverFactor\": 2,\n" +
                "            \"type\": \"bettingBonus\",\n" +
                "            \"endTime\": 1645718400000,\n" +
                "            \"currency\": \"USD\",\n" +
                "            \"amount\": 1234.00,\n" +
                "            \"amountType\": \"fixed\",\n" +
                "            \"includeBonusAmountToTurnOver\": false,\n" +
                "            \"bonusType\": 0,\n" +
                "            \"bonusProvider\": 28,\n" +
                "            \"externalCampaignId\": \"4085\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 253,\n" +
                "            \"campaignId\": 4085,\n" +
                "            \"createdTime\": 1645409805000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": \"sssssss\",\n" +
                "            \"directMessage\": \"dddddddd\",\n" +
                "            \"forfeit\": false,\n" +
                "            \"validity\": null,\n" +
                "            \"turnoverFactor\": 20,\n" +
                "            \"type\": \"promo\",\n" +
                "            \"endTime\": 1645804800000,\n" +
                "            \"currency\": \"USD\",\n" +
                "            \"amount\": 1456.00,\n" +
                "            \"amountType\": \"fixed\",\n" +
                "            \"includeBonusAmountToTurnOver\": true,\n" +
                "            \"includeToWithdrawalDeduction\": false\n" +
                "        },\n" +
                "        {\n" +
                "            \"voucherId\": 248,\n" +
                "            \"campaignId\": null,\n" +
                "            \"createdTime\": 1645377784000,\n" +
                "            \"claimedTime\": null,\n" +
                "            \"status\": \"ACTIVE\",\n" +
                "            \"slug\": \"rebate-slog\",\n" +
                "            \"directMessage\": \"rebate-driect message\",\n" +
                "            \"forfeit\": true,\n" +
                "            \"validity\": \"PT13H\",\n" +
                "            \"type\": \"rebate\",\n" +
                "            \"endTime\": 1645977600000,\n" +
                "            \"currency\": \"USD\",\n" +
                "            \"rebateTemplateId\": 1\n" +
                "        }\n" +
                "    ],\n" +
                "    \"count\": 12,\n" +
                "    \"size\": 66,\n" +
                "    \"currentPage\": 1,\n" +
                "    \"pageCount\": 1\n" +
                "}";
        PlayerVouchersResponse response = converter.convertToObject(json);
        assertEquals(5, response.getVouchers().size());
    }

}
