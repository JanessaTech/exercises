const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('PersonContract', function () {
    async function deployPersonContractFixture() {
        const [Bob, ...others]= await ethers.getSigners()
        const PersonContract = await ethers.getContractFactory('PersonContract', Bob)
        const personContract = await PersonContract.deploy()
        const PersonStorage = await ethers.getContractFactory('PersonStorage', Bob)
        const personStorage = await PersonStorage.deploy()
        await personStorage.addACL(personContract.getAddress())
        await personContract.setPersonStorage(personStorage.getAddress())
        return {personContract}
    }

    it('test', async function () {
        const {personContract} = await loadFixture(deployPersonContractFixture)
        await personContract.setName('JanessaTech')
        await personContract.setAge(10)
        const name = await personContract.getName()
        const age = await personContract.getAge()
        expect(name).to.be.equal('JanessaTech')
        expect(age).to.be.equal(age)
    })
})