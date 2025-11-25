const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment, extendProvider } = require("hardhat/config");

describe('Redo', function () {
   async function deployRedoFxiture() {
    const [admin, minter, burner, bob, non, ...other] = await ethers.getSigners()
    const Redo = await ethers.getContractFactory('Redo')
    const redo = await Redo.deploy(admin.getAddress(), minter.getAddress(), burner.getAddress())
    return {redo, minter, burner, bob, non}
   }

   describe('mint', function () {
    it('it failed to mint when it is not minter', async function () {
       const {redo, bob, non} = await loadFixture(deployRedoFxiture)
       await expect(redo.connect(non).mint(bob.getAddress(), 1000)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
       
    })
    it('it minted successfully', async function () {
      const {redo, minter, bob} = await loadFixture(deployRedoFxiture)
      await expect(redo.connect(minter).mint(bob.getAddress(), 1000)).not.to.be.revertedWith
    })
   })
   describe('burn', function () {
    it('it failed to burn when it is not burner', async function () {
        const {redo, non, bob} = await loadFixture(deployRedoFxiture)
        await expect(redo.connect(non).burn(bob.getAddress(), 1000)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
    })
    it('it burned successfully', async function () {
        const {redo, minter, burner, bob} = await loadFixture(deployRedoFxiture)
        await redo.connect(minter).mint(bob.getAddress(), 1000)
        await expect(redo.connect(burner).burn(bob.getAddress(), 300))
        const balance = await redo.balanceOf(bob.getAddress())
        expect(balance).to.be.equal(700)
    })
    
   })

   
})




