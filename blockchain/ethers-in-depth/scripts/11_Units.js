const {ethers} = require('ethers')

/**
 *    Name       Decimal
 *    wei        0
 *    kwei       3
 *    mwei       6
 *    gwei       9
 *    szabo      12
 *    finney     15
 *    ether      18
 */
function getBigInt() {
    const gwei = ethers.getBigInt('1000000000')
    console.log(gwei)
    console.log(ethers.getBigInt("0x3b9aca00"))
    console.log(ethers.getBigInt(1000000000))

    console.log("The max safe number in js:", Number.MAX_SAFE_INTEGER)
}

function basicOpsForBigInt() {
    const oneGwei = ethers.getBigInt('1000000000')
    console.log("Add", oneGwei + 1n)
    console.log("Substract", oneGwei - 1n)
    console.log("Multiple", oneGwei * 2n)
    console.log("Divide", oneGwei / 2n)     
}

function formatUnits() {  
    // small unit -> big unit
    const oneGwei = ethers.getBigInt('1000000000')
    console.log(ethers.formatUnits(oneGwei, 0))  //'1000000000'
    console.log(ethers.formatUnits(oneGwei, 9)) // '1.0'
    console.log(ethers.formatUnits(oneGwei, "gwei"))  // '1.0'
    console.log(ethers.formatUnits(oneGwei, "ether"))  //'0.000000001'
    console.log(ethers.formatEther(oneGwei))  //'0.000000001'
}

function parseUnits() { // big unit -> small unit(wei)
    console.log(ethers.parseUnits('1.0'))           //1000000000000000000n
    console.log(ethers.parseUnits('1.0', 'ether'))  //1000000000000000000n
    console.log(ethers.parseUnits('1.0', 18))       //1000000000000000000n
    console.log(ethers.parseUnits('1.0', 'gwei'))   //1000000000n
    console.log(ethers.parseUnits('1.0', 9))        //1000000000n
    console.log(ethers.parseEther('1.0'))           //1000000000000000000n , equivalent to parseUnits(ether, 18)

}

//getBigInt()
//basicOpsForBigInt()
//formatUnits()
parseUnits()