const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, burner,non, Bob,  ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin, minter, burner)
        return {redo, minter, burner, non, Bob  }
    }  
    describe('mint', function () {
        it('it failed to mint when it is not minter', async function () {
            const {redo, non, Bob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(non).mint(Bob.getAddress(), 1000)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')

        })
        it('it minted successfully', async function () {
            const {redo, minter, Bob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(minter).mint(Bob.getAddress(), 1000)).not.to.be.reverted
        })
    })
    describe('burn', function () {
        it('it burned succesfully', async function () {
            const {redo, minter, burner, Bob} = await loadFixture(deployRedoFixture)
            await redo.connect(minter).mint(Bob.getAddress(), 1000)
            await redo.connect(burner).burn(Bob.getAddress(), 300)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(700)
        })
    })
    
})




