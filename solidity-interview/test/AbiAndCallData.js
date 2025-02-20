const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('AbiAndCallData', async function () {
    async function deployAbiAndCallDataFixture() {
        const [account1, account2, ...others] = await ethers.getSigners()
        const AbiAndCallData = await ethers.getContractFactory('AbiAndCallData')
        const abiAndCallData = await AbiAndCallData.deploy()
        return {abiAndCallData, account2}
    }

    describe('abi test', function () {
        it('encodeWithSignature', async function () {
            const {abiAndCallData, account2} = await loadFixture(deployAbiAndCallDataFixture)
            const name = 'JanessaTech'
            const res = await abiAndCallData.encodeWithSignature(account2.address, name)
            console.log(res)

            await abiAndCallData.test(res)
            const newName  = await abiAndCallData.getName(account2.address)
            expect(newName).to.be.equal(name)
        })
        it('encodeWithSelector', async function () {
            const {abiAndCallData, account2} = await loadFixture(deployAbiAndCallDataFixture)
            const name = 'JanessaTech'

            const res = await abiAndCallData.encodeWithSelector(account2.address, name)
            console.log(res)

            await abiAndCallData.test(res)
            const newName  = await abiAndCallData.getName(account2.address)
            expect(newName).to.be.equal(name)
        })
        it('encodeCall', async function () {
            const {abiAndCallData, account2} = await loadFixture(deployAbiAndCallDataFixture)
            const name = 'JanessaTech'

            const res = await abiAndCallData.encodeCall(account2.address, name)
            console.log(res)

            await abiAndCallData.test(res)
            const newName  = await abiAndCallData.getName(account2.address)
            expect(newName).to.be.equal(name)
        })
        it('encodePacked', async function () {
            const {abiAndCallData, account2} = await loadFixture(deployAbiAndCallDataFixture)
            const name = 'JanessaTech'

            const res = await abiAndCallData.encodePacked(account2.address, name)
            console.log(res)

            await abiAndCallData.test(res)
            const newName  = await abiAndCallData.getName(account2.address)
            expect(newName).to.be.equal(name)
        })
        it('getSelector', async function () {
            const {abiAndCallData} = await loadFixture(deployAbiAndCallDataFixture)
            const func = await abiAndCallData.getSelector()
            console.log(func)
            expect(func).to.be.equal('0x32434a2e')
        })
        it('getData', async function () {
            const {abiAndCallData,account2} = await loadFixture(deployAbiAndCallDataFixture)
            const name = 'JanessaTech'
            const data = await abiAndCallData.getData(account2.address, name)
            console.log(data)
        })
    })
})