const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('MyERC20', function () {
    async function deployMyERC20Fixture() {
        const [account1, account2, account3,...others] = await ethers.getSigners()
        const MyERC20 = await ethers.getContractFactory('MyERC20', account1)
        const name = 'testERC20'
        const symbol = 'TEST'
        const erc20 = await MyERC20.deploy(name, symbol)
        return {erc20, account1, account2, account3, name, symbol}
    }

    describe('get basic info', function () {
        it('get basic info', async function () {
            const {erc20, name, symbol, account1} = await loadFixture(deployMyERC20Fixture)
            const _name = await erc20.name()
            const _symbol = await erc20.symbol()
            const balance = await erc20.balanceOf(account1.address)

            expect(_name).to.be.equal(name)
            expect(_symbol).to.be.equal(symbol)
            expect(balance).to.be.equal(100000000000000000000n)
        })
    })

    describe('transfer', function () {
        it('It should transfer successfully', async function () {
            const {erc20, account2} = await loadFixture(deployMyERC20Fixture)
            const beforeTransfer = await erc20.balanceOf(account2.address)
            await erc20.transfer(account2.address, 1000)
            const afterTransfer = await erc20.balanceOf(account2.address)

            expect(beforeTransfer).to.be.equal(0)
            expect(afterTransfer).to.be.equal(1000)
        })
        it('It fails to transfer when not enough balance', async function () {
            const {erc20, account2, account3} = await loadFixture(deployMyERC20Fixture)
            const beforeTransfer = await erc20.balanceOf(account3.address)
            await expect(erc20.connect(account3).transfer(account2.address, 1000)).to.be.revertedWithCustomError(erc20, 'ERC20InsufficientBalance')
            expect(beforeTransfer).to.be.equal(0)
        })
    })

    describe('transferFrom', function () {
        it('It should transferFrom successfully', async function () {
            const {erc20, account1, account2, account3} = await loadFixture(deployMyERC20Fixture)
            await erc20.approve(account2.address, 1000)
            await erc20.connect(account2).transferFrom(account1.address, account3.address, 700)

            const balance = await erc20.balanceOf(account3.address)
            const allowance = await erc20.allowance(account1.address, account2.address)
            expect(balance).to.be.equal(700)
            expect(allowance).to.be.equal(300)
        })
    })
})