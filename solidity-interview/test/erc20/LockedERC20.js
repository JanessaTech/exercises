const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('LockedERC20', function () {
    async function deployLockedERC20Fixture() {
        const [owner, Bob, nonOwner, ...others] = await ethers.getSigners()
        const LockedERC20 = await ethers.getContractFactory('LockedERC20', owner)
        const name = 'LockedERC20'
        const symbol = 'LK'
        const lockedERC20 = await LockedERC20.deploy(name, symbol)
        return {lockedERC20, owner, nonOwner, Bob}
    }
    it('It should init successfully', async function () {
        const {lockedERC20, owner} = await loadFixture(deployLockedERC20Fixture)
        const amount = await lockedERC20.balanceOf(owner.address)
        expect(amount).to.be.equal(ethers.parseEther('100'))
    })
    it('it should fail to transfer when it is not transferable', async function () {
        const {lockedERC20, Bob} = await loadFixture(deployLockedERC20Fixture)
        const amount  = 1000
        await expect(lockedERC20.transfer(Bob.address, amount)).to.be.revertedWith('not transferable')
    })
    it('it should fail to set transferable when it is not owner', async function () {
        const {lockedERC20, nonOwner} = await loadFixture(deployLockedERC20Fixture)
        await expect(lockedERC20.connect(nonOwner).setTransferable(true)).to.be.revertedWith('not owner')
    })
    it('it should tranfer to Bob successfully', async function () {
        const {lockedERC20, Bob} = await loadFixture(deployLockedERC20Fixture)
        const amount = 1000
        await lockedERC20.setTransferable(true)
        await expect(lockedERC20.transfer(Bob.address, amount)).to.emit(lockedERC20, 'Transfer')
        const amountBob = await lockedERC20.balanceOf(Bob.address)
        expect(amountBob).to.be.equal(amount)
    })
    
})