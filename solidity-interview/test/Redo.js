const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin)
        return {redo, admin, Bob}
    }
    describe('mint', function () {
        it('it minted successfully', async function () {
            const {redo, Bob} = await loadFixture(deployRedoFixture)
            const tokenURI = 'aaaa'
            await redo.mint(Bob.getAddress(), tokenURI)
            const owner = await redo.ownerOf(0)
            expect(owner).to.be.equal(await Bob.getAddress())
            const full = await redo.tokenURI(0)
            console.log(full)
        })
    })
    
})




