const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, burner, Bob, oth, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin, minter, burner)
        return {redo, admin, minter, burner, Bob, oth}
    }

    describe('mint', function () {
        it('it minted successfully', async function () {
            const {redo, Bob, minter} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount)
        })
        it('it failed to mint when role is not minter', async function () {
            const {redo, oth, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(oth).mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
    })

    describe('burn', function () {
        it('it burned successfully', async function () {
            const {redo, minter, burner, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            const toBurn = 300
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            await redo.connect(burner).burn(Bob.getAddress(), toBurn)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount - toBurn)
        })
    })
})




