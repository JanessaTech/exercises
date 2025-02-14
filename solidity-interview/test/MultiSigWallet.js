const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const exp = require("constants");

describe('MultiSigWallet', function () {
    async function deployMultiSigWalletFixture() {
        const [account1, account2, account3, account4, account5, account6, ...others] = await ethers.getSigners()
        const MultiSigWallet = await ethers.getContractFactory('MultiSigWallet', account1)
        const Dummy = await ethers.getContractFactory('Dummy', account1)
        const dummy = await Dummy.deploy()
        const owners = []
        owners.push(account1.address)
        owners.push(account2.address)
        owners.push(account3.address)
        owners.push(account4.address)
        const numConfirmRequired = 3
        const data = '0x4ed3885e000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000'
        const multiSigWallet = await MultiSigWallet.deploy(owners, numConfirmRequired)
        return { multiSigWallet, dummy, account1, account2, account3, account4, account5, account6, data}
    }

    describe('init', function () {
        it('It fails to init when owners is empty',async function () {
            const MultiSigWallet = await ethers.getContractFactory('MultiSigWallet')
            const owners = []
            const numConfirmRequired = 3
            await expect(MultiSigWallet.deploy(owners, numConfirmRequired)).to.be.revertedWith('the size of owners should be greater than 0')
        })
        it('It fails to init when the number of owner is less than _numConfirmRequired', async function () {
            const MultiSigWallet = await ethers.getContractFactory('MultiSigWallet')
            const [account1, account2, account3, account4, ...others] = await ethers.getSigners()
            const owners = []
            owners.push(account1.address)
            owners.push(account2.address)
            owners.push(account3.address)
            const numConfirmRequired = 4
            await expect(MultiSigWallet.deploy(owners, numConfirmRequired)).to.be.rejectedWith('invalid numConfirmRequired')
        })
        it('It fails to init when _numConfirmRequired is not postive', async function () {
            const MultiSigWallet = await ethers.getContractFactory('MultiSigWallet')
            const [account1, account2, account3, account4, ...others] = await ethers.getSigners()
            const owners = []
            owners.push(account1.address)
            owners.push(account2.address)
            owners.push(account3.address)
            const numConfirmRequired = 0
            await expect(MultiSigWallet.deploy(owners, numConfirmRequired)).to.be.rejectedWith('invalid numConfirmRequired')
        })
        it('It fails to init when there is invalid address for owner', async function () {
            const MultiSigWallet = await ethers.getContractFactory('MultiSigWallet')
            const [account1, account2, account3, account4, ...others] = await ethers.getSigners()
            const owners = []
            owners.push(ethers.ZeroAddress)
            owners.push(account2.address)
            owners.push(account3.address)
            const numConfirmRequired = 3
            await expect(MultiSigWallet.deploy(owners, numConfirmRequired)).to.be.rejectedWith('invalid owner')
        })
        it('It fails to init when there is duplicated owners', async function () {
            const MultiSigWallet = await ethers.getContractFactory('MultiSigWallet')
            const [account1] = await ethers.getSigners()
            const owners = []
            owners.push(account1.address)
            owners.push(account1.address)
            owners.push(account1.address)
            const numConfirmRequired = 3
            await expect(MultiSigWallet.deploy(owners, numConfirmRequired)).to.be.revertedWith('owner should be unique')
        })
        it('It should return the correct list of owners', async function () {
            const { multiSigWallet, account1, account2, account3} = await loadFixture(deployMultiSigWalletFixture)
            const owners = await multiSigWallet.getOwners()
            expect(owners).to.include(account1.address)
            expect(owners).to.include(account2.address)
            expect(owners).to.include(account3.address)
        })
    })
    describe('submitTransaction', function () {
        it('It should submit a new transaction succesfully when it is owner', async function () {
            const {multiSigWallet, data, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            const size = await multiSigWallet.getTransactionSize()
            expect(size).to.equal(1)
        })
        it('It should fail to submit a new transaction when it is not owner', async function () {
            const {multiSigWallet, account6, data, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await expect(multiSigWallet.connect(account6).submitTransaction(dummy.getAddress(), data)).to.be.revertedWith('only owner')
        })
    })
    describe('confirmTransaction', function () {
        it('It fails to confirm the tx when it is not owner',async function () {
            const {multiSigWallet, account6, data, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await expect(multiSigWallet.connect(account6).confirmTransaction(0)).to.be.revertedWith('only owner')
        })
        it('It fails to confirm the tx when it does not exist', async function () {
            const {multiSigWallet, data, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await expect(multiSigWallet.confirmTransaction(1)).to.be.revertedWith('tx does not exist')

        })
        it('It fails to confirm the tx when it is already confirmed', async function () {
            const {multiSigWallet, data, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            await expect(multiSigWallet.confirmTransaction(0)).to.be.rejectedWith('tx is confirmed')
        })
        it('It fails to confirm the tx when it is executed', async function () {
            const {multiSigWallet, account2, account3, account4, dummy, data} =await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            await multiSigWallet.connect(account2).confirmTransaction(0)
            await multiSigWallet.connect(account3).confirmTransaction(0)
            await multiSigWallet.executeTransaction(0)
            await expect(multiSigWallet.connect(account4).confirmTransaction(0)).to.be.rejectedWith('tx is executed')
        })
        it('It confirm the tx succesfully', async function () {
            const {multiSigWallet, data, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            const transaction = await multiSigWallet.getTransaction(0)
            expect(transaction.confirms).to.equal(1)
        })
    })
    describe('revokeConfirm', function () {
        it('It fails to revoke when it is not owner', async function () {
            const {multiSigWallet, account6, data, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await expect(multiSigWallet.connect(account6).revokeConfirm(0)).to.be.revertedWith('only owner')
        })
        it('it fails to revoke when it does not exist', async function () {
            const {multiSigWallet, account5, data, dummy} =await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await expect(multiSigWallet.revokeConfirm(2)).to.be.revertedWith('tx does not exist')
        })
        it('It fails to revoke when it is already executed', async function () {
            const {multiSigWallet, account2, account3, dummy, data} =await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            await multiSigWallet.connect(account2).confirmTransaction(0)
            await multiSigWallet.connect(account3).confirmTransaction(0)
            await multiSigWallet.executeTransaction(0)
            await expect(multiSigWallet.revokeConfirm(0)).to.be.revertedWith('tx is executed')
        })
        it('It fails to revoke when it is not confirmed', async function () {
            const {multiSigWallet, data, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await expect(multiSigWallet.revokeConfirm(0)).to.be.revertedWith('Tx is not confirmed')
        })
        it('it revokes successfully', async function () {
            const {multiSigWallet, dummy, data} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            await multiSigWallet.revokeConfirm(0)
            const transaction = await multiSigWallet.getTransaction(0)
            expect(transaction.confirms).to.equal(0)
        })
    })
    describe('executeTransaction', function () {
        it('It fails to execute when it is not owner', async function () {
            const {multiSigWallet, data,  account2, account3,  account6, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            await multiSigWallet.connect(account2).confirmTransaction(0)
            await multiSigWallet.connect(account3).confirmTransaction(0)
            await expect(multiSigWallet.connect(account6).executeTransaction(0)).to.be.revertedWith('only owner')
        })
        it('It fails to execute when it does not exist', async function () {
            const {multiSigWallet, data,  account2, account3, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            await multiSigWallet.connect(account2).confirmTransaction(0)
            await multiSigWallet.connect(account3).confirmTransaction(0)
            await expect(multiSigWallet.executeTransaction(2)).to.be.revertedWith('tx does not exist')
        })
        it('It fails to execute when numConfirmRequired not enough', async function () {
            const {multiSigWallet, data, account2, account3, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.connect(account2).confirmTransaction(0)
            await multiSigWallet.connect(account3).confirmTransaction(0)
            await expect(multiSigWallet.executeTransaction(0)).to.be.revertedWith('numConfirmRequired is enough')
        })
        it('It is executed successfully', async function () {
            const {multiSigWallet, data, account2, account3, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            await multiSigWallet.connect(account2).confirmTransaction(0)
            await multiSigWallet.connect(account3).confirmTransaction(0)
            await multiSigWallet.executeTransaction(0)
            const msg = await dummy.get()
           
            const transaction = await multiSigWallet.getTransaction(0)
            expect(transaction.executed).to.equal(true)
            expect(msg).to.be.equal('test')
        })
        it('It fail to execute when it is already executed', async function () {
            const {multiSigWallet, data, account2, account3, dummy} = await loadFixture(deployMultiSigWalletFixture)
            await multiSigWallet.submitTransaction(dummy.getAddress(), data)
            await multiSigWallet.confirmTransaction(0)
            await multiSigWallet.connect(account2).confirmTransaction(0)
            await multiSigWallet.connect(account3).confirmTransaction(0)
            await multiSigWallet.executeTransaction(0)
            await expect(multiSigWallet.executeTransaction(0)).to.be.revertedWith('tx is executed')
        })
    })
})