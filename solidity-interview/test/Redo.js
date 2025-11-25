const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
   async function deployRedoFxiture() {
    const Redo = await ethers.getContractFactory('Redo')
    const redo = await Redo.deploy()
    return {redo}
   }

   describe('sumArray', function () {
    it('sumArray', async function () {
        const {redo} = await loadFixture(deployRedoFxiture)
        const res = await redo.sumArray([1, 2, 3, 4])
        expect(res).to.be.equal(10)
    })
   })

   
})




