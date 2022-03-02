import data.FreeSpinBonusDto
import groovy.json.JsonBuilder
import groovy.json.JsonSlurper
import jdk.nashorn.internal.objects.annotations.Function
// Groovy-Eclipse: Invalid jar path in the compiler settings: '' :
// solution: Settings -> Java Compiler -> Changing from Groovy-Eclipse to Javac fixes the issue.
class MyFirstGroovy {
    def main(){
        print('hello Jane', )
    }

    static void main(def args){
        FreeSpinBonusDto freeSpinBonusDto = new FreeSpinBonusDto()
        freeSpinBonusDto.freeSpinProvider = 1
        freeSpinBonusDto.freeSpinWinsAsCash = false
        freeSpinBonusDto.freeSpinsCoins = "some-coin"
        freeSpinBonusDto.freeSpinsLines = "some-line"
        freeSpinBonusDto.freeSpinLinesForAll = true
        freeSpinBonusDto.freeSpinsLineBet = "some-bet"
        freeSpinBonusDto.freeSpinLineBetForAll = true
        freeSpinBonusDto.freeSpinsSupplier = 2
        freeSpinBonusDto.freeSpinsRuleType = "some-type"
        freeSpinBonusDto.freeSpinsRuleValue = "some-value"
        freeSpinBonusDto.freeSpinsRuleSubType = "some-subtype"
        freeSpinBonusDto.externalCampaignId = "some-id"
        freeSpinBonusDto.durationAfterExpiration = 3
        freeSpinBonusDto.licenseId = "some-licenseId"
        freeSpinBonusDto.gameIdsType = "some-gameIdsType"
        freeSpinBonusDto.gameIds = "1,2"

        def encoder = new JsonBuilder(freeSpinBonusDto.getMetadata())
        println(encoder.toString())


    }
}
