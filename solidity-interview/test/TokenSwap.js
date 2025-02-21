const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('TokenSwap', function () {
    async function deployTokenSwapFixture() {
        const [deployer1, deployer2, deployer3, Alice, Bob, nobody, ...others] = await ethers.getSigners()

        const Token1 = await ethers.getContractFactory('MyERC20', deployer1)
        const token1Name = 'token1'
        const token1Symbol = 'Token1'
        const token1 = await Token1.deploy(token1Name, token1Symbol)
        const aliceAmount = 1000
        await token1.transfer(Alice.address, aliceAmount)

        const Token2 = await ethers.getContractFactory('MyERC20', deployer2)
        const token2Name = 'token2'
        const token2Symbol = 'Token2'
        const token2 = await Token2.deploy(token2Name, token2Symbol)
        const bobAmount = 500
        await token2.transfer(Bob.address, bobAmount)

        const TokenSwap = await ethers.getContractFactory('TokenSwap', deployer3)
        const tokenSwap = await TokenSwap.deploy(token1.getAddress(), Alice.address, token2.getAddress(), Bob.address)

        await token1.connect(Alice).approve(tokenSwap.getAddress(), aliceAmount)
        await token2.connect(Bob).approve(tokenSwap.getAddress(), bobAmount)

        return {tokenSwap, token1, token2, Alice, Bob, aliceAmount, bobAmount}
    }

    describe('init', function () {
        it('init', async function () {
            const {tokenSwap, token1, token2, Alice, Bob, aliceAmount, bobAmount} = await loadFixture(deployTokenSwapFixture)
            const balanceOfAlice = await token1.balanceOf(Alice.address)
            const balanceOfBob = await token2.balanceOf(Bob.address)

            expect(balanceOfAlice).to.be.equal(aliceAmount)
            expect(balanceOfBob).to.be.equal(bobAmount)
        })
    })

    describe('Swap', function () {
        it('It should fail to swap when it is not alice or bob', async function () {
            const {tokenSwap, token1, token2, Alice, Bob, aliceAmount, bobAmount} = await loadFixture(deployTokenSwapFixture)
            const amount1 = 2000
            const amount2 = 1000
            await expect(tokenSwap.swap(amount1, amount2)).to.be.revertedWith('Not Alice or Bob')
        })
        it('It should fail to swap when the amount1 is greater than allowance of token1', async function () {
            const {tokenSwap, token1, token2, Alice, Bob, aliceAmount, bobAmount} = await loadFixture(deployTokenSwapFixture)
            const amount1 = 2000
            const amount2 = 1000
            await expect(tokenSwap.connect(Alice).swap(amount1, amount2)).to.be.revertedWith('token1 allowance is too low')
        })
        it('It should fail to swap when the amount1 is greater than allowance of token1', async function () {
            const {tokenSwap, token1, token2, Alice, Bob, aliceAmount, bobAmount} = await loadFixture(deployTokenSwapFixture)
            const amount1 = 800
            const amount2 = 600
            await expect(tokenSwap.connect(Alice).swap(amount1, amount2)).to.be.revertedWith('token2 allowance is too low')
        })
        it('It should swap successfully', async function () {
            const {tokenSwap, token1, token2, Alice, Bob, aliceAmount, bobAmount} = await loadFixture(deployTokenSwapFixture)
            const amount1 = 800
            const amount2 = 400

            await tokenSwap.connect(Alice).swap(amount1, amount2)

            const leftAmountAliceToken1 = await token1.balanceOf(Alice.address)
            const leftAmountBobToken2 = await token2.balanceOf(Bob.address)
            const amountBobToken1 = await token1.balanceOf(Bob.address)
            const amountAliceToken2 = await token2.balanceOf(Alice.address)

            expect(leftAmountAliceToken1).to.be.equal(aliceAmount - amount1)
            expect(leftAmountBobToken2).to.be.equal(bobAmount - amount2)
            expect(amountBobToken1).to.be.equal(amount1)
            expect(amountAliceToken2).to.be.equal(amount2)
        })
    })

})