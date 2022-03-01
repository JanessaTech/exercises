Test json:

{
"vouchers": [
{
"voucherId": 260,
"campaignId": 4087,
"createdTime": 1645815432000,
"claimedTime": null,
"endTime": 1645703585000,
"bonusType": "cash",
"status": "ACTIVE",
"slug": "cash slug from compaign",
"directMessage": "cash dddd from campaign",
"forfeit": false,
"validity": "PT10H",
"turnoverFactor": 2,
"detail": {
"currency": "USD",
"amount": 10.00,
"amountType": "fixed",
"includeBonusAmountToTurnOver": true,
"includeToWithdrawalDeduction": false
}
},
{
"voucherId": 259,
"campaignId": null,
"createdTime": 1645660026000,
"claimedTime": 1645660189000,
"endTime": 1646323200000,
"bonusType": "freeSpins",
"status": "CLAIMED",
"slug": "jane sly",
"directMessage": "jane ddddd",
"forfeit": false,
"validity": "PT20H",
"turnoverFactor": 2,
"detail": {
"currency": "USD",
"amount": 23.00,
"amountType": "fixed",
"includeBonusAmountToTurnOver": true,
"freeSpinEndTime": 1646578189000,
"freeSpinProvider": 3,
"freeSpinWinsAsCash": true,
"freeSpinsCoins": "EUR=0.01;SEK=0.1;NOK=0.1;AUD=0.01;CAD=0.01;GBP=0.01;USD=0.01;PLN=0.04;VEF=0.07;NGN=2;MXN=0.2",
"freeSpinsLines": "2",
"freeSpinLinesForAll": null,
"freeSpinsLineBet": "32",
"freeSpinLineBetForAll": null,
"freeSpinsSupplier": null,
"freeSpinsRuleType": null,
"freeSpinsRuleValue": null,
"freeSpinsRuleSubType": null,
"externalCampaignId": null,
"durationAfterExpiration": 10,
"licenseId": null,
"gameIdsType": "ENTERING",
"gameIds": "60037,60204"

            }
        },
        {
            "voucherId": 254,
            "campaignId": null,
            "createdTime": 1645411529000,
            "claimedTime": null,
            "endTime": 1645718400000,
            "bonusType": "bettingBonus",
            "status": "ACTIVE",
            "slug": null,
            "directMessage": null,
            "forfeit": false,
            "validity": "PT20H",
            "turnoverFactor": 2,
            "detail": {
                "currency": "USD",
                "amount": 1234.00,
                "amountType": "fixed",
                "includeBonusAmountToTurnOver": false,
                "bonusType": "rollover",
                "bonusProvider": 28,
                "externalCampaignId": "4085"
            }
        },
        {
            "voucherId": 253,
            "campaignId": 4085,
            "createdTime": 1645409805000,
            "claimedTime": null,
            "endTime": 1645804800000,
            "bonusType": "promo",
            "status": "ACTIVE",
            "slug": "sssssss",
            "directMessage": "dddddddd",
            "forfeit": false,
            "validity": null,
            "turnoverFactor": 20,
            "detail": {
                "currency": "USD",
                "amount": 1456.00,
                "amountType": "fixed",
                "includeBonusAmountToTurnOver": true,
                "includeToWithdrawalDeduction": false
            }
        },
        {
            "voucherId": 248,
            "campaignId": null,
            "createdTime": 1645377784000,
            "claimedTime": null,
            "endTime": 1645977600000,
            "bonusType": "rebate",
            "status": "ACTIVE",
            "slug": "rebate-slog",
            "directMessage": "rebate-driect message",
            "forfeit": true,
            "validity": "PT13H",
            "detail": {
                "currency": "USD",
                "rebateTemplateId": 1
            }
        },
        {
            "voucherId": 246,
            "campaignId": null,
            "createdTime": 1645377074000,
            "claimedTime": null,
            "endTime": 1645804800000,
            "bonusType": "promo",
            "status": "ACTIVE",
            "slug": "promo-slug",
            "directMessage": "prpmo-directMessage",
            "forfeit": false,
            "validity": null,
            "turnoverFactor": 2,
            "detail": {
                "currency": "USD",
                "amount": 20.00,
                "amountType": "fixed",
                "includeBonusAmountToTurnOver": true,
                "includeToWithdrawalDeduction": false
            }
        }
    ],
	"count": 12,
    "size": 66,
    "currentPage": 1,
    "pageCount": 1
}