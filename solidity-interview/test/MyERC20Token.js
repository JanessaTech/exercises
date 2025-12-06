const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");

describe('MyERC20Token', function () {
    async function deployFixture() {
        const [minter,non_minter, bob, alice, ...others] = await ethers.getSigners()
        const MyERC20Token = await ethers.getContractFactory('MyERC20Token')
        const erc20 = await MyERC20Token.deploy('MyERC20Token', 'MyERC20Token', 3)
        return {erc20, minter, non_minter, bob, alice}
    }

    describe('init', function () {
        it('init', async function () {
            const {erc20, admin} = await loadFixture(deployFixture)
        })
    })
    describe('mint', function () {
        it('it failed to mint when it is not minter', async function () {
            const {erc20, non_minter, bob} = await loadFixture(deployFixture)
            await expect(erc20.connect(non_minter).mint(bob.getAddress(), 1000)).to.be.revertedWith('not minter')
        })
        it('it failed to mint when to is zero address', async function () {
            const {erc20, minter} = await loadFixture(deployFixture)
            await expect(erc20.connect(minter).mint(ethers.ZeroAddress, 1000)).to.be.revertedWith('to is zero address')
        })
        
        it('it minted successfully', async function () {
            const {erc20, minter, bob} = await loadFixture(deployFixture)
            await expect(erc20.connect(minter).mint(bob.getAddress(), 1000)).to.emit(erc20, 'Transfer').withArgs(ethers.ZeroAddress, bob.getAddress(), 1000)
        })
    })
    describe('transfer', function() {
        it('it failed to transfer when to is zero address', async function () {
            const {erc20, bob} = await loadFixture(deployFixture)
            await expect(erc20.connect(bob).transfer(ethers.ZeroAddress, 1000)).to.be.revertedWith('to is zero address')
        })
        it('it failed to tranfer when no enough balance', async function () {
            const {erc20, bob, alice} = await loadFixture(deployFixture)
            await expect(erc20.connect(bob).transfer(alice.getAddress(), 1000)).to.be.revertedWith('not enough balance')
        })
        it('it transfered successfully', async function () {
            const {erc20, bob, alice, minter} = await loadFixture(deployFixture)
            await erc20.connect(minter).mint(bob.getAddress(), 2000)
            await expect(erc20.connect(bob).transfer(alice.getAddress(), 1000)).to.emit(erc20, 'Transfer').withArgs(bob.getAddress(), alice.getAddress(), 1000)
        })
    })
    describe('transferFrom', function () {
        it('it failed to execute transferFrom when from is zero address', async function () {
            const {erc20, bob, alice} = await loadFixture(deployFixture)
            await expect(erc20.connect(bob).transferFrom(ethers.ZeroAddress,alice.getAddress(), 1000)).to.be.revertedWith('from is zero address')
        })
        it('it failed to execute transferFrom when to is zero address', async function () {
            const {erc20, bob, alice} = await loadFixture(deployFixture)
            await expect(erc20.connect(bob).transferFrom(bob.getAddress(), ethers.ZeroAddress, 1000)).to.be.revertedWith('to is zero address')
        })
        it('it failed to execute transferFrom when no enough balance', async function () {
            const {erc20, bob, alice} = await loadFixture(deployFixture)
            await expect(erc20.transferFrom(bob.getAddress(), alice.getAddress(), 1000)).to.be.revertedWith('not enough balance')
        })
        it('it failed to execute transferFrom when no enough allowance', async function () {
            const {erc20, bob, alice, minter} = await loadFixture(deployFixture)
            await erc20.connect(minter).mint(bob.getAddress(), 2000)
            await expect(erc20.transferFrom(bob.getAddress(), alice.getAddress(), 1000)).to.be.revertedWith('not enough allowance')
        })
        it('it executed transferFrom successfully', async function () {
            const {erc20, bob, alice, minter} = await loadFixture(deployFixture)
            await erc20.connect(minter).mint(bob.getAddress(), 2000)
            await erc20.connect(bob).approve(minter.getAddress(), 2000)
            await expect(erc20.transferFrom(bob.getAddress(), alice.getAddress(), 1000)).to.emit(erc20, 'Transfer').withArgs(bob.getAddress(), alice.getAddress(), 1000)
        })
    })
})