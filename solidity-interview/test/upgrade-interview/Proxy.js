const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('Proxy', function () {
    async function deployProxyFixture() {
        const [admin, nonadmin, ...others]  = await ethers.getSigners()
        const LogicV1 = await ethers.getContractFactory('LogicV1')
        const logicV1 = await LogicV1.deploy()
        const LogicV2 = await ethers.getContractFactory('LogicV2')
        const logicV2 = await LogicV2.deploy()
        const Proxy = await ethers.getContractFactory('Proxy', admin)
        const proxy = await Proxy.deploy(logicV1.getAddress())
        return {proxy, admin, nonadmin, logicV1, logicV2}
    }

    describe('init', function () {
        it('init', async function () {
            const {proxy} = await loadFixture(deployProxyFixture)
        })
    })
    describe('LogicV1', function () {
        it('test LogicV1', async function () {
            const {proxy, admin} = await loadFixture(deployProxyFixture)
            const abi = ['function setValue(uint256)']
            const iface = new ethers.Interface(abi)
            const value = 10
            const cdata = iface.encodeFunctionData('setValue(uint256)', [value])
            const tx = {
                to: proxy.getAddress(),
                data: cdata
            }
            await admin.sendTransaction(tx)
            const val = await proxy.value()
            expect(val).to.be.equal(value)
        })
    })

    describe('LogicV2', function () {
        it('test LogicV2', async function () {
            const {proxy, admin, logicV2} = await loadFixture(deployProxyFixture)
            await proxy.upgradeTo(logicV2.getAddress())
            const abi = ['function setValue(uint256)']
            const iface = new ethers.Interface(abi)
            const value = 10
            const cdata = iface.encodeFunctionData('setValue(uint256)', [value])
            const tx = {
                to: proxy.getAddress(),
                data: cdata
            }
            await admin.sendTransaction(tx)
            const val = await proxy.value()
            expect(val).to.be.equal(value * 2)
        })
    })


})