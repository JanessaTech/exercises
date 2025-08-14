const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [Admin, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo, Bob}
    }  
    describe('withdraw', function () {
        it('withdraw', async function () {
            const {redo, Bob} = await loadFixture(deployRedoFixture)
            await redo.connect(Bob).deposit({value: 1000})
            await expect(redo.connect(Bob).withdraw()).to.emit(redo, 'Withdraw').withArgs(Bob.getAddress(), 1000)
        })
    })  
    
})




