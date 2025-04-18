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
        it('create', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.create('person0')
            const person0 = await redo.get(0)
            expect(person0.name).to.be.equal('person0')
        })
    })
    describe('remove', function () {
        it('it failed to remove when the id is invalid', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.create('person0')
            await expect(redo.remove(1)).to.be.revertedWith('invalid id')
        })
        it('it removed the person successfully', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.create('person0')
            await redo.create('person1')
            await redo.create('person2')

            await redo.remove(1)
            const person0 = await redo.get(0)
            const person2 = await redo.get(2)
            await expect(redo.get(1)).to.be.revertedWith('invalid id')
            expect(person0.name).to.be.equal('person0')
            expect(person2.name).to.be.equal('person2')
        })
    })

})




