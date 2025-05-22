const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, ...others] = await ethers.getSigners()
        const LogicV1 = await ethers.getContractFactory('LogicV1')
        const logicV1 = await LogicV1.deploy()
        const LogicV2 = await ethers.getContractFactory('LogicV2')
        const logicV2 = await LogicV2.deploy()

        const Proxy = await ethers.getContractFactory('Redo')
        const proxy = await Proxy.deploy(logicV1.getAddress())
        return {proxy, admin, logicV1, logicV2}
    }

    describe('init', function () {
        it('init', async function () {
            const {proxy} = await loadFixture(deployRedoFixture)
        })
    })

    describe('LogicV1 & LogicV2', function () {
        it('LogicV1', async function () {
            const {proxy, admin} = await loadFixture(deployRedoFixture)
            const abi = ['function setValue(uint256) external']
            const iface = new ethers.Interface(abi)
            const value = 10
            const cdata = iface.encodeFunctionData('setValue(uint256)', [value])
            const tx = {
                to: await proxy.getAddress(),
                data: cdata
            }
            await admin.sendTransaction(tx)
            const val = await proxy.value()
            expect(val).to.be.equal(value)
        })
        it('LogicV1', async function () {
            const {proxy, admin, logicV2} = await loadFixture(deployRedoFixture)
            await proxy.upgradeTo(await logicV2.getAddress())
            const abi = ['function setValue(uint256) external']
            const iface = new ethers.Interface(abi)
            const value = 10
            const cdata = iface.encodeFunctionData('setValue(uint256)', [value])
            const tx = {
                to: await proxy.getAddress(),
                data: cdata
            }
            await admin.sendTransaction(tx)
            const val = await proxy.value()
            expect(val).to.be.equal(value * 2)
        })
    })
    
})




