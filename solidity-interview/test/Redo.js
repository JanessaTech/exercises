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
    describe('arraySum', function () {
        it('arraySum', async function () {
            const {redo, Bob, Alice} = await loadFixture(deployRedoFixture)
            const res = await redo.arraySum([1, 2, 3])
            expect(res).to.be.equal(6)
        })
    })
    
})




