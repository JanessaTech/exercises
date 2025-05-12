const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, Alice, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin)
        return {redo, admin, Bob, Alice}
    }
    describe('mintBatch', function () {
        it('mintBatch', async function () {
            const {redo, admin, Bob} = await loadFixture(deployRedoFixture)
            const ids = [1, 2]
            const values = [100, 200]
            await redo.connect(admin).mintBatch(Bob.getAddress(), ids, values, '0x112233')
            const balance1 = await redo.balanceOf(Bob.getAddress(), 1)
            expect(balance1).to.be.equal(100)
            const balance2 = await redo.balanceOf(Bob.getAddress(), 2)
            expect(balance2).to.be.equal(200)
        })
    })
    describe('batchTransfer', function () {
        it('batchTransfer', async function () {
            const {redo, admin, Bob, Alice} = await loadFixture(deployRedoFixture)
            const ids = [1, 2]
            const values = [1000, 2000]
            await redo.connect(admin).mintBatch(Bob.getAddress(), ids, values, '0x112233')
            const recipients = [await Alice.getAddress()]
            await redo.connect(Bob).batchTransfer(recipients, 2, 300)
            const balance2_Bob = await redo.balanceOf(Bob.getAddress(), 2)
            const balance2_Alice = await redo.balanceOf(Alice.getAddress(), 2)
            expect(balance2_Bob).to.be.equal(1700)
            expect(balance2_Alice).to.be.equal(300)
        })
    })
})




