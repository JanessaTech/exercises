const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, user1, user2, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const erc721 = await MyERC721.deploy('MyERC721', 'MyERC721')
        const tokenId  = 1
        await erc721.mint(Bob.getAddress(), tokenId)

        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), tokenId)
        await erc721.connect(Bob).approve(redo.getAddress(), tokenId)

        return {redo, erc721, tokenId, Bob, user1, user2}
    }  
    describe('init', function () {
        it('init', async function () {
            const {redo, erc721, tokenId, Bob} = await loadFixture(deployRedoFixture)
            const owner = await erc721.ownerOf(tokenId)
            const spender = await erc721.getApproved(tokenId)
            expect(owner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await redo.getAddress())
        })
    })  
    describe('start', function () {

    })
    describe('bid', function () {

    })

    describe('withdraw', function () {

    })
    describe('end', function () {
        
    })
})




