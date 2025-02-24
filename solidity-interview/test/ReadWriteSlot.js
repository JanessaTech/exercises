const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('ReadWriteSlot', function () {
    async function deployReadWriteSlotFixture() {
        const ReadWriteSlot = await ethers.getContractFactory('ReadWriteSlot')
        const readWriteSlot = await ReadWriteSlot.deploy()
        return {readWriteSlot}
    }

    describe('read & write', function () {
        it('write', async function () {
            const {readWriteSlot} = await loadFixture(deployReadWriteSlotFixture)
            await readWriteSlot.write('JanessaTech')
            const name  = await readWriteSlot.read()
            expect(name).to.be.equal('JanessaTech')
        })
    })
})