const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, burner, Bob, non, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin, minter, burner)
        return {redo, admin, minter, burner, Bob, non}
    }

    describe('mint', function () {
        it('it minted successfull', async function () {
            const {redo, Bob, minter} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount)

        })   
    })
    describe('burn', function () {
        it('it burned successfully', async function () {
            const {redo, Bob, minter, burner} = await loadFixture(deployRedoFixture)
            const amount = 1000
            const toBurn = 300
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            await redo.connect(burner).burn(Bob.getAddress(), toBurn)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount - toBurn)
        })
        it('it failed to burn when it is not burner', async function () {
            const {redo, Bob, minter, non} = await loadFixture(deployRedoFixture)
            const amount = 1000
            const toBurn = 300
            await redo.connect(minter).mint(Bob.getAddress(), amount)
            await expect(redo.connect(non).burn(Bob.getAddress(), toBurn)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
    })
})




