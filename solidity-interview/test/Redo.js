const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployredoFixture() {
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo}
    }

    describe('create', function () {
        it('create', async function () {
            const {redo} = await loadFixture(deployredoFixture)
            await redo.create('person0')
            const person0 = await redo.get(0)
            expect(person0.name).to.be.equal('person0')
        })
        
    })
    describe('remove', function () {
        it('it failed to remove the person by id', async function () {
            const {redo} = await loadFixture(deployredoFixture)
            await expect(redo.remove(0)).to.be.revertedWith('invalid id')
        })
        it('it remove the person by id successfully', async function () {
            const {redo} = await loadFixture(deployredoFixture)
            await redo.create('person0')
            await redo.create('person1')
            await redo.create('person2')
            await redo.remove(1)

            const person0 = await redo.get(0)
            await expect(redo.get(1)).to.be.revertedWith('invalid id')
            const person2 = await redo.get(2)
            expect(person0.name).to.be.equal('person0')
            expect(person2.name).to.be.equal('person2')
        })
    })
})




