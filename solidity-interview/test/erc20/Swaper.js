const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Swaper', function () {
    async function deployERC20SwaperFixture() {
        const [owner1, owner2, owner3, ...others] = await ethers.getSigners()
        const MyERC20 = await ethers.getContractFactory('MyERC20', owner1)
        const token1 = await MyERC20.deploy('TOKEN1', 'TK1')
        const token2 = await MyERC20.connect(owner2).deploy('TOKEN2', 'TK2')
        const Swaper = await ethers.getContractFactory('Swaper', owner3)
        const swaper = await Swaper.deploy(token1, owner1, token2, owner2)
        
        return {swaper, owner1, owner2, owner3}
    }

    describe('init', function () {
        it('It should create an erc20 token successfully', async function () {
            const [account1, ...others] = await ethers.getSigners()
            const MyERC20 = await ethers.getContractFactory('MyERC20', account1)
            const token1 = await MyERC20.deploy('TOKEN1', 'TK1')
            const supply = await token1.totalSupply()
            const balance = await token1.balanceOf(account1.address)
            expect(supply).to.be.equal(100000000000000000000n)
            expect(balance).to.be.equal(100000000000000000000n)
        })
    })
})