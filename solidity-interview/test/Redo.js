const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Redo', function () {
    async function deployWalletFixture() {
        const [account1, account2, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo', account2)
        const redo = await Redo.deploy()
        return {redo, account1, account2}
    }

    describe('withdraw', function () {
        it('It should get correct balance', async function () {
            const {redo, account1, account2} = await loadFixture(deployWalletFixture)
            const tx = {
                to: redo.getAddress(),
                value: 3000
            }
            await account1.sendTransaction(tx)
            const balance = await redo.getBalance()
            expect(balance).to.equal(3000)
        })
        it('It should withdraw successfully', async function () {
            const {redo, account1, account2} = await loadFixture(deployWalletFixture)
            const tx = {
                to: redo.getAddress(),
                value : 3000
            }
            await account1.sendTransaction(tx)
            await redo.withdraw(1000)
            const balance = await redo.getBalance()
            expect(balance).to.equal(2000)
        })
        it('It should fail to withdraw', async function () {
            const {redo, account1, account2} = await loadFixture(deployWalletFixture)
            const tx = {
                to: redo.getAddress(),
                value: 3000
            }
            await account1.sendTransaction(tx)
            await expect(redo.connect(account1).withdraw(1000)).to.be.revertedWith('Not owner')
        })
    })
})
