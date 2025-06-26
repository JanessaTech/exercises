const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo}
    }

    describe('create & remove', function () {
        it('create', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.create('person0')
            await redo.create('person1')
            const person0 = await redo.get(0)
            const person1 = await redo.get(1)
            expect(person0.name).to.be.equal('person0')
            expect(person1.name).to.be.equal('person1')
        })
        it('remove', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.create('person0')
            await redo.create('person1')
            await redo.create('person2')
            await redo.remove(1)
            const person0 = await redo.get(0)
            const person2 = await redo.get(2)
            expect(person0.name).to.be.equal('person0')
            expect(person2.name).to.be.equal('person2')
            await expect(redo.get(1)).to.be.revertedWith('invalid id')
        })
    })
    
})




