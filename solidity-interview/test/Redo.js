const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin , Bob, nonBob, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const name = 'testERC721'
        const symbol = 'test'
        const erc721 = await MyERC721.deploy(name, symbol)
        const tokenId = 1
        await erc721.mint(Bob.getAddress(), tokenId)
        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), tokenId)
        await erc721.connect(Bob).approve(redo.getAddress(), tokenId)
        return {redo, erc721, tokenId, Bob, nonBob}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo, erc721, Bob, tokenId} = await loadFixture(deployRedoFixture)
            const owner = await erc721.ownerOf(tokenId)
            const spender = await erc721.getApproved(tokenId)
            expect(owner).to.be.equal(Bob.address)
            expect(spender).to.be.equal(await redo.getAddress())
        })
    })
    
})




