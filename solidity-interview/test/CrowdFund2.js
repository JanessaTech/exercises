const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, setNextBlockBaseFeePerGas} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('CrowdFund2', function () {
    async function deployFixture() {
        const [owner, nonowner, user1, user2, ...others] = await ethers.getSigners()
        const CrowdFund = await ethers.getContractFactory('CrowdFund2', owner)
        const targetAmount = 5000
        const duration = 3 //days
        const oneday = 60 * 60 * 24
        const crowdFund = await CrowdFund.deploy(targetAmount, duration)
        return {crowdFund, targetAmount, duration, oneday, owner, nonowner, user1, user2}
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
            const {crowdFund, nonowner} = await loadFixture(deployFixture)
            await expect(crowdFund.connect(nonowner).claim()).to.be.revertedWith('not owner')
        })
        it('it failed to claim when it is not ended', async function () {
            const {crowdFund, owner} = await loadFixture(deployFixture)
            await expect(crowdFund.connect(owner).claim()).to.be.revertedWith('not end')
        })
        it('it claimed successfully when the target amount is not reached', async function () {
            const {crowdFund, owner, user1, user2, duration, oneday} = await loadFixture(deployFixture)
            const latest = await time.latest()
            await crowdFund.connect(user1).contribute({value: 2000})
            await crowdFund.connect(user2).contribute({value: 1000})
            await time.setNextBlockTimestamp(latest + duration * oneday) 
            await expect(crowdFund.connect(owner).claim()).to.emit(crowdFund, 'Claim').withArgs(owner.getAddress(), 0)
        })
        it('it claimed successfully when the target amount is reached', async function () {
            const {crowdFund, owner, user1, user2, duration, oneday} = await loadFixture(deployFixture)
            const latest = await time.latest()
            await crowdFund.connect(user1).contribute({value: 3000})
            await crowdFund.connect(user2).contribute({value: 4000})
            await time.setNextBlockTimestamp(latest + duration * oneday) 
            await expect(crowdFund.connect(owner).claim()).to.emit(crowdFund, 'Claim').withArgs(owner.getAddress(), 7000)
        })
        it('it failed to claim when it is claimed already', async function () {
            const {crowdFund, owner, user1, user2, duration, oneday} = await loadFixture(deployFixture)
            const latest = await time.latest()
            await crowdFund.connect(user1).contribute({value: 3000})
            await crowdFund.connect(user2).contribute({value: 4000})
            await time.setNextBlockTimestamp(latest + duration * oneday) 
            await crowdFund.connect(owner).claim()
            await expect(crowdFund.connect(owner).claim()).to.be.revertedWith('claimed')
        })
    })
    describe('refund', function () {
        it('it failed to refund when it is not ended', async function () {
            const {crowdFund, user1} = await loadFixture(deployFixture)
            await crowdFund.connect(user1).contribute({value: 3000})
            await expect(crowdFund.connect(user1).refund()).to.be.revertedWith('not end')
        })
        it('it failed to refund when it is not claimed', async function () {
            const {crowdFund, user1, duration, oneday} = await loadFixture(deployFixture)
            const latest = await time.latest()
            await crowdFund.connect(user1).contribute({value: 3000})
            await time.setNextBlockTimestamp(latest + duration * oneday)
            await expect(crowdFund.connect(user1).refund()).to.be.revertedWith('not claimed')
        })
        it('it failed to refund when it is successful', async function () {
            const {crowdFund, user1, duration, oneday, owner} = await loadFixture(deployFixture)
            const latest = await time.latest()
            await crowdFund.connect(user1).contribute({value: 6000})
            await time.setNextBlockTimestamp(latest + duration * oneday)
            await crowdFund.connect(owner).claim()
            await expect(crowdFund.connect(user1).refund()).to.be.revertedWith('success')
        })
        it('it refunded successfully', async function () {
            const {crowdFund, user1, duration, oneday, owner} = await loadFixture(deployFixture)
            const latest = await time.latest()
            await crowdFund.connect(user1).contribute({value: 3000})
            await time.setNextBlockTimestamp(latest + duration * oneday)
            await crowdFund.connect(owner).claim()
            await expect(crowdFund.connect(user1).refund()).to.emit(crowdFund, 'Refund').withArgs(user1.getAddress(), 3000)
        })
    })
})