const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, ...others] = await ethers.getSigners()
        const Bank = await ethers.getContractFactory('Redo')
        const bank = await Bank.deploy()
        return {bank, Bob}
    }
    describe('deposit & withdraw', function () {
        it('deposit', async function () {
            const {bank, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(bank.connect(Bob).deposit({value: amount})).to.emit(bank, 'Deposit').withArgs(Bob.getAddress(), amount)
        })
        it('withdraw', async function () {
            const {bank, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await bank.connect(Bob).deposit({value: amount})
            await expect(bank.connect(Bob).withdraw()).to.emit(bank, 'Withdraw').withArgs(Bob.getAddress(), amount)
        })
    })
    
})




