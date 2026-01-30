const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('PersonArrayDemo', function () {
    async function deployPersonArrayDemoFixture() {
        const PersonArrayDemo = await ethers.getContractFactory('PersonArrayDemo')
        const personArrayDemo = await PersonArrayDemo.deploy()
        return {personArrayDemo}
    }
    describe('create/remove', function () {
        it('create', async function () {
           const {personArrayDemo} = await loadFixture(deployPersonArrayDemoFixture)
           await personArrayDemo.create('person0')
           await personArrayDemo.create('person1')
           await personArrayDemo.create('person2')

           const person0 = await personArrayDemo.get(0)
           const person1 = await personArrayDemo.get(1)
           const person2 = await personArrayDemo.get(2)
           expect(person0.name).to.be.equal('person0')
           expect(person1.name).to.be.equal('person1')
           expect(person2.name).to.be.equal('person2')
        })
        it('remove', async function () {
            const {personArrayDemo} = await loadFixture(deployPersonArrayDemoFixture)
            await personArrayDemo.create('person0')
            await personArrayDemo.create('person1')
            await personArrayDemo.create('person2')
            await personArrayDemo.create('person3')

            await personArrayDemo.remove(3)
            await personArrayDemo.remove(1)

            const person0 = await personArrayDemo.get(0)
            const person2 = await personArrayDemo.get(2)
            expect(person0.name).to.be.equal('person0')
            expect(person2.name).to.be.equal('person2')
            await expect(personArrayDemo.get(1)).to.be.revertedWith('invalid id')
            await expect(personArrayDemo.get(3)).to.be.revertedWith('invalid id')
        })
    })
}) 