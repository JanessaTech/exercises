const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, setNextBlockBaseFeePerGas} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('CrowdFund2', function () {
    async function deployFixture() {
        const [owner, nonowner, user1, user2, ...others] = await ethers.getSigners()
        const CrowdFund = await ethers.getContractFactory('CrowdFund2')
        const targetAmount = 5000
        const duration = 3 //days
        const oneday = 60 * 60 * 24
        const crowdFund = await CrowdFund.deploy(targetAmount, duration)
        return {crowdFund, targetAmount, duration, oneday, nonowner, user1, user2}
    }

    describe("init", function () {
        it('init', async function () {
            const {crowdFund} = await loadFixture(deployFixture)
            expect(await crowdFund.getStatus()).to.be.equal('ACTIVE')
        })
    })
    describe('contribute', function () {
        it('it failed to contribute when it is ended', async function () {
            const {crowdFund, duration, user1, oneday} = await loadFixture(deployFixture)
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + oneday * duration)
            await expect(crowdFund.connect(user1).contribute()).to.be.revertedWith('ended')
        })
        it('it failed to contribute when value is 0', async function () {
            const {crowdFund, user1} = await loadFixture(deployFixture)
            await expect(crowdFund.connect(user1).contribute({value: 0})).to.be.revertedWith('msg.value = 0')
        })
        it('it contributed successfully', async function () {
            const {crowdFund, user1} = await loadFixture(deployFixture)
            await expect(crowdFund.connect(user1).contribute({value: 1000})).to.emit(crowdFund, 'Contribute').withArgs(user1.getAddress(), 1000)
        })
    })
    describe('claim', function () {
        it('it failed to claim when it is not owner', async function () {

        })
        it('it failed to claim when it is not ended', async function () {
            
        })
        it('it claimed successfully when the target amount is not reached', async function () {

        })
        it('it claimed successfully when the target amount is reached', async function () {

        })
        it('it failed to claim when it is claimed already', async function () {
            
        })
    })
})