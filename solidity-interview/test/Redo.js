const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
   async function deployRedoFixture() {
    const [admin, nonadmin, ...others] = await ethers.getSigners()
    const Redo = await ethers.getContractFactory('Redo')
    const redo = await Redo.deploy()
    return {redo}
   }

   describe('create', function () {
    it('create', async function () {
        const {redo} = await loadFixture(deployRedoFixture)
        await redo.create('person0')
        await redo.create('person1')
        await redo.create('person2')
        const person0 = await redo.get(0)
        const person1 = await redo.get(1)
        const person2 = await redo.get(2)
        expect(person0.name).to.be.equal('person0')
        expect(person1.name).to.be.equal('person1')
        expect(person2.name).to.be.equal('person2')
    })
    it('remove', async function () {
        const {redo} = await loadFixture(deployRedoFixture)
        await redo.create('person0')
        await redo.create('person1')
        await redo.create('person2')
        await expect(redo.remove(1)).not.to.be.reverted
        const person0 = await redo.get(0)
        const person2 = await redo.get(2)
        await expect(redo.get(1)).to.be.revertedWith('invalid id')
        expect(person0.name).to.be.equal('person0')
        expect(person2.name).to.be.equal('person2')
    })
   })
   
})




