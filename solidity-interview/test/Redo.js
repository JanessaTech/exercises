const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, ...others] = await ethers.getSigners()
        const LogicV1  = await ethers.getContractFactory('LogicV1')
        const logicV1 = await LogicV1.deploy()
        const LogicV2  = await ethers.getContractFactory('LogicV2')
        const logicV2 = await LogicV2.deploy()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(logicV1)
        return {redo, logicV1, logicV2, admin}
    }
    describe('logicV1, logicV2', function () {
        it('logicV1', async function () {
            const {redo, admin} = await loadFixture(deployRedoFixture)
            const abi = ['function setValue(uint256 _value) external']
            const iface = new ethers.Interface(abi)
            const value = 100
            const cdata = iface.encodeFunctionData('setValue(uint256)', [value])
            const tx = {
                to: await redo.getAddress(),
                data: cdata
            }
            await admin.sendTransaction(tx)
            const val = await redo.value()
            expect(val).to.be.equal(value)

        })
        it('logicV2', async function () {
            const {redo, admin, logicV2} = await loadFixture(deployRedoFixture)
            await redo.upgradeTo(logicV2.getAddress())
            const abi = ['function setValue(uint256 _value) external']
            const iface = new ethers.Interface(abi)
            const value = 100
            const cdata = iface.encodeFunctionData('setValue(uint256)', [value])
            const tx = {
                to: redo.getAddress(),
                data: cdata
            }
            await admin.sendTransaction(tx)
            const val = await redo.value()
            expect(val).to.be.equal(value * 2)

        })
    })
    
})




