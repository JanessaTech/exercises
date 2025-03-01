const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('PersonArrayDemo', function () {
    async function deployRedoFixture() {
        const PersonArrayDemo = await ethers.getContractFactory('PersonArrayDemo')
        const personArrayDemo = await PersonArrayDemo.deploy()
        return {personArrayDemo}
    }
    describe('test', function () {
        it('create & delete', async function () {
            const {personArrayDemo} = await loadFixture(deployRedoFixture)
            await personArrayDemo.create('Jane0')
            await personArrayDemo.create('Jane1')
            await personArrayDemo.create('Jane2')
            await personArrayDemo.remove(1)
            await personArrayDemo.create('Jane3')
            await personArrayDemo.create('Jane4')
            await personArrayDemo.remove(3)

            const person0 = await personArrayDemo.get(0)
            const person2 = await personArrayDemo.get(2)
            const person4 = await personArrayDemo.get(4)
            const persons = await personArrayDemo.getAll()
            expect(persons.length).to.be.equal(3)
            expect(person0.name).to.be.equal('Jane0')
            expect(person2.name).to.be.equal('Jane2')
            expect(person4.name).to.be.equal('Jane4')
            await expect(personArrayDemo.get(1)).to.be.revertedWith('invalid id')
            await expect(personArrayDemo.get(3)).to.be.revertedWith('invalid id')
        })
    })
}) 