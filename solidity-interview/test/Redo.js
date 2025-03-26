const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe('Redo', function () {
    async function deployRedoFixture() {
        const [deployer1, deployer2, Bob, Alice, ...others] = await ethers.getSigners()
        const MyERC20 = await ethers.getContractFactory('MyERC20', deployer1)
        const name = 'MyERC20'
        const symbol = 'MyERC20'
        const erc20 = await MyERC20.deploy(name, symbol)
        const price = 10
        const quantity = 1000
        await erc20.transfer(Bob.getAddress(), quantity)

        const Redo = await ethers.getContractFactory('Redo', deployer2)
        const redo = await Redo.deploy(erc20.getAddress(), price, quantity, Bob.getAddress())

        await erc20.connect(Bob).approve(redo.getAddress(), quantity)
        return {redo, erc20, price, quantity, Bob, Alice}
    }

    describe('init', function () {
        it('init', async function () {
            const {redo, erc20, Bob, quantity} = await loadFixture(deployRedoFixture)
            const balance = await erc20.balanceOf(Bob.getAddress())
            const allowance = await erc20.allowance(Bob.getAddress(), redo.getAddress())

            expect(balance).to.be.equal(quantity)
            expect(allowance).to.be.equal(quantity)
        })
    })
    describe('buy', function() {
        it('it failed to buy when the eth is not enough', async function () {
            const {redo, Alice, price} = await loadFixture(deployRedoFixture)
            const quality = 10
            const amount = 50
            await expect(redo.connect(Alice).buy(quality, {value: amount})).to.be.revertedWith('not enough eth')
        })
        it('it failed to buy when the allowance is not enough', async function () {
            const {redo, price, Alice} = await loadFixture(deployRedoFixture)
            const quantity = 1001
            const amount = quantity * price
            await expect(redo.connect(Alice).buy(quantity, {value: amount})).to.be.revertedWith('not enough allowance')

        })
        it('it bought the token successfully', async function () {
            const {redo, Alice, Bob, quantity, price, erc20} = await loadFixture(deployRedoFixture)
            const _quantity = 20
            const amount = _quantity * price
            await redo.connect(Alice).buy(_quantity, {value: amount})
            const balanceAlice = await erc20.balanceOf(Alice.getAddress())
            const balanceBob = await erc20.balanceOf(Bob.getAddress())
            const allowance = await erc20.allowance(Bob.getAddress(), redo.getAddress())

            expect(balanceAlice).to.be.equal(_quantity)
            expect(balanceBob).to.be.equal(quantity - _quantity)
            expect(allowance).to.be.equal(quantity - _quantity)
        })
    })
})




