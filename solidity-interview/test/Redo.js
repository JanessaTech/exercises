const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, nonadmin, minter, burner, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const name = 'aclerc20'
        const symbol = 'aclerc20'
        const redo = await Redo.deploy(name, symbol, admin.getAddress(), minter.getAddress(), burner.getAddress())
        return {redo, admin, nonadmin, minter, burner, Bob}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
        })  
    })
    describe('mint', function () {
        it('it minted successfully', async function () {
            const {redo, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(minter).mint(Bob.getAddress(), amount)).not.to.be.reverted
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(amount)
        })
        it('it failed to mint when it is not the minter', async function () {
            const {redo, Bob}= await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
    })
    describe('burn', function () {
        it('it burned the token successfully', async function () {
            const {redo, burner,minter, Bob} = await loadFixture(deployRedoFixture)
            const amount  = 1000
            await redo.connect(minter).mint(Bob.getAddress(), 1000)
            await redo.connect(burner).burn(Bob.getAddress(), 300)
            const balance = await redo.balanceOf(Bob.getAddress())
            expect(balance).to.be.equal(700)
        })
        it('it failed to burn when it is not burner', async function () {
            const {redo, minter, burner, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.connect(minter).mint(Bob.getAddress(), 1000)
            await expect(redo.burn(Bob.getAddress(), 300)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
    })

    describe('revokeMinter', function () {
        it('it revoked successfully', async function () {
            const {redo, admin, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(minter).mint(Bob.getAddress(), amount)).not.to.be.reverted
            await redo.connect(admin).revokeMinter(minter)
            await expect(redo.connect(minter).mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')

        })
        it('it failed to revoke when it is not admin', async function () {
            const {redo, admin, nonadmin, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(minter).mint(Bob.getAddress(), amount)).not.to.be.reverted
            await expect(redo.connect(nonadmin).revokeMinter(minter)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
    })
})




