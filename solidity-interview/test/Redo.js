const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
   async function deployRedoFixture() {
    const [admin, minter, burner, bob, non, ...others] = await ethers.getSigners()
    const Redo = await ethers.getContractFactory('Redo')
    const redo = await Redo.deploy(admin, minter, burner)
    return {redo, minter, burner, bob, non}
   }

   describe('mint & burn', function () {
    it('it failed to mint when it is not minter', async function () {
        const {redo, minter, bob, non} = await loadFixture(deployRedoFixture)
        await expect(redo.connect(non).mint(bob.getAddress(), 1000)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        
    })
    it('it minted successfully', async function () {
        const {redo, minter, bob} = await loadFixture(deployRedoFixture)
        const amount = 1000
        await expect(redo.connect(minter).mint(bob.getAddress(), amount)).not.to.be.reverted
        const balance = await redo.balanceOf(bob.getAddress())
        expect(balance).to.be.equal(amount)
    })
    it('it failed burn when there is not enough to burn', async function () {
        const {redo, burner, bob, minter} = await loadFixture(deployRedoFixture)
        await expect(redo.connect(burner).burn(bob.getAddress(), 1000)).to.be.revertedWith('not enough to burn')
    })
    it('it burned successfully', async function () {
        const {redo, burner, bob, minter} = await loadFixture(deployRedoFixture)
        await redo.connect(minter).mint(bob.getAddress(), 1000)
        await expect(redo.connect(burner).burn(bob.getAddress(), 300)).not.to.be.reverted
        const balance = await redo.balanceOf(bob.getAddress())
        expect(balance).to.be.equal(700)
    })
   })
})




