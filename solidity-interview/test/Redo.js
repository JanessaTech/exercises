const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment, extendProvider } = require("hardhat/config");

describe('Redo', function () {
    async function deployFixture() {
       const Redo = await ethers.getContractFactory('Redo')
       const redo = await Redo.deploy()
       return {redo}
    }
    describe('sumarray', function () {
        it('sumarray', async function () {
           const {redo} = await loadFixture(deployFixture)
           const res = await redo.sumArray([1, 2, 3])

           expect(res).to.be.equal(6)
        })
    })
})


