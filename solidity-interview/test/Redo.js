const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment, extendProvider } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, bob, alice, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin.getAddress())
        return {redo, admin, bob, alice}
    }
    describe('init', function () {
        it('init', async function () {
           const {redo, admin} = await loadFixture(deployRedoFixture)
           const balance1 = await redo.balanceOf(admin.getAddress(), 1)
           const balance2 = await redo.balanceOf(admin.getAddress(), 2)
           const balance3 = await redo.balanceOf(admin.getAddress(), 3)
           expect(balance1).to.be.equal(1000)
           expect(balance2).to.be.equal(2000)
           expect(balance3).to.be.equal(3000)
        })
    })

    describe('mintBatch', function () {
        it('mintBatch', async function () {
            const {redo, bob} = await loadFixture(deployRedoFixture)
            const ids = [2, 3]
            const values = [200, 300]
            await redo.mintBatch(bob.getAddress(), ids, values, '0x123456')
            const balance2 = await redo.balanceOf(bob.getAddress(), 2)
            const balance3 = await redo.balanceOf(bob.getAddress(), 3)

            expect(balance2).to.be.equal(200)
            expect(balance3).to.be.equal(300)

        })
    })

    describe('transferBatch', function () {
        it('transferBatch', async function () {
            const {redo, bob, alice} = await loadFixture(deployRedoFixture)
            const recipients = [bob.getAddress(), alice.getAddress()]
            const id = 1, amount = 300
            await redo.transferBatch(recipients, id, amount)
            const balanceBob = await redo.balanceOf(bob.getAddress(), 1)
            const balanceAlice = await redo.balanceOf(alice.getAddress(), 1)
            expect(balanceBob).to.be.equal(300)
            expect(balanceAlice).to.be.equal(300)
        })
    })
})


