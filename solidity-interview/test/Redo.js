const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, Alice, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin.getAddress())
        return {redo, admin, Bob, Alice}
    }
    describe('mintBatch', function () {
        it('it mintBatch successfully', async function () {
            const {redo, Bob} = await loadFixture(deployRedoFixture)
            const ids = [1, 2], values = [200, 300]
            await redo.mintBatch(Bob.getAddress(), ids, values, '0x123456')
            const balance1 = await redo.balanceOf(Bob.getAddress(), 1)
            const balance2 = await redo.balanceOf(Bob.getAddress(), 2)
            expect(balance1).to.be.equal(200)
            expect(balance2).to.be.equal(300)
        })
    })
    describe('transferBatch', function () {
        it('it transferBatched successfully', async function () {
            const {redo, Bob, Alice} = await loadFixture(deployRedoFixture)
            const recipients = [await Bob.getAddress(), await Alice.getAddress()]
            const id = 1
            const amount = 300
            await redo.transferBatch(recipients, id, 300)
            const balanceBob = await redo.balanceOf(Bob.getAddress(), 1)
            const balanceAlice = await redo.balanceOf(Alice.getAddress(), 1)
            expect(balanceBob).to.be.equal(300)
            expect(balanceAlice).to.be.equal(300)
        })
    })
})




