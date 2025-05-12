const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo, Bob}
    }
    describe('safeMint', function () {
        it('safeMint', async function () {
            const {redo, Bob} = await loadFixture(deployRedoFixture)
            const tokenURI = 'aaaaaa'
            await redo.safeMint(Bob.getAddress(), tokenURI)
            const owner = await redo.ownerOf(0)
            const url = await redo.tokenURI(0)
            expect(owner).to.be.equal(await Bob.getAddress())
            console.log(url)
        })
    })
})




