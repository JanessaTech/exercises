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

describe('Weth_test', function () {
  it('it succeeded when do approve and transferFrom', async function () {
    const [account1, account2, account3, ...others] = await ethers.getSigners()
    const WETH = new ethers.Contract(WETH_ADDRESS, erc20Abi, ethers.provider)
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [WETH_WHALE],
    });
    const wethWhale = await ethers.getSigner(WETH_WHALE)
    await WETH.connect(wethWhale).transfer(account1.address, ethers.parseUnits('10', WETH_DECIMALS))
    const wethBalance1Before = await WETH.balanceOf(account1.address)
    console.log('wethBalance1 before transfer = ', wethBalance1Before)
    await WETH.connect(account1).approve(account2.getAddress(), ethers.parseUnits('2', WETH_DECIMALS))
    await WETH.connect(account2).transferFrom(account1.getAddress(), account2.getAddress(), ethers.parseUnits('1', WETH_DECIMALS))
    const wethBalance1After = await WETH.balanceOf(account1.address)
    const wethBalance2 = await WETH.balanceOf(account2.address)
    console.log('wethBalance1 after transfer = ', wethBalance1After)
    console.log('wethBalance2 after transfer = ', wethBalance2)
  })
  it('it failed when do approve and transferFrom', async function () {
    const [account1, account2, account3, ...others] = await ethers.getSigners()
    const WETH = new ethers.Contract(WETH_ADDRESS, erc20Abi, ethers.provider)
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [WETH_WHALE],
    });
    const wethWhale = await ethers.getSigner(WETH_WHALE)
    await WETH.connect(wethWhale).transfer(account1.address, ethers.parseUnits('10', WETH_DECIMALS))
    const wethBalance1Before = await WETH.balanceOf(account1.address)
    console.log('wethBalance1 before transfer = ', wethBalance1Before)
    await WETH.connect(account1).approve(account2.getAddress(), ethers.parseUnits('2', WETH_DECIMALS))
    await WETH.connect(account2).transferFrom(account1.getAddress(), account2.getAddress(), ethers.parseUnits('3', WETH_DECIMALS))
    const wethBalance1After = await WETH.balanceOf(account1.address)
    const wethBalance2 = await WETH.balanceOf(account2.address)
    console.log('wethBalance1 after transfer = ', wethBalance1After)
    console.log('wethBalance2 after transfer = ', wethBalance2)
  })
})