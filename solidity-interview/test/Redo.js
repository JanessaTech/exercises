const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment, extendProvider } = require("hardhat/config");

describe('Redo', function () {
   async function deployRedoFxiture() {
    const [admin, bob, ...other] = await ethers.getSigners()
    const Redo = await ethers.getContractFactory('Redo')
    const redo = await Redo.deploy(admin.getAddress())
    return {redo, admin, bob}
   }

   describe('mint', function () {
    it('it minted', async function () {
       const {redo, bob} = await loadFixture(deployRedoFxiture)
       const uri = 'aaa'
       await redo.mint(bob.getAddress(), uri)
       const url = await redo.tokenURI(0)
       console.log(url)
    })
    

   
})
})




