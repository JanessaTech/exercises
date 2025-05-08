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
    describe('sumArray', function () {
        it('sumArray', async function () {
            const {redo, owner} = await loadFixture(deployRedoFixture)
            const sum = redo.sumArray([1, 2,3])
            expect(sum).to.be.equal(6)
        })
    })
    
})




