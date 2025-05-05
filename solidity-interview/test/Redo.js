const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, nonadmin, minter, burner, Bob,...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const name = 'aclerc20'
        const symbol = 'aclerc20'

        const redo = await Redo.deploy(name, symbol, admin.getAddress(), minter.getAddress(), burner.getAddress())
        return {redo, admin, nonadmin, minter, burner, Bob}

    }
    describe('mint', function () {
        it('it failed to mint when it is not minter', async function () {
            const {redo, minter, nonadmin, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(nonadmin).mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })  
        it('it minted successfully', async function () {
            const {redo, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(minter).mint(Bob.getAddress(), amount)).not.to.be.reverted
        })
    })
    describe('burn', function () {
        it('it failed to burn when it is not burner', async function () {
            const {redo, Bob, burner, nonadmin, minter} = await loadFixture(deployRedoFixture)
            const amount = 1000
            const toBurn = 300
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            await expect(redo.connect(nonadmin).burn(Bob.getAddress(), toBurn)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')

        })
        it('it burned successfully', async function () {
            const {redo, minter, burner, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            const toBurn = 300
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            await redo.connect(burner).burn(Bob.getAddress(), toBurn)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(700)
        })
    })
    
})




