const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo}
    }
    describe('sumArray', function () {
        it('sumArray', async function () {
           const {redo} = await loadFixture(deployRedoFixture)
           const sum = await redo.sumArray([1, 2, 3, 4])
           expect(sum).to.be.equal(10)
        })
    })
    
})




