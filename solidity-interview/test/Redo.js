const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");



describe('Redo', function () {
    async function deployRedoFixture() {
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
        })
    })
    describe('create', function () {
        it('it should create a new person successfully', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.create('person0')
            const person0 = await redo.get(0)
            expect(person0.name).to.equal('person0')
        })
    })
    describe('remove', function () {
        it('it should fail to remove the person when the id is invalid', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await expect(redo.remove(0)).to.be.revertedWith('invalid id')
        })
        it('it should remove the person by id successfully', async function () {

        })
    })
})




