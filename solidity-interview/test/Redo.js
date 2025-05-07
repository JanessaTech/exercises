const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [owner, nonOwner, Bob, Alice, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(owner)
        const sword_token = 1, sword_init = 1000
        const potion_token = 2, potion_init= 2000
        const shield_token = 3, shield_init = 3000

        return {redo, owner, Bob, Alice, sword_token, sword_init, potion_token, potion_init, shield_token, shield_init}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo, owner, sword_token, sword_init, potion_token, potion_init, shield_token, shield_init} = await loadFixture(deployRedoFixture)
            const balance_sword = await redo.balanceOf(owner.getAddress(), sword_token)
            const balance_potion = await redo.balanceOf(owner.getAddress(), potion_token)
            const balance_shield = await redo.balanceOf(owner.getAddress(), shield_token)
            expect(balance_sword).to.be.equal(sword_init)
            expect(balance_potion).to.be.equal(potion_init)
            expect(balance_shield).to.be.equal(shield_init)
        })
    })
    describe('batchMint', function () {
        it('batchMint', async function () {
            const {redo, Bob, Alice,sword_token, shield_token} = await loadFixture(deployRedoFixture)
            const ids = [sword_token, shield_token]
            const values = [100, 200]
            await redo.batchMint(Bob.getAddress(), ids, values, '0x1234')
            const balance_sword = await redo.balanceOf(Bob.getAddress(), sword_token)
            const balance_shield = await redo.balanceOf(Bob.getAddress(), shield_token)
            expect(balance_sword).to.be.equal(100)
            expect(balance_shield).to.be.equal(200)
        })
    })
    describe('batchTransfer', function () {
        it('batchTransfer', async function () {
            const {redo, owner, Bob, Alice, sword_token, sword_init} = await loadFixture(deployRedoFixture)
            const recipients = [Bob.getAddress(), Alice.getAddress()]
            const amount = 100
            await redo.batchTransfer(recipients, sword_token, 100)
            const balanceLeft = await redo.balanceOf(owner.getAddress(), sword_token)
            expect(balanceLeft).to.be.equal(sword_init - 2 * amount)
        })
    })
})




