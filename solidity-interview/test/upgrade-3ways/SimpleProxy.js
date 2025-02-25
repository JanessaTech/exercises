const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

// The code showcases how to upgrade contract by simply setting the address of the new contract
describe('SimpleProxy', function () {
    async function deploySimpleProxyFixture() {
        const [deployer, ...others] = await ethers.getSigners()
        const SimpleProxy = await ethers.getContractFactory('SimpleProxy', deployer)
        const simpleProxy = await SimpleProxy.deploy()
        const Callee1 = await ethers.getContractFactory('Callee1')
        const callee1 = await Callee1.deploy()
        const Callee2 = await ethers.getContractFactory('Callee2')
        const callee2 = await Callee2.deploy()
        return {simpleProxy, deployer, callee1, callee2}
    }
    describe('test', function (){
        it('call callee1 successfully', async function () {
            const {simpleProxy, deployer, callee1} = await loadFixture(deploySimpleProxyFixture)
            await simpleProxy.upgrade(callee1.getAddress())
            //const addr = await simpleProxy.implementation()
            //expect(addr).to.be.equal(await callee1.getAddress())
            let ABI = ["function setVars(uint256)"];
            //how to get calldata using ethers? see: https://ethereum.stackexchange.com/questions/141344/is-there-a-tool-for-building-calldata-for-calling-methods
            const iface = new ethers.Interface(ABI);
            const cdata = iface.encodeFunctionData("setVars(uint256)", [10]);
            const tx  = {
                to: simpleProxy.getAddress(),
                data: cdata
            }
            await deployer.sendTransaction(tx)
            const num1 = await simpleProxy.num() 
            expect(num1).to.be.equal(10)
        })
        it('call callee2 successfully', async function () {
            const {simpleProxy, deployer, callee2} = await loadFixture(deploySimpleProxyFixture)
            await simpleProxy.upgrade(callee2.getAddress())
            let ABI = ["function setVars(uint256)"];
            const iface = new ethers.Interface(ABI);
            const cdata = iface.encodeFunctionData("setVars(uint256)", [10]);
            const tx  = {
                to: simpleProxy.getAddress(),
                data: cdata
            }
            await deployer.sendTransaction(tx)
            const num1 = await simpleProxy.num() 
            expect(num1).to.be.equal(20)
        })
    })
})