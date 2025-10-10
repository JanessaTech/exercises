const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
   async function deployRedoFixture() {
    const [owner, bob, ...others] = await ethers.getSigners()
    const Redo = await ethers.getContractFactory('Redo')
    const redo = await Redo.deploy(owner)
    return {redo, owner, bob}
   }

   describe('mint', function () {
    it('it minted successfully', async function () {
        const {redo, owner, bob} = await loadFixture(deployRedoFixture)
        const tokenURI = 'aaaa'
        await redo.connect(owner).mint(bob.getAddress(), tokenURI)
        const url = await redo.tokenURI(0)
        console.log(url)
        
    })
  
   })
})




