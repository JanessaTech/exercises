const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment, extendProvider } = require("hardhat/config");
const { arrayBuffer } = require("stream/consumers");

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
        it('it failed to mint when it is not minter', async function() {
            const {erc20, non_minter, bob} = await loadFixture(deployFixture)
            await expect(erc20.connect(non_minter).mint(bob.getAddress(), 1000)).to.be.revertedWith('not a minter')
        })
        it('it minted successfully', async function () {
            const {erc20, minter, bob} = await loadFixture(deployFixture)
            await expect(erc20.connect(minter).mint(bob.getAddress(), 1000)).to.emit(erc20, 'Mint').withArgs(minter.getAddress(), bob.getAddress(), 1000)
        })
    })
    describe('transfer', function() {
        it('it faied to transfer when to is zero address', async function () {
            const {erc20} = await loadFixture(deployFixture)
            await expect(erc20.transfer(ethers.ZeroAddress, 1000)).to.be.revertedWith('ERC20: transfer to the zero address')
        })
        it('it failed to transfer when the amount exceeds balance', async function () {
            const {erc20, bob, alice} = await loadFixture(deployFixture)
            await expect(erc20.connect(bob).transfer(alice.getAddress(), 1000)).to.be.revertedWith('ERC20: transfer amount exceeds balance')
        })
        it('it transfered successfully', async function () {
            const {erc20, minter, bob, alice} = await loadFixture(deployFixture)
            await erc20.connect(minter).mint(bob.getAddress(), 3000)
            await expect(erc20.connect(bob).transfer(alice.getAddress(), 1000)).to.emit(erc20, 'Transfer').withArgs(bob.getAddress(), alice.getAddress(), 1000)
        })
    })
    describe('transferFrom', function () {
        it('it failed to transferFrom when from is zero address', async function () {
            const {erc20, bob} = await loadFixture(deployFixture)
            await expect(erc20.transferFrom(ethers.ZeroAddress, bob.getAddress(), 1000)).to.be.revertedWith('ERC20: transfer from the zero address')
        })
        it('it failed to transferFrom when to is zero address', async function () {
            const {erc20, bob} = await loadFixture(deployFixture)
            await expect(erc20.transferFrom(bob.getAddress(), ethers.ZeroAddress, 1000)).to.be.revertedWith('ERC20: transfer to the zero address')
        })
        it('it failed to transferFrom when amount exceeds balance', async function () {
            const {erc20, bob, alice} = await loadFixture(deployFixture)
            await expect(erc20.transferFrom(bob.getAddress(), alice.getAddress(), 1000)).be.be.revertedWith('ERC20: transfer amount exceeds balance')
        })
        it('it failed to transferFrom when amount exceeds allowance', async function () {
            const {erc20, bob, alice, minter} = await loadFixture(deployFixture)
            await erc20.connect(minter).mint(bob.getAddress(), 2000)
            await expect(erc20.transferFrom(bob.getAddress(), alice.getAddress(), 1000)).to.be.revertedWith('ERC20: transfer amount exceeds allowance')
        })
        it('it transferFromed successfully', async function () {
            const {erc20, minter, bob, alice} = await loadFixture(deployFixture)
            await erc20.connect(minter).mint(bob.getAddress(), 2000)
            await erc20.connect(bob).approve(minter.getAddress(), 2000)
            await expect(erc20.transferFrom(bob.getAddress(), alice, 1000)).to.emit(erc20, 'Transfer').withArgs(bob.getAddress(), alice.getAddress(), 1000)
        })
    })
})