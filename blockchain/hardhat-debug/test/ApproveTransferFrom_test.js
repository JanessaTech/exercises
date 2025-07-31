const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { ethers } = require("hardhat");

const erc20Abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint256)",
    "function approve(address,uint256) returns (bool)",
    "function transfer(address, uint256) returns (bool)",
    "function transferFrom(address,address,uint256) returns (bool)",
    "function allowance(address,address) view returns (uint256)"
  ];
  
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const WETH_WHALE='0x3ee18B2214AFF97000D974cf647E7C347E8fa585';
  const WETH_DECIMALS = 18; 

describe('ApproveTransferFromDelegator', function () {
    async function deployApproveTransferFromFixture() {
        const [account1, account2, account3, ...others] = await ethers.getSigners()
        const WETH = new ethers.Contract(WETH_ADDRESS, erc20Abi, ethers.provider)
        await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [WETH_WHALE],
        });
        const wethWhale = await ethers.getSigner(WETH_WHALE)
        await WETH.connect(wethWhale).transfer(account2.address, ethers.parseUnits('10', WETH_DECIMALS))
        const ApproveTransferFromDelegator = await ethers.getContractFactory('ApproveTransferFromDelegator', account2)
        const approveTransferFromDelegator = await ApproveTransferFromDelegator.deploy(WETH.getAddress())

        await WETH.connect(account2).approve(approveTransferFromDelegator.getAddress(), ethers.parseUnits('2', WETH_DECIMALS))
        return {approveTransferFromDelegator, WETH, account2, account3}
    }
    describe('init', function () {
      it('init', async function () {
        const {approveTransferFromDelegator, WETH, account2} = await loadFixture(deployApproveTransferFromFixture)
        const balanceAccount2 = await WETH.balanceOf(account2.getAddress())
        expect(balanceAccount2).to.be.equal(ethers.parseUnits('10', WETH_DECIMALS))
        const allowance = await WETH.allowance(account2.getAddress(), approveTransferFromDelegator.getAddress())
        expect(allowance).to.be.equal(ethers.parseUnits('2', WETH_DECIMALS))
      })
    })
    describe('transfer', function () {
      it('transfer ok', async function () {
        const {approveTransferFromDelegator, WETH, account2, account3} = await loadFixture(deployApproveTransferFromFixture)
        await approveTransferFromDelegator.transfer(account3.getAddress(), ethers.parseUnits('1', WETH_DECIMALS))
        const balanceAccount3 = await WETH.balanceOf(account3.getAddress())
        expect(balanceAccount3).to.be.equal(ethers.parseUnits('1', WETH_DECIMALS))
      })
      it('transfer failed', async function () {
        const {approveTransferFromDelegator, WETH, account2, account3} = await loadFixture(deployApproveTransferFromFixture)
        await approveTransferFromDelegator.transfer(account3.getAddress(), ethers.parseUnits('3', WETH_DECIMALS))
      })
    })
})