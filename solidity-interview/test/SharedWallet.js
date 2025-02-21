const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('SharedWallet', function () {
    async function deploySharedWalletFixture() {
        const [curOwner, ownerA, ownerB, nonOwner] = await ethers.getSigners()
        const SharedWallet = await ethers.getContractFactory('SharedWallet')
        const sharedWallet = await SharedWallet.deploy()
        return {sharedWallet, curOwner, ownerA, ownerB, nonOwner}
    }

    describe('Operations about owners', function () {
        it('init', async function () {
           const {sharedWallet} = await loadFixture(deploySharedWalletFixture)
        })

        it('Add owner successfully', async function () {
            const {sharedWallet, ownerA} = await loadFixture(deploySharedWalletFixture)
            await sharedWallet.addOwner(ownerA.address)
            const isOwner = await sharedWallet.isValidOwner(ownerA.address)

            expect(isOwner).to.be.equal(true)
        })
        it('It should fail to add owner when it is not owner', async function () {
            const {sharedWallet, ownerA, ownerB, nonOwner} = await loadFixture(deploySharedWalletFixture)
            await sharedWallet.addOwner(ownerA.address)
            await expect(sharedWallet.connect(nonOwner).addOwner(ownerB.address)).to.be.revertedWith('Not owner')
        })
        it('It removed an owner successfully', async function () {
            const {sharedWallet, ownerA} = await loadFixture(deploySharedWalletFixture)
            await sharedWallet.addOwner(ownerA)
            await sharedWallet.removeOwner(ownerA.address)

            const isOwner = await sharedWallet.isValidOwner(ownerA.address)
            expect(isOwner).to.be.equal(false)
        })
    })

    describe('deposit/withdraw', function () {
        it('Deposit successfuuly', async function () {
            const {sharedWallet, nonOwner} = await loadFixture(deploySharedWalletFixture)
            const amount = 1000
            await expect(sharedWallet.connect(nonOwner).deposit({value: amount})).to.emit(sharedWallet, 'Deposit')

            const balance = await sharedWallet.getBalance()
            expect(balance).to.be.equal(amount)
        })
        it('It should fail to withdraw when there is not enough eth', async function () {
            const {sharedWallet, nonOwner} = await loadFixture(deploySharedWalletFixture)
            const amount = 1000
            await sharedWallet.connect(nonOwner).deposit({value: amount})
            await expect(sharedWallet.withdraw(2000)).to.be.revertedWith('Not enough eth')
        })
        it('it should fail to withdraw when it is not owner', async function () {
            const {sharedWallet, nonOwner} = await loadFixture(deploySharedWalletFixture)
            const amount = 1000
            await sharedWallet.connect(nonOwner).deposit({value: amount})
            await expect(sharedWallet.connect(nonOwner).withdraw(1000)).to.be.revertedWith('Not owner')
        })
        it('it should withdraw successfully', async function () {
            const {sharedWallet, nonOwner} = await loadFixture(deploySharedWalletFixture)
            const amount = 1000
            const withdrawAmount = 500
            await sharedWallet.connect(nonOwner).deposit({value: amount})
            await expect(sharedWallet.withdraw(withdrawAmount)).to.emit(sharedWallet, 'WithDraw').withArgs(anyValue, withdrawAmount)
        })
        
    })
})