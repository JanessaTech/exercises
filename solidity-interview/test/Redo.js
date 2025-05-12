const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, burner, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin, minter, burner, Bob)
        return {redo, admin, minter, burner, Bob}
    }
    describe('mint', function () {
        it('it minted successfully', async function () {
            const {redo, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount)
        })
        it('it failed to mint when it is not minter to call mint', async function () {
            const {redo, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
    })
    describe('burn', function () {
        it('it burned successfully', async function () {
            const {redo, burner, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            const toBurn = 200
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            await redo.connect(burner).burn(Bob.getAddress(), toBurn)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount - toBurn)
        })
        

    })
})




