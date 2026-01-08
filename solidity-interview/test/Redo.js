const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment, extendProvider } = require("hardhat/config");

describe('Redo', function () {
    async function deployFixture() {
       const [admin , bob, ...others] = await ethers.getSigners()
       const Redo = await ethers.getContractFactory('Redo')
       const redo = await Redo.deploy()
       return {redo, admin , bob}
    }
    describe('deposit & withdraw', function () {
        it('deposit & withdraw', async function () {
           const {redo, bob} = await loadFixture(deployFixture)
           await redo.connect(bob).deposit({value: 1000})

           await expect(redo.connect(bob).withdraw()).to.emit(redo, 'Withdraw').withArgs(bob.getAddress(), 1000)
        })
    })
})


