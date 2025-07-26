const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, bob, alice, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo', admin)
        const redo = await Redo.deploy(admin)
        return {redo, admin, bob, alice}

    }
    describe('batchMint', function () {
        it('batchMint', async function () {
            const {redo, bob} = await loadFixture(deployRedoFixture)
            const ids = [1, 2]
            const values = [100, 200]
            await redo.batchMint(bob.getAddress(), ids, values, '0x123456')
            const balance1 = await redo.balanceOf(bob.getAddress(), 1)
            const balance2 = await redo.balanceOf(bob.getAddress(), 2)
            expect(balance1).to.be.equal(100)
            expect(balance2).to.be.equal(200)
        })
    })
    describe('batchTransfer', function () {
        it('batchTransfer', async function () {
            const {redo, admin, bob, alice} = await loadFixture(deployRedoFixture)
            const recepients = [await bob.getAddress(), await alice.getAddress()]
            const id = 1
            const amount = 200
            await redo.batchTransfer(recepients, id, amount)
            const left = await redo.balanceOf(admin.getAddress(), 1)
            expect(left).to.be.equal(600)

        })
    })
    
})




