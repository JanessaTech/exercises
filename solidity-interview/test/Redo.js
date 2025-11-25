const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
   async function deployRedoFxiture() {
    const [admin, bob, bidder1, bidder2] = await ethers.getSigners()
    const MyERC721 = await ethers.getContractFactory('MyERC721')
    const erc721 = await MyERC721.deploy('MyERC721', 'MyERC721')
    const nftId = 1
    await erc721.mint(bob.getAddress(), nftId)
    const Auction = await ethers.getContractFactory('Redo', bob)
    const auction = await Auction.deploy(erc721.getAddress(), nftId)
    await erc721.connect(bob).approve(auction.getAddress(), nftId)
    return {auction, bob, bidder1, bidder2, erc721, nftId}
   }

   describe('init', function () {
    it('init', async function () {
        const {auction, erc721, nftId, bob} = await loadFixture(deployRedoFxiture)
        const owner = await erc721.ownerOf(nftId)
        const spender = await erc721.getApproved(nftId)
        expect(owner).to.be.equal(await bob.getAddress())
        expect(spender).to.be.equal(await auction.getAddress())
    })
   })


   
})




