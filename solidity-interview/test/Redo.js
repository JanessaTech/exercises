const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe('Redo', function () {
    async function deployRedoFixture() {
        const [deployer, Bob, Alice, ...others] = await ethers.getSigners()
        const MyERC20 = await ethers.getContractFactory('MyERC20', deployer)
        const name = 'MyERC20'
        const symbol = 'MyERC20'
        const price = 10
        const quantity = 1000
        const erc20 = await MyERC20.deploy(name, symbol)
        await erc20.transfer(Bob.getAddress(), quantity)

        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc20.getAddress(), price, quantity)
        await erc20.connect(Bob).approve(redo.getAddress(), quantity)
        return {redo, erc20, price, quantity, Bob, Alice}
    }

    describe('init', function () {
        it('init', async function () {
            const {redo, erc20, quantity, Bob} = await loadFixture(deployRedoFixture)
            const balance = await erc20.balanceOf(Bob.getAddress())
            const allowance = await erc20.allowance(Bob.getAddress(), redo.getAddress())
            expect(balance).to.be.equal(quantity)
            expect(allowance).to.be.equal(quantity)
        })
    })
    describe('buy', function () {
        it('it failed to buy when not enough eth', async function () {
            const {redo, Alice} = await loadFixture(deployRedoFixture)
            const _quantity = 100
            const amount = 500
            await expect(redo.connect(Alice).buy(_quantity, {value: amount})).to.be.revertedWith('not enough eth')
        })
        it('it failed to buy when not enough allowance', async function () {
            const {redo, Alice} = await loadFixture(deployRedoFixture)
            const _quantity = 1001
            const amount = 10010
            await expect(redo.connect(Alice).buy(_quantity, {value: amount})).to.be.revertedWith('not enough allowance')
        })
        it('it bought token successfully', async function () {
            const {redo, Alice, Bob, quantity, erc20} = await loadFixture(deployRedoFixture)
            const _quantity = 200
            const amount = 2000
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




