package data

class FreeSpinBonusDto {
    Integer freeSpinProvider

    Boolean freeSpinWinsAsCash

    String freeSpinsCoins

    String freeSpinsLines

    Boolean freeSpinLinesForAll

    String freeSpinsLineBet

    Boolean freeSpinLineBetForAll

    Integer freeSpinsSupplier

    String freeSpinsRuleType

    String freeSpinsRuleValue

    String freeSpinsRuleSubType

    String freeSpinsValidityDuration

    /**
     * campaign id from betting bonus provider
     */
    String externalCampaignId

    Integer durationAfterExpiration

    String currency

    String licenseId

    String gameIdsType

    String gameIds

    /**
     * Returns free spin specific metadata
     */
    Map<String, Object> getMetadata() {
        [
                freeSpinProvider: freeSpinProvider,
                freeSpinWinsAsCash: freeSpinWinsAsCash,
                freeSpinsCoins: freeSpinsCoins,
                freeSpinsLines: freeSpinsLines,
                freeSpinLinesForAll: freeSpinLinesForAll,
                freeSpinsLineBet: freeSpinsLineBet,
                freeSpinLineBetForAll: freeSpinLineBetForAll,
                freeSpinsSupplier: freeSpinsSupplier,
                freeSpinsRuleType: freeSpinsRuleType,
                freeSpinsRuleValue: freeSpinsRuleValue,
                freeSpinsRuleSubType: freeSpinsRuleSubType,
                externalCampaignId: externalCampaignId,
                durationAfterExpiration: durationAfterExpiration,
                currency: currency,
                licenseId: licenseId,
                gameIdsType: gameIdsType,
                gameIds: gameIds
        ]
    }
}
