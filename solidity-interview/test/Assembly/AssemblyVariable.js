const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('AssemblyVariable', function () {
    async function deployAssemblyVariableFixture() {
        const AssemblyVariable = await ethers.getContractFactory('AssemblyVariable')
        const assemblyVariable = await AssemblyVariable.deploy()
        return {assemblyVariable}
    }
    it('setting', async function () {
        const {assemblyVariable} = await loadFixture(deployAssemblyVariableFixture)
        const [x, y] = await assemblyVariable.setting()
        expect(x).to.be.equal(100)
        expect(y).to.be.equal(false)
    })
})