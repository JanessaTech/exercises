const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin.getAddress())
        return {redo, admin, Bob}
    }

    describe('init', function () {
        it('init', async function () {
            const {redo, admin} = await loadFixture(deployRedoFixture)
            const balance1 = await redo.balanceOf(admin.getAddress(), 1)
            const balance2 = await redo.balanceOf(admin.getAddress(), 2)
            const balance3 = await redo.balanceOf(admin.getAddress(), 3)
            expect(balance1).to.be.equal(1000)
            expect(balance2).to.be.equal(1000)
            expect(balance3).to.be.equal(1000)
        })
    })
    describe('batchMint', function () {
        it('batchMint', async function () {
            const {redo, admin, Bob} = await loadFixture(deployRedoFixture)
            const ids = [1, 3]
            const values = [300, 200]
            await redo.batchMint(Bob.getAddress(), ids, values, '0x123456')
            const balance1Bob = await redo.balanceOf(Bob.getAddress(), 1)
            const balance2Bob = await redo.balanceOf(Bob.getAddress(), 2)
            const balance3Bob = await redo.balanceOf(Bob.getAddress(), 3)

            expect(balance1Bob).to.be.equal(300) 
            expect(balance2Bob).to.be.equal(0) 
            expect(balance3Bob).to.be.equal(200) 
         })
    })
    describe('batchTransfer', function () {
        it('batchTransfer', async function () {
            const {redo, admin, Bob} = await loadFixture(deployRedoFixture)
            const recipients = [Bob.getAddress()]
            const id = 1
            const amount = 300
            await redo.batchTransfer(recipients, id, amount)
            const balance1Bob = await redo.balanceOf(Bob.getAddress(), 1)
            const balance1Admin = await redo.balanceOf(admin.getAddress(), 1)
            expect(balance1Bob + balance1Admin).to.be.equal(1000)

        })
    })
})




