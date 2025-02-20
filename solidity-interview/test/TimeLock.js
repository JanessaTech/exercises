const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('TimeLock', function () {
    async function deployTimeLockFixture() {
        const [account1, account2, ...others] = await ethers.getSigners()
        const TimeLock = await ethers.getContractFactory('TimeLock')
        const timeLock = await TimeLock.deploy()
        const ONE_DAY_IN_SECS = 60 * 60 * 24 * 1
        const SEVEN_DAY_IN_SECS = 60 * 60 * 24 * 7
        return {timeLock, account1, account2, ONE_DAY_IN_SECS, SEVEN_DAY_IN_SECS}
    }

    describe('all methods', function () {
        it('it should deposit successfully', async function () {
            const {timeLock, account2} = await loadFixture(deployTimeLockFixture);
            const amount = 1000
            await timeLock.connect(account2).deposit({value: amount})
            const balance = await timeLock.connect(account2).getBalance()

            expect(balance).to.be.equal(amount)
        })
        it('It should fail to withdraw when it is not enough balance', async function () {
            const {timeLock} = await loadFixture(deployTimeLockFixture)
            await expect(timeLock.withdraw()).to.be.revertedWith('insufficent balance')

            
        })
        it('It should fail to withdraw when it is within timeLock', async function () {
            const {timeLock, ONE_DAY_IN_SECS} = await loadFixture(deployTimeLockFixture)
            const amount = 1000
            await timeLock.deposit({value: amount})
            const latest = await time.latest()
            await time.increaseTo(latest + ONE_DAY_IN_SECS)

            await expect(timeLock.withdraw()).to.be.revertedWith('not allow')
        })
        it('It should withdraw successfully', async function () {
            const {timeLock, SEVEN_DAY_IN_SECS} = await loadFixture(deployTimeLockFixture)
            const amount = 1000
            await timeLock.deposit({value: amount})
            const latest = await time.latest()
            await time.increaseTo(latest + SEVEN_DAY_IN_SECS)
            await expect(timeLock.withdraw()).not.to.be.reverted

            const balance = await timeLock.getBalance()
            expect(balance).to.be.equal(0)
        })
    })
})