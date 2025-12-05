const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment, extendProvider } = require("hardhat/config");
const { arrayBuffer } = require("stream/consumers");

describe('MyERC20Token', function () {
    async function deployFixture() {
        const [minter,non_minter, bob, alice, ...others] = await ethers.getSigners()
        const MyERC20Token = await ethers.getContractFactory('MyERC20Token')
        const erc20 = await MyERC20Token.deploy('MyERC20Token', 'MyERC20Token', 3)
        return {erc20, minter, non_minter, bob, alice}
    }

    describe('init', function () {
        it('init', async function () {
            const {erc20, admin} = await loadFixture(deployFixture)
        })
    })
    describe('mint', function () {
        
    })
    describe('transfer', function() {
        
    })
    describe('transferFrom', function () {
        
    })
})