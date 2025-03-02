const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe('Redo', function () {
    async function deployRedoFixture() {      
        const [acc1, acc2, acc3, acc4, ...others] =  await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo, acc1, acc2, acc3, acc4}
    }

    describe('init', function () {
        it('init', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
        })
    })
    describe('add & update', function () {
        it('add', async function (){
            const {redo, acc1} = await loadFixture(deployRedoFixture)
            await redo.set(acc1.address, 'acc1')
            const keys = await redo.getKeys()
            expect(keys).to.include.members([acc1.address])
        })
        it('update', async function (){
            const {redo, acc1} = await loadFixture(deployRedoFixture)
            await redo.set(acc1.address, 'acc1')
            await redo.set(acc1.address, 'acc1_new')
            const value = await redo.getValue(acc1.address)
            expect(value).to.be.equal('acc1_new')
        })
    })
    describe('remove', function () {
        it('it failed to remove when it does not exist', async function (){
            const {redo, acc1} = await loadFixture(deployRedoFixture)
            await expect(redo.remove(acc1.address)).to.be.revertedWith('invalid key')
        })
        it('it removed successully', async function () {
            const {redo, acc1, acc2, acc3} = await loadFixture(deployRedoFixture)
            await redo.set(acc1.address, 'acc1')
            await redo.set(acc2.address, 'acc2')
            await redo.set(acc3.address, 'acc3')

            await redo.remove(acc2.address)
            const keys = await redo.getKeys()
            const value1  = await redo.getValue(acc1.address)
            const value3  = await redo.getValue(acc3.address)
            expect(keys).to.include.members([acc1.address,acc3.address])
            expect(value1).to.be.equal('acc1')
            expect(value3).to.be.equal('acc3')
            await expect(redo.getValue(acc2.address)).to.be.revertedWith('invalid key')
        })
    })
})




