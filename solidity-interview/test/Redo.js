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
    describe('init', function () {
        it('init', async function () {
           const {redo, admin} = await loadFixture(deployRedoFixture)
           const balance_sword = await redo.balanceOf(admin.getAddress(), 1)
           const balance_potion = await redo.balanceOf(admin.getAddress(), 2)
           const balance_sheild = await redo.balanceOf(admin.getAddress(), 3)
           expect(balance_sword).to.be.equal(1000)
           expect(balance_potion).to.be.equal(2000)
           expect(balance_sheild).to.be.equal(3000)
        })
        
    })
    describe('mintBatch', function () {
        it('mintBatch', async function () {
            const {redo, Bob} = await loadFixture(deployRedoFixture)
            const ids = [1, 2]
            const values = [100, 200]
            await redo.mintBatch(Bob.getAddress(), ids, values, '0x123456')
            const balance1 = await redo.balanceOf(Bob.getAddress(), 1)
            const balance2 = await redo.balanceOf(Bob.getAddress(), 2)
            expect(balance1).to.be.equal(100)
            expect(balance2).to.be.equal(200)
        })
    })
    describe('transferBatch', function () {
        it('transferBatch', async function () {
            const {redo, admin, Bob, Alice} = await loadFixture(deployRedoFixture)
            const recipients = [await Bob.getAddress(), await Alice.getAddress()]
            const id = 1, amount  = 100
            await redo.transferBatch(recipients, id, amount)
            const balance_admin = await redo.balanceOf(admin.getAddress(), 1)
            const balance_bob = await redo.balanceOf(Bob.getAddress(), 1)
            const balance_alice = await redo.balanceOf(Alice.getAddress(), 1)
            expect(balance_admin).to.be.equal(800)
            expect(balance_bob).to.be.equal(100)
            expect(balance_alice).to.be.equal(100)
        })
    })
    
})




