const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, minter, burner, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const name = 'aclerc20'
        const symbol = 'aclerc20'
        const redo = await Redo.deploy(name, symbol, admin.getAddress(), minter.getAddress(), burner.getAddress())
        return {redo}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
        })
        
    })
})




