const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, buner, Bob, other, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin, minter, buner)
        return {redo, admin, minter, buner, Bob, other}
    }
    describe('mint', function () {
        it('it minted successfully', async function () {
           const {redo, minter, Bob, other} = await loadFixture(deployRedoFixture)
           const amount = 1000
           await redo.connect(minter).mint(Bob.getAddress(), amount)
           const balance = await redo.balanceOf(Bob.getAddress())
           expect(balance).to.be.equal(amount)
        })
        it('it failed to mint', async function() {
            const {redo, other, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(other).mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
    })
    describe('burn', function () {
        it('it burned successfully', async function () {
            const {redo, buner, Bob, minter} = await loadFixture(deployRedoFixture)
            const amount = 1000
            const toburn = 300
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            await redo.connect(buner).burn(Bob.getAddress(), toburn)
            const balance  = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount - toburn)

        })
    })
    
})




