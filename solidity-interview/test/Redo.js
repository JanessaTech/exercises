const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
   async function deployRedoFixture() {
    const [admin, bob, ...others] = await ethers.getSigners()
    const Redo = await ethers.getContractFactory('Redo') 
    const redo = await Redo.deploy()
    return {redo, bob}
   }

   describe('withdraw', function () {
    it('withdraw', async function () {
        const {redo, bob} = await loadFixture(deployRedoFixture)
        await redo.connect(bob).deposit({value: 1000})
        await expect(redo.connect(bob).withdraw()).to.emit(redo, 'Withdraw').withArgs(bob.getAddress(), 1000)
    })
   })
})




