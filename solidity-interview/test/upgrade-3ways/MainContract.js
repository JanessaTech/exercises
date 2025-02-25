const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");


describe('MainContract', function () {
    async function deployMainContractFixture() {
        const MainContract = await ethers.getContractFactory('MainContract')
        const mainContract = await MainContract.deploy()
        const SatelliteV1 = await ethers.getContractFactory('SatelliteV1')
        const satelliteV1 = await SatelliteV1.deploy()
        const SatelliteV2 = await ethers.getContractFactory('SatelliteV2')
        const satelliteV2 = await SatelliteV2.deploy()

        return {mainContract, satelliteV1, satelliteV2}
    }

    it('test', async function () {
        const {mainContract, satelliteV1, satelliteV2} = await loadFixture(deployMainContractFixture)
        await mainContract.upgrade(satelliteV1.getAddress())
        const age1 = await mainContract.getAge()
        expect(age1).to.be.equal(25)

        await mainContract.upgrade(satelliteV2.getAddress())
        const age2 = await mainContract.getAge()
        expect(age2).to.be.equal(30)
    })
})