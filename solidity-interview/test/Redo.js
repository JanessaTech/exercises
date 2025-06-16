const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, burner, non, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin, minter, burner)
        return {redo, admin, minter, burner, non, Bob}
    }

    describe('mint', function () {
        it('it failed mint when it is not minter', async function () {
            const {redo, non, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(non).mint(Bob.getAddress(), amount)).to.be.revertedWithCustomError(redo, 'AccessControlUnauthorizedAccount')
        })
        it('it minted successfully', async function () {
            const {redo, minter, Bob} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(minter).mint(Bob.getAddress(), amount)).not.reverted
        })
    })
})




