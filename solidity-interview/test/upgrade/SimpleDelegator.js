const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('SimpleDelegator', function () {
    async function deploySimpleDelegatorFixture() {
        const SimpleDelegator = await ethers.getContractFactory('SimpleDelegator')
        const simpleDelegator = await SimpleDelegator.deploy()

        const Callee1 = await ethers.getContractFactory('Callee1')
        const callee1 = await Callee1.deploy()

        const Callee2 = await ethers.getContractFactory('Callee2')
        const callee2 = await Callee2.deploy()

        return {simpleDelegator, callee1, callee2}
    }
    it('callee1', async function () {
        const {simpleDelegator, callee1, callee2} = await loadFixture(deploySimpleDelegatorFixture)
        await simpleDelegator.setVars(callee1.getAddress(), 10)
        const num1 = await simpleDelegator.num()
        expect(num1).to.be.equal(10)


        await simpleDelegator.setVars(callee2.getAddress(), 10)
        const num2 = await simpleDelegator.num()
        expect(num2).to.be.equal(20)
    })
})