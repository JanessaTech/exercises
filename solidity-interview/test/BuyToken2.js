const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('BuyToken2', function () {
    async function deployBuyToken2Fixture() {
        const [deployer1, deployer2, Bob, Alice, ...others] = await ethers.getSigners()
        const ERC20 = await ethers.getContractFactory('MyERC20', deployer1)
        const name = 'MyERC20'
        const symbol = 'MyERC20'
        const erc20 = await ERC20.deploy(name, symbol)
        const price = 10
        const quantity = 1000
        await erc20.transfer(Bob.getAddress(), quantity)
        const BuyToken2 = await ethers.getContractFactory('BuyToken2', deployer2)
        const buyToken = await BuyToken2.deploy(erc20.getAddress(), price, quantity, Bob.getAddress())
        await erc20.connect(Bob).approve(buyToken, quantity);

        return {buyToken, erc20, price, quantity, Bob, Alice}
    }

    describe('init', function () {
        it('init', async function () {
            const {buyToken, erc20, Bob, quantity} = await loadFixture(deployBuyToken2Fixture)
            const balance = await erc20.balanceOf(Bob.getAddress())
            const allowance = await erc20.allowance(Bob.getAddress(), buyToken.getAddress())
            expect(balance).to.be.equal(quantity)
            expect(allowance).to.be.equal(quantity)
        })
    })

    describe('buy', function () {
        it('it failed to buy when the eth is not enough', async function () {
            const {buyToken, Alice} = await loadFixture(deployBuyToken2Fixture)
            const amount = 50 // the price is 10,  the alice should pay 100
            const _quantity = 10
            await expect(buyToken.connect(Alice).buy(_quantity, {value: amount})).to.be.revertedWith('not enough eth')
        })
        it('it failed to buy when the quantity exceeds the max allowance', async function () {
            const {buyToken, Alice, price} = await loadFixture(deployBuyToken2Fixture)
            const _quantity = 1001
            const amount = _quantity * price
            await expect(buyToken.connect(Alice).buy(_quantity, {value: amount})).to.be.revertedWith('not enough allowance')
        })
        it('it bought the token successfully', async function () {
            const {buyToken, Bob, Alice, price, erc20, quantity} = await loadFixture(deployBuyToken2Fixture)
            const _quantity = 20
            const amount = _quantity * price
            await buyToken.connect(Alice).buy(_quantity, {value: amount})
            const balanceAlice = await erc20.balanceOf(Alice.getAddress())
            const balanceBob = await erc20.balanceOf(Bob.getAddress())
            const allowance = await erc20.allowance(Bob.getAddress(), buyToken.getAddress())

            expect(balanceAlice).to.be.equal(_quantity)
            expect(balanceBob).to.be.equal(quantity - _quantity)
            expect(allowance).to.be.equal(quantity - _quantity)
        })
    })
})