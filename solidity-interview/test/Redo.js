const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { extendConfig } = require("hardhat/config");



describe('Redo', function () {
    async function deployRedoFixture() {
        const [deployer, Bob, bidder1, bidder2, ...other] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', deployer)
        const name = 'MyERC721'
        const symbol = 'MyERC721'
        const nftId = 0
        const erc721 = await MyERC721.deploy(name, symbol)
        await erc721.mint(Bob.getAddress(), nftId)

        const Auction = await ethers.getContractFactory('Redo', Bob)
        const auction = await Auction.deploy(erc721.getAddress(), nftId)

        await erc721.connect(Bob).approve(auction.getAddress(), nftId)
        return {auction, erc721, nftId, Bob, bidder1, bidder2}
    }

    describe('init', function () {
        it('init', async function () {
            const {auction, erc721, nftId, Bob} = await loadFixture(deployRedoFixture)
            const owner = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await auction.getAddress())
        })
    })
})




