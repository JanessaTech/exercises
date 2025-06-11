const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admi, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy();
        return {redo, Bob}
    }
    describe('Withdraw', function () {
        it('Withdraw', async function () {
            const {redo, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.connect(Bob).deposit({value: amount})
            await expect(redo.connect(Bob).withdraw()).to.emit(redo, 'Withdraw').withArgs(Bob.getAddress(), amount)
        })
    })
})




