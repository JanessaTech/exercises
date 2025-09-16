const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, burner, Bob, non, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin.getAddress(), minter.getAddress(), burner.getAddress())
        return {redo, admin, minter, burner, Bob, non}
    }
    describe('mint', function () {
        it('it minted successfully', async function () {
            const {redo, minter, Bob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(minter).mint(Bob.getAddress(), 1000)).not.to.be.reverted
        })
        it('it failed to mint', async function () {
            const {redo, non, Bob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(non).mint(Bob.getAddress(), 1000)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
    })
    describe('burn', function () {
        it('it burned successfully', async function () {
            const {redo, minter, burner, Bob} = await loadFixture(deployRedoFixture)
            await redo.connect(minter).mint(Bob.getAddress(), 1000)
            await redo.connect(burner).burn(Bob.getAddress(), 300)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(700)
        })
    })

    
})




