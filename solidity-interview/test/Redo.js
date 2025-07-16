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
        it('deposit & withdraw', async function () {
            const {redo, Bob, Alice} = await loadFixture(deployRedoFixture)
            await redo.connect(Bob).deposit({value: 1000})
            await redo.connect(Alice).deposit({value: 2000})
            await expect(redo.connect(Bob).withdraw()).to.emit(redo, 'Withdraw').withArgs(Bob.getAddress(), 1000)
        })
    })
    
})




