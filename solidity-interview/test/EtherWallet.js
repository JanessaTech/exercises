const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('EtherWallet', function () {
    async function deployEtherWalletFixture() {
        const [account1, account2, ...others] = await ethers.getSigners();
        const EtherWallet = await ethers.getContractFactory('EtherWallet', account2)
        const etherWallet = await EtherWallet.deploy();
        return {etherWallet, account1, account2}
    }

    describe('getOwner', function () {
        it('Check owner', async function () {
            const {etherWallet, account2} = await loadFixture(deployEtherWalletFixture)
            const owner = await etherWallet.getOwner()
            expect(owner).to.equal(account2.address)
        })
    })

    describe('withdraw', function () {
        it('It should get correct balance after some eth is sent', async function () {
            const {etherWallet, account1, account2} = await loadFixture(deployEtherWalletFixture)
            const tx = {
                to: etherWallet.getAddress(),
                value: 3000
            }
            await account1.sendTransaction(tx)
            const balance = await etherWallet.getBalance()
            expect(balance).to.equal(3000)
        })

        it('It should withdraw succesfull when it is owner', async function () {
            const {etherWallet, account1, account2} = await loadFixture(deployEtherWalletFixture)
            const tx = {
                to: etherWallet.getAddress(),
                value: 3000
            }
            await account1.sendTransaction(tx)
            await etherWallet.withdraw(2000)
            const leftBalance = await etherWallet.getBalance()
            expect(leftBalance).to.equal(1000)
        })
        it('It should fail to withdraw when it is not owner',async function () {
            const {etherWallet, account1, account2} = await loadFixture(deployEtherWalletFixture)
            const tx = {
                to: etherWallet.getAddress(),
                value: 3000
            }
            await account1.sendTransaction(tx)
            await expect(etherWallet.connect(account1).withdraw(2000)).to.be.revertedWith('Not owner')
        })
    })
})