const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('FailContract', function () {
    it('it should fail', async function () {
        const FailContract = await ethers.getContractFactory('FailContract')
        const failContract = await FailContract.deploy()
        await failContract.waitForDeployment()

        //await expect(failContract.willFail()).to.be.revertedWith("this function will always fail");
        await failContract.willFail()
    })
})