const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('StaticCaller', function () {
    async function deployStaticCallerFixture() {
        const StaticCaller = await ethers.getContractFactory('StaticCaller')
        const staticCaller = await StaticCaller.deploy()
        const StaticCallee = await ethers.getContractFactory('StaticCallee')
        const staticCallee = await StaticCallee.deploy()
        return {staticCaller, staticCallee}
    }
    it('getName', async function () {
        const {staticCaller, staticCallee} = await loadFixture(deployStaticCallerFixture)
        await staticCallee.setName(1, 'test1')
        await staticCallee.setName(2, 'test2')
        const name = await staticCaller.getName(staticCallee.getAddress(), 1)

        expect(name).to.be.equal('test1')
    })
})