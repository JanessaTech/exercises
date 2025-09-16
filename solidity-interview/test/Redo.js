const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [Bob, Alice, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo, Bob, Alice}
    }
    describe('deposit & withdraw', function () {
        it('it failed to withdraw', async function () {
            const {redo, Alice, Bob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(Bob).withdraw()).to.be.revertedWith('no money')
        })
        it('it withdraw successfully', async function () {
            const {redo, Alice} = await loadFixture(deployRedoFixture)
            await redo.connect(Alice).deposit({value: 1000})
            await expect(redo.connect(Alice).withdraw).not.to.be.reverted
        })
    })

    
})




