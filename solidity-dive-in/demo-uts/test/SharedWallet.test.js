const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { ethers } = require("hardhat")
const {expect} = require('chai')
const exp = require("constants")

describe('SharedWallet', function () {
    async function sharedWalletFixture() {
        const signers = await ethers.getSigners()
        const SharedWallet = (await ethers.getContractFactory('SharedWallet')).connect(signers[0])
        const sharedWallet = await SharedWallet.deploy()
        await sharedWallet.waitForDeployment()
        return {sharedWallet, signers}
    }

    describe('deployment', function () {
        it('init', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            const ownerSize = await sharedWallet.getOwnersSize()
            expect(ownerSize).to.equal(1)
            console.log('siginers size:', signers.length)
        })
    })
    describe('addOwner', function () {
        it('Should fail if add address(0)', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.addOwner(ethers.ZeroAddress)).to.be.revertedWith('Invalid address')
        })
        it('Should fail if try to add itself', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.addOwner(signers[0])).to.be.revertedWith('You can not add youself as a new owner')
        })
        it('Should fail if you are operating by not owner', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.connect(signers[1]).addOwner(signers[2])).to.be.revertedWith('You are not owner')
        })
    })
    describe('removeOwner', function () {
        it('Should fail if remove invalid address', async function () {
            const {sharedWallet} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.removeOwner(ethers.ZeroAddress)).to.be.revertedWith('Invalid address')
        })
        it('Should fail if you are operating by not owner', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.connect(signers[1]).removeOwner(signers[2])).to.be.revertedWith('You are not owner')
        })
        it('Should fail when there is only one owner left', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.removeOwner(signers[0])).to.be.revertedWith('There is only one owner left')
        })
        it('Should fail when try to delete an invalid owner', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await sharedWallet.addOwner(signers[1])
            await expect(sharedWallet.removeOwner(signers[2])).to.be.revertedWith('The address to be removed is not an owner')
        })
        it('Should fail when there is only one owner left after added some owners', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await sharedWallet.addOwner(signers[1])
            await sharedWallet.connect(signers[1]).removeOwner(signers[0])
            await expect(sharedWallet.connect(signers[1]).removeOwner(signers[1])).to.be.revertedWith('There is only one owner left')
        })
    })
    describe('getBalance', function () {
        it('Should get the correct balance', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)

            await expect(() => signers[0].sendTransaction({
                to: sharedWallet.getAddress(),
                value: 1000})
            ).to.changeEtherBalance(signers[0], "-1000")
        })
    })
    describe('withdraw', function () {
        it('Should fail when the sender is not the owner', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.connect(signers[1]).withdraw(1000)).to.be.rejectedWith('You are not owner')
        })
        it('Should fail when withdraw with not enough eth under sharedWallet', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.withdraw(1000)).to.be.revertedWith('not enough balance')
        })
        it('Should succeed when withdraw with enough eth under sharedWallet', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await signers[0].sendTransaction({to: sharedWallet.getAddress(), value: 1000})
            await signers[1].sendTransaction({to: sharedWallet.getAddress(), value:1000})
            await sharedWallet.withdraw(1500)
            const amount = await sharedWallet.getBalance()
            expect(amount).to.equal(500)
        })
    })
    describe('transfer', function () {
        it('Should fail when the sender is not the owner', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.connect(signers[1]).transfer(signers[0].address, 1000)).to.be.revertedWith('You are not owner')
        })
        it('Should fail when the to is invalid address', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.transfer(ethers.ZeroAddress, 1000)).to.be.revertedWith('Invalid address')
        })
        it('Should fail when there is not enough eth under sharedWallet to be transferred', async function () {
            const {sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await expect(sharedWallet.transfer(signers[1], 1000)).to.be.revertedWith('not enough balance')
        })
        it('Should succeed when there is enough eth under sharedWallet to be transferred', async function() {
            const{sharedWallet, signers} = await loadFixture(sharedWalletFixture)
            await signers[0].sendTransaction({to: sharedWallet.getAddress(), value: 2000})
            await sharedWallet.transfer(signers[1], 1000)
            const balance = await sharedWallet.getBalance()

            expect(balance).to.equal(1000)
        })
    })
})