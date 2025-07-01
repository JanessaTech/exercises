const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, burner, other, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin, minter, burner)
        return {redo, admin, minter, burner, other, Bob}
    }
    describe('mint', function () {
        it('it failed to mint when it is not minter', async function () {
            const {redo, other, Bob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(other).mint(Bob.getAddress(), 1000)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
        it('it minted successfully', async function () {
            const {redo, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount)
        })
    })
    describe('burn', function () {
        it('it burned successfully', async function () {
            const {redo, burner, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            const toburn = 300
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            await redo.connect(burner).burn(Bob.getAddress(), toburn)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount - toburn)
        })
    })
   
})




