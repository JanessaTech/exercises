const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [owner, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo, owner}
    }
    describe('withdraw', function () {
        it('withdraw', async function () {
            const {redo, owner} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.deposit({value: amount})
            await expect(redo.withdraw()).to.emit(redo, 'Withdraw').withArgs(owner.getAddress(), amount)
        })
    })
    
})




