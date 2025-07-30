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
    "function transferFrom(address,address,uint256) returns (bool)"
  ];
  
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const WETH_WHALE='0x3ee18B2214AFF97000D974cf647E7C347E8fa585';
  const WETH_DECIMALS = 18; 

describe('ApproveTransferFrom', function () {
    async function deployApproveTransferFromFixture() {
        const [account1, account2, account3, ...others] = await ethers.getSigners()
        const WETH = new ethers.Contract(WETH_ADDRESS, erc20Abi, ethers.provider)
        await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [WETH_WHALE],
        });
        const wethWhale = await ethers.getSigner(WETH_WHALE)
        await WETH.connect(wethWhale).transfer(account1.address, ethers.parseUnits('10', WETH_DECIMALS))
        const wethBalance1Before = await WETH.balanceOf(account1.address) 

        const ApproveTransferFromDelegator = await ethers.getContractFactory('ApproveTransferFrom')
        const approveTransferFromDelegator = await ApproveTransferFromDelegator.deploy(WETH.getAddress())

        await WETH.approve()



        
 
    }
    describe('execute', function () {

    })
})