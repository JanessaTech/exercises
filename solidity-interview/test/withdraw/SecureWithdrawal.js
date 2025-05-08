const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('SecureWithdrawal', function () {
    async function deploySecureWithdrawalFixture() {
        const [owner, ...others] = await ethers.getSigners()
        const SecureWithdrawal = await ethers.getContractFactory('SecureWithdrawal')
        const secureWithdrawal = await SecureWithdrawal.deploy()
        return {secureWithdrawal, owner}
    }
    describe('withdraw', function () {
        it('withdraw', async function () {
            const {secureWithdrawal, owner} = await loadFixture(deploySecureWithdrawalFixture)
            const amount = 1000
            await secureWithdrawal.deposit({value: amount})
            await expect(secureWithdrawal.withdraw()).to.emit(secureWithdrawal, 'Withdraw').withArgs(owner.getAddress(), amount)
        })
    })
})