const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, userA, userB, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const erc721 = await MyERC721.deploy('MyERC721', 'MyERC721')
        const nftId = 0;
        await erc721.mint(Bob.getAddress(), nftId)
        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), nftId)
        await erc721.connect(Bob).approve(redo.getAddress(), nftId)
        return {redo, erc721, nftId, Bob, userA, userB}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo, erc721, nftId, Bob} = await loadFixture(deployRedoFixture)
            const owner = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await redo.getAddress())
        })
    })
})




