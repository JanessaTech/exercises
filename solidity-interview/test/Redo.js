const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { extendProvider } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [deployer1, deployer2, deployer3, Alice, Bob, nonOwner, ...others] = await ethers.getSigners()
        const Token1 = await ethers.getContractFactory('MyERC20', deployer1)
        const token1Name = 'token1Name'
        const token1Symbol = 'token1Symbol'
        const token1 = await Token1.deploy(token1Name, token1Symbol)
        const aliceAmount = 1000
        await token1.transfer(Alice.address, aliceAmount)

        const Token2 = await ethers.getContractFactory('MyERC20', deployer2)
        const token2Name = 'token2Name'
        const token2Symbol = 'token2Symbol'
        const token2 = await Token2.deploy(token2Name, token2Symbol)
        const bobAmount = 500
        await token2.transfer(Bob.address, bobAmount)

        const Redo = await ethers.getContractFactory('Redo', deployer3)
        const redo = await Redo.deploy(token1.getAddress(), Alice.address, token2.getAddress(), Bob.address)

        await token1.connect(Alice).approve(redo.getAddress(), aliceAmount)
        await token2.connect(Bob).approve(redo.getAddress(), bobAmount)

        return {redo, token1, token2, Alice, Bob, aliceAmount, bobAmount, nonOwner}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo, token1, token2, Alice, Bob, aliceAmount, bobAmount} = await loadFixture(deployRedoFixture)
            const balanceAlice = await token1.balanceOf(Alice.address)
            const balanceBob = await token2.balanceOf(Bob.address)
            const allowanceAlice = await token1.allowance(Alice.address, redo.getAddress())
            const allowanceBob = await token2.allowance(Bob.address, redo.getAddress())

            expect(balanceAlice).to.be.equal(aliceAmount)
            expect(balanceBob).to.be.equal(bobAmount)
            expect(allowanceAlice).to.be.equal(aliceAmount)
            expect(allowanceBob).to.be.equal(bobAmount)
        })
    })

    describe('swap', function () {
        it('It should fail to swap when it is not owner', async function () {
            const {redo, nonOwner} = await loadFixture(deployRedoFixture)
            const amount1 = 2000, amount2 = 1000
            await expect(redo.connect(nonOwner).swap(amount1, amount2)).to.be.revertedWith('Not owner')
        })
        it('it should fail to swap when amount1 is greater than the allowance in token1', async function () {
            const {redo, Alice} = await loadFixture(deployRedoFixture)
            const amount1 = 2000, amount2 = 1000
            await expect(redo.connect(Alice).swap(amount1, amount2)).to.be.revertedWith('allowance in token1 is too low')
        })
        it('it should fail to swap when amount2 is greater than the allowance in token2', async function () {
            const {redo, Alice} = await loadFixture(deployRedoFixture)
            const amount1 = 800, amount2 = 600
            await expect(redo.connect(Alice).swap(amount1, amount2)).to.be.revertedWith('allowance in token2 is too low')
        })
        it('It should swap successfully', async function () {
            const {redo, Alice, Bob, token1, token2, aliceAmount, bobAmount} = await loadFixture(deployRedoFixture)
            const amount1 = 800, amount2 = 400
            await redo.connect(Alice).swap(amount1, amount2)

            const leftAmountAliceInToken1 = await token1.balanceOf(Alice.address)
            const leftAmountBobInToken2 = await token2.balanceOf(Bob.address)
            const newAmountBobIntoken1 = await token1.balanceOf(Bob.address)
            const newAmountAliceInToken2 = await token2.balanceOf(Alice.address)

            expect(leftAmountAliceInToken1).to.be.equal(aliceAmount - amount1)
            expect(leftAmountBobInToken2).to.be.equal(bobAmount - amount2)
            expect(newAmountBobIntoken1).to.be.equal(amount1)
            expect(newAmountAliceInToken2).to.be.equal(amount2)
        })
    })
})