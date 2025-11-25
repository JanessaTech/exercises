const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
   async function deployRedoFxiture() {
    const [admin, bob, nonbob, bidder1, bidder2] = await ethers.getSigners()
    const MyERC721 = await ethers.getContractFactory('MyERC721')
    const erc721 = await MyERC721.deploy('MyERC721', 'MyERC721')
    const nftId = 1
    await erc721.mint(bob.getAddress(), nftId)
    const Auction = await ethers.getContractFactory('Redo', bob)
    const auction = await Auction.deploy(erc721.getAddress(), nftId)
    await erc721.connect(bob).approve(auction.getAddress(), nftId)
    const seven_days = 60 * 60 * 24 * 7
    return {auction, bob, nonbob, bidder1, bidder2, erc721, nftId, seven_days}
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
   describe('start', function () {
    it('it failed to start when it is not owner', async function () {
        const {auction, nonbob} = await loadFixture(deployRedoFxiture)
        await expect(auction.connect(nonbob).start()).to.be.revertedWith('not owner')
    })
    it('it is started successfully', async function () {
        const {auction, bob, erc721, nftId} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        const owner = await erc721.ownerOf(nftId)
        expect(owner).to.be.equal(await auction.getAddress())
    })
    it('it failed to start when it is started', async function () {
        const {auction, bob} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        await expect(auction.connect(bob).start()).to.be.revertedWith('started')
    })
   })
   describe('bid', function () {
    it('it failed to bid when it is not started', async function () {
        const {auction, bidder1} = await loadFixture(deployRedoFxiture)
        await expect(auction.connect(bidder1).bid({value: 1000})).to.be.revertedWith('not started')

    })
    it('it failed to bid when it is ended', async function() {
        const {auction, bob, bidder1, seven_days} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        const latest = await time.latest()
        await time.setNextBlockTimestamp(latest + seven_days)
        await expect(auction.connect(bidder1).bid({value: 1000})).to.be.revertedWith('ended')
    })
    it('it failed to bid when msg.value <= highestBid', async function () {
        const {auction, bidder1, bidder2, bob} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        await auction.connect(bidder1).bid({value: 1000})
        await expect(auction.connect(bidder2).bid({value: 900})).to.be.revertedWith('msg.value <= highestBid')
    })
    it('it bidded successfully', async function () {
        const {auction, bob, bidder1, bidder2} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        await auction.connect(bidder1).bid({value: 1000})
        await expect(auction.connect(bidder2).bid({value: 2000})).to.emit(auction, 'Bid').withArgs(bidder2.getAddress(), 2000)
    })
   })
   describe('withdraw', function () {
    it('it withdrow successfully', async function(){
        const {auction, bob, bidder1, bidder2} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        await auction.connect(bidder1).bid({value: 1000})
        await auction.connect(bidder2).bid({value: 2000})
        await expect(auction.connect(bidder1).withdraw()).to.emit(auction, "Withdraw").withArgs(bidder1.getAddress(), 1000)
    })
   })
   describe('end', function () {
    it('it failed to end when it is not owner', async function () {
        const {auction, nonbob} = await loadFixture(deployRedoFxiture)
        await expect(auction.connect(nonbob).start()).to.be.revertedWith('not owner')
    })
    it('it failed to end when it is not started', async function () {
        const {auction, bob} = await loadFixture(deployRedoFxiture)
        await expect(auction.connect(bob).end()).to.be.revertedWith('not started')
    })
    it('it failed to end when the end is not reached', async function () {
        const {auction, bob} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        await expect(auction.connect(bob).end()).to.be.revertedWith('the end is not reached')
    })
    it('it bidded successfully when there is not bidder at all', async function () {
        const {auction, bob, seven_days, erc721, nftId} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        const latest = await time.latest()
        await time.setNextBlockTimestamp(latest + seven_days)
        await expect(auction.connect(bob).end()).to.emit(auction, 'End').withArgs(bob.getAddress())
        const owner = await erc721.ownerOf(nftId)
        expect(owner).to.be.equal(await bob.getAddress())
    })
    it('it bidded successfully when there are more than 1 bidder', async function () {
        const {auction, bob, bidder1, bidder2, seven_days, erc721, nftId} = await loadFixture(deployRedoFxiture)
        await auction.connect(bob).start()
        await auction.connect(bidder1).bid({value: 1000})
        await auction.connect(bidder2).bid({value: 2000})
        const latest = await time.latest()
        await time.setNextBlockTimestamp(latest + seven_days)
        await expect(auction.connect(bob).end()).to.emit(auction, 'End').withArgs(bob.getAddress())
        const owner = await erc721.ownerOf(nftId)
        expect(owner).to.be.equal(await bidder2.getAddress())
    })
   })


   
})




