const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('TestArrayLib', function () {
    async function deployTestArrayLibFixture() {
        const TestArrayLib = await ethers.getContractFactory('TestArrayLib')
        const testArrayLib = await TestArrayLib.deploy()
        return testArrayLib
    }

    it('init', async function () {
        const testArrayLib = await loadFixture(deployTestArrayLibFixture)
        await expect(testArrayLib.test()).not.to.be.reverted
    })
})