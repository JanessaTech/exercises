const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
   async function deployRedoFxiture() {
    const LogicV1 = await ethers.getContractFactory('LogicV1')
    const logicV1 = await LogicV1.deploy()
    const LogicV2 = await ethers.getContractFactory('LogicV2')
    const logicV2 = await LogicV2.deploy()
    const [admin, ...others] = await ethers.getSigners()
    const Proxy = await ethers.getContractFactory('Redo')
    const proxy = await Proxy.deploy(logicV1.getAddress())
    return {proxy, logicV1, logicV2, admin}
   }

   describe('LogicV1 & LogicV2', function () {
    it('LogicV1', async function () {
        const {proxy, admin} = await loadFixture(deployRedoFxiture)
        const abi = ['function setValue(uint256 _value) external']
        const iface = new ethers.Interface(abi)
        const value = 100
        const cdata = iface.encodeFunctionData('setValue(uint256)', [value])
        const tx = {
            data: cdata,
            to: await proxy.getAddress()
        }
        await admin.sendTransaction(tx)
        const val = await proxy.value()
        expect(val).to.be.equal(value)
    })

    it('LogicV2', async function () {
        const {proxy, admin, logicV2} = await loadFixture(deployRedoFxiture)
        await proxy.upgradeTo(logicV2.getAddress())
        const abi = ['function setValue(uint256 _value) external']
        const iface = new ethers.Interface(abi)
        const value = 100
        const cdata = iface.encodeFunctionData('setValue(uint256)', [value])
        const tx = {
            data: cdata,
            to: await proxy.getAddress()
        }
        await admin.sendTransaction(tx)
        const val = await proxy.value()
        expect(val).to.be.equal(value * 2)
    })
   })
   
})




