const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { extendProvider } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [account1, account2, account3, account4, account5,...others] = await ethers.getSigners()
        const Dummy = await ethers.getContractFactory('Dummy', account1)
        const dummy = await Dummy.deploy()
        const data = '0x4ed3885e000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000'
        const Redo = await ethers.getContractFactory('Redo', account1)
        const owners = []
        owners.push(account1.address)
        owners.push(account2.address)
        owners.push(account3.address)
        owners.push(account4.address)
        const numConfirm = 3 
        const redo = await Redo.deploy(owners, numConfirm)
        return {redo, account1, account2, account3, account4, account5, dummy, data}
    }

    describe('init', function () {
        it('It fails to init when owners is empty', async function () {
            const [account1,  ...others] = await ethers.getSigners()
            const Redo = await ethers.getContractFactory('Redo', account1)
            const owners = []
            const numConfirm = 3
            await expect(Redo.deploy(owners, numConfirm)).to.be.revertedWith('owners is empty')
        })
        it('It fails to init when _numConfirm is larger than the number of owners', async function () {
            const [account1,  account2, ...others] = await ethers.getSigners()
            const Redo = await ethers.getContractFactory('Redo', account1)
            const owners = []
            owners.push(account1.address)
            owners.push(account2.address)
            const numConfirm = 3
            await expect(Redo.deploy(owners, numConfirm)).to.be.revertedWith('invalid _numConfirm')
        })
        it('It fails to init when _numConfirm is 0', async function () {
            const [account1,  account2, ...others] = await ethers.getSigners()
            const Redo = await ethers.getContractFactory('Redo', account1)
            const owners = []
            owners.push(account1.address)
            owners.push(account2.address)
            const numConfirm = 0
            await expect(Redo.deploy(owners, numConfirm)).to.be.revertedWith('invalid _numConfirm')
        })
        it('It fails to init when there is valid owner is owners', async function () {
            const [account1,  account2, ...others] = await ethers.getSigners()
            const Redo = await ethers.getContractFactory('Redo', account1)
            const owners = []
            owners.push(ethers.ZeroAddress)
            owners.push(account1.address)
            owners.push(account2.address)
            const numConfirm = 3
            await expect(Redo.deploy(owners, numConfirm)).to.be.revertedWith('Invalid owner')
        })
        it('It fails to init when there is duplicated owner in owners', async function() {
            const [account1,  account2, ...others] = await ethers.getSigners()
            const Redo = await ethers.getContractFactory('Redo', account1)
            const owners = []
            owners.push(account1.address)
            owners.push(account1.address)
            const numConfirm = 2
            await expect(Redo.deploy(owners, numConfirm)).to.be.revertedWith('duplicated owner')
        })
        it('It inits successfully', async function() {
            const {redo, account1, account2, account3, account4}  = await loadFixture(deployRedoFixture)
            const owners = await redo.getOwners()
            expect(owners).to.include(account1.address)
            expect(owners).to.include(account2.address)
            expect(owners).to.include(account3.address)
            expect(owners).to.include(account4.address)
        })
    })

    describe('submitTransaction', function () {
        it('It fails to submit a new transaction when it is not owner', async function () {
            const {redo, account5, dummy, data} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(account5).submitTransaction(dummy.getAddress(), data)).to.be.revertedWith('not owner')
        })
        it('it created a new transaction successfully', async function () {
            const {redo, dummy, data} = await loadFixture(deployRedoFixture)
            await expect(redo.submitTransaction(dummy.getAddress(), data)).to.emit(redo, 'SubmitTx')
        })
    })

    describe('confirmTransaction', function () {
        it('It fails to confirm tx when it is not owner', async function () {
            const {redo, account5, dummy, data} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)

            await expect(redo.connect(account5).confirmTransaction(0)).to.be.revertedWith('not owner')
        })
        it('It fails to confirm tx when it does not exist', async function () {
            const {redo, account5, dummy, data} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)

            await expect(redo.confirmTransaction(1)).to.be.revertedWith('Tx does not exist')
        })
        it('It confirms tx successfully', async function () {
            const {redo, dummy, data} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await expect(redo.confirmTransaction(0)).to.emit(redo, 'ConfirmTx')
        })
        it('It fails to confirm tx when it is already confirmed', async function () {
            const {redo, dummy, data} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await redo.confirmTransaction(0)
            await expect(redo.confirmTransaction(0)).to.be.revertedWith('Tx is confirmed')
        })
        it('It fails to confirm tx when it is executed', async function () {
            const {redo, dummy, data, account2, account3, account4} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await redo.confirmTransaction(0)
            await redo.connect(account2).confirmTransaction(0)
            await redo.connect(account3).confirmTransaction(0)
            await redo.executeTransaction(0)

            await expect(redo.connect(account4).confirmTransaction(0)).to.be.revertedWith('Tx is already executed')
        })
    })

    describe('revertTransaction', function () {
        it('It fails to revert tx when it is not owner', async function () {
            const {redo, dummy, data, account5} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await redo.confirmTransaction(0)
            await expect(redo.connect(account5).revertTransaction(0)).to.be.revertedWith('not owner')
        })
        it('It fails to revert tx when it does not exist', async function () {
            const {redo, dummy, data, account5} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await expect(redo.revertTransaction(1)).to.be.revertedWith('Tx does not exist')
        })
        it('It fails to confirm tx when it is not confirmed', async function () {
            const {redo, dummy, data} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await expect(redo.revertTransaction(0)).to.be.revertedWith('not confirm')
        })
        it('It revoked the tx successfully', async function () {
            const {redo, dummy, data} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await redo.confirmTransaction(0)
            await expect(redo.revertTransaction(0)).to.emit(redo, 'RevokeTx')
        })
        it('It fails to revoke tx when it is executed', async function () {
            const {redo, dummy, data, account2, account3, account4} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await redo.confirmTransaction(0)
            await redo.connect(account2).confirmTransaction(0)
            await redo.connect(account3).confirmTransaction(0)
            await redo.executeTransaction(0)

            await expect(redo.revertTransaction(0)).to.be.revertedWith('Tx is already executed')
        })
    })

    describe('executeTransaction', function () {
        it('It fails to execute tx when it is not owner', async function () {
            const {redo, dummy, data, account5} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await redo.confirmTransaction(0)

            await expect(redo.connect(account5).executeTransaction(0)).to.be.revertedWith('not owner')
        })
        it('It fails to execute tx when the tx does not exist', async function () {
            const {redo, dummy, data} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await redo.confirmTransaction(0)

            await expect(redo.executeTransaction(1)).to.be.revertedWith('Tx does not exist')
        })
        it('It fails to execute tx when there is not enough confirms', async function () {
            const {redo, dummy, data, account2} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy, data)
            await redo.confirmTransaction(0)
            
            await expect(redo.executeTransaction(0)).to.be.revertedWith('not enough confirms')
        })
        it('It executes the tx succesfully', async function () {
            const {redo, dummy, data, account2, account3} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy, data)
            await redo.confirmTransaction(0)
            await redo.connect(account2).confirmTransaction(0)
            await redo.connect(account3).confirmTransaction(0)

            await expect(redo.executeTransaction(0)).to.emit(redo, 'ExecuteTx')
            const mesg = await dummy.get()
            expect(mesg).to.equal('test')
        })
        it('It fails to execute tx when it is executed', async function () {
            const {redo, dummy, data, account2, account3, account4} = await loadFixture(deployRedoFixture)
            await redo.submitTransaction(dummy.getAddress(), data)
            await redo.confirmTransaction(0)
            await redo.connect(account2).confirmTransaction(0)
            await redo.connect(account3).confirmTransaction(0)
            await redo.executeTransaction(0)

            await expect(redo.executeTransaction(0)).to.be.revertedWith('Tx is already executed')
        })

    })
})
