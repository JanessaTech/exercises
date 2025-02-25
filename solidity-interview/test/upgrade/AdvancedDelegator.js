const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('AdvancedDelegator', function () {
    async function deployAdvancedDelegatorFixture() {
        const [owner, ...others] =await ethers.getSigners()
        const AdvancedDelegator = await ethers.getContractFactory('AdvancedDelegator', owner)
        const advancedDelegator = await AdvancedDelegator.deploy()

        const Callee1 = await ethers.getContractFactory('Callee1')
        const callee1 = await Callee1.deploy()

        const Callee2 = await ethers.getContractFactory('Callee2')
        const callee2 = await Callee2.deploy()
        return {advancedDelegator, callee1, callee2}
    }
    it('It should call delegatecall on callee1 successfully', async function () {
        const {advancedDelegator, callee1} = await loadFixture(deployAdvancedDelegatorFixture)
        await advancedDelegator.upgradeTo(callee1.getAddress())
        await advancedDelegator.setVars(10)
        const num1 = await advancedDelegator.num()
        expect(num1).to.be.equal(10)
        const name = await advancedDelegator.getName()
        expect(name).to.be.equal('Callee1')
    })
    it('It should call delegatecall on callee2 successfully', async function () {
        const {advancedDelegator, callee2} = await loadFixture(deployAdvancedDelegatorFixture)
        await advancedDelegator.upgradeTo(callee2.getAddress())
        await advancedDelegator.setVars(10)
        const num1 = await advancedDelegator.num()
        expect(num1).to.be.equal(20)
        const name = await advancedDelegator.getName()
        expect(name).to.be.equal('Callee2')
    })
})