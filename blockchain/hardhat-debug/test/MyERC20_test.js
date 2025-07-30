const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { ethers } = require("hardhat");

  describe('MyERC20', function () {
    async function deployMyERC20Fixture() {
        const [admin, Alice, Bob, ...others] = await ethers.getSigners()
        const MyERC20 = await ethers.getContractFactory('MyERC20')
        const erc20 = await MyERC20.deploy(admin.getAddress())
        return {erc20, Alice, Bob}
    }

    describe('Failed cases', function () {
        it('Test failed cases', async function () {
            const {erc20, Alice, Bob} = await loadFixture(deployMyERC20Fixture)
            await erc20.mint(Alice.getAddress(), 1000)
            const balanceAlice = await erc20.balanceOf(Alice.getAddress())
            expect(balanceAlice).to.be.equal(1000)
            await erc20.connect(Alice).approve(Bob.getAddress(), 500)
            //await erc20.connect(Bob).transferFrom(Alice.getAddress(), Bob.getAddress(), 300) // it's ok
            await erc20.connect(Bob).transferFrom(Alice.getAddress(), Bob.getAddress(), 600) // it will fail, pls check traceStack
            const balanceBob = await erc20.balanceOf(Bob.getAddress())
            expect(balanceBob).to.be.equal(300)
        })
    })
  })