const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('BuyToken', function () {
    async function deployBuyTokenFixture() {
        const [tokenDeployer, Alice, Bob, ...others] = await ethers.getSigners()
        const Token = await ethers.getContractFactory('MyERC20', tokenDeployer)
        const tokenName = 'MyToken'
        const tokenSymbol = 'Mysymbol'
        const token = await Token.deploy(tokenName, tokenSymbol)

        const quantity = 2000
        const price = 1000
        await token.transfer(Alice.address, quantity)
        const ONE_DAY_IN_SECS = 60 * 60 * 24 * 1

        const BuyToken = await ethers.getContractFactory('BuyToken', Alice)
        const buyToken = await BuyToken.deploy(token, price, quantity)
        await token.connect(Alice).transfer(buyToken.getAddress(), quantity)

        return {buyToken, token, Alice, Bob, quantity, price, ONE_DAY_IN_SECS}
    }

    describe('init', function () {
        it('init', async function () {
            const {buyToken, token, quantity, Alice} = await loadFixture(deployBuyTokenFixture)
            const balanceContract = await token.balanceOf(buyToken.getAddress())
            const balanceAlice = await token.balanceOf(Alice.address)

            expect(balanceContract).to.be.equal(quantity)
            expect(balanceAlice).to.be.equal(0)
        })
    })

    describe('buy', function () {
        it('Bob fails to buy when eth is not enough', async function () {
            const {buyToken, Bob} = await loadFixture(deployBuyTokenFixture)
            const amount = 500
            await expect(buyToken.connect(Bob).buy({value: amount})).to.be.revertedWith('Not enough eth')
        })
        it('Bob buys the token successfully', async function () {
            const {buyToken, token, Bob, price, quantity} = await loadFixture(deployBuyTokenFixture)
            const amount = 1500
            await buyToken.connect(Bob).buy({value: amount})

            const contractBalance = await buyToken.getBalance()
            const balanceTokenBob = await token.balanceOf(Bob.address)

            expect(contractBalance).to.be.equal(price)
            expect(balanceTokenBob).to.be.equal(quantity)
        })
    })

    describe('refund', function () {
        it('it fails to refund when it is not expired', async function () {
            const {buyToken, Bob} = await loadFixture(deployBuyTokenFixture)
            const amount = 1500
            await buyToken.connect(Bob).buy({value: amount})

            await expect(buyToken.refund()).to.be.revertedWith('Not expired')
        })
        it('it fails to refund when it is not owner', async function () {
            const {buyToken, Bob, ONE_DAY_IN_SECS} = await loadFixture(deployBuyTokenFixture)
            const amount = 1500
            await buyToken.connect(Bob).buy({value: amount})
            const latest = await time.latest()
            await time.increaseTo(latest + ONE_DAY_IN_SECS)
            
            await expect(buyToken.connect(Bob).refund()).to.be.revertedWith('Not owner')   
        })
        it('it refund when no buy', async function () {
            const {buyToken, token, Alice, Bob, ONE_DAY_IN_SECS, quantity} = await loadFixture(deployBuyTokenFixture)
            const latest = await time.latest()
            await time.increaseTo(latest + ONE_DAY_IN_SECS)
            await expect(buyToken.refund()).to.emit(buyToken, 'Refund')

            const balanceAlice = await token.balanceOf(Alice.address)
            expect(balanceAlice).to.be.equal(quantity)
        })
        it('it refund nothing when buy happend and it is expired', async function () {
            const {buyToken, Bob, ONE_DAY_IN_SECS} = await loadFixture(deployBuyTokenFixture)
            const amount = 1500
            await buyToken.connect(Bob).buy({value: amount})
            const latest = await time.latest()
            await time.increaseTo(latest + ONE_DAY_IN_SECS)
            
            await expect(buyToken.refund()).to.emit(buyToken, 'NoFund')

        })
    })
})