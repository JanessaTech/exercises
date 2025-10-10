const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
   async function deployRedoFixture() {
    const [admin, Bob, biderA, biderB, nonBob, ...others] = await ethers.getSigners()
    const MyERC721 = await ethers.getContractFactory('MyERC721')
    const nft = await MyERC721.deploy('MyERC721', 'MyERC721')
    const tokenId = 1
    await nft.mint(Bob.getAddress(), tokenId)
    const Aution = await ethers.getContractFactory('Redo', Bob)
    const auction = await Aution.deploy(nft.getAddress(), tokenId)
    nft.connect(Bob).approve(auction.getAddress(), tokenId)
    const seven_days = 60 * 60 * 24 * 7
    return {auction, nft, tokenId, Bob, biderA, biderB, nonBob, seven_days}
   }

   describe('init', function () {
    it('init', async function () {
        const {auction, nft, tokenId, Bob} = await loadFixture(deployRedoFixture)
        const owner = await nft.ownerOf(tokenId)
        const spender = await nft.getApproved(tokenId)
        expect(owner).to.be.equal(await Bob.getAddress())
        expect(spender).to.be.equal(await auction.getAddress())
    })
   })
   describe('start', function () {
    it('it failed to start when it is not owner', async function () {
        const {auction, nonBob} = await loadFixture(deployRedoFixture) 
        await expect(auction.connect(nonBob).start()).to.be.revertedWith('not owner')
    })
    it('it started successfully', async function () {
        const {auction, nft, tokenId, Bob} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        const owner = await nft.ownerOf(tokenId)
        expect(owner).to.be.equal(await auction.getAddress())
    })
    it('it failed to start when it is already started', async function () {
        const {auction, Bob} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        await expect(auction.connect(Bob).start()).to.be.revertedWith('started')
    })
   })

   describe('bid', function () {
    it('it failed to bid when it is not started', async function () {
        const {auction, Bob, biderA} = await loadFixture(deployRedoFixture)
        await expect(auction.connect(biderA).bid({value: 1000})).to.be.revertedWith('not started')
    })
    it('it failed to bid when it is ended',  async function () {
        const {auction, Bob, biderA, seven_days} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        const latest = await time.latest()
        await time.setNextBlockTimestamp(latest + seven_days)
        await expect(auction.connect(biderA).bid({value: 1000})).to.be.revertedWith('ended')
    })
    it('it failed to bid when msg.value <= highestBid', async function () {
        const {auction, biderA, biderB, Bob} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        await auction.connect(biderA).bid({value: 1000})
        await expect(auction.connect(biderB).bid({value: 500})).to.be.revertedWith('msg.value <= highestBid')
    })
    it('it bidded successfully', async function () {
        const {auction, biderA, biderB, Bob} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        await expect(auction.connect(biderA).bid({value: 1000})).to.emit(auction, 'Bid').withArgs(biderA.getAddress(), 1000)
    })
   })

   describe('withdraw', function () {
    it('withdraw', async function () {
        const {auction, biderA, biderB, Bob} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        await auction.connect(biderA).bid({value: 1000})
        await auction.connect(biderB).bid({value: 2000})
        await expect(auction.connect(biderA).withdraw()).to.emit(auction, 'Withdraw').withArgs(biderA.getAddress(), 1000)
    })
   })

   describe('end', function () {
    it('it failed end when it is not owner', async function () {
        const {auction, nonBob} = await loadFixture(deployRedoFixture)
        await expect(auction.connect(nonBob).end()).to.be.revertedWith('not owner')
    })
    it('it failed to end when it is not started', async function () {
        const {auction, Bob} = await loadFixture(deployRedoFixture)
        await expect(auction.connect(Bob).end()).to.be.revertedWith('not started')
    })
    it('it failed to end when it not ended', async function () {
        const {auction, Bob} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        await expect(auction.connect(Bob).end()).to.be.revertedWith('not ended')
    })
    it('it ended successfully when there is no biders at all', async function () {
        const {auction, Bob, seven_days, nft, tokenId} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        const latest = await time.latest()
        await time.setNextBlockTimestamp(latest + seven_days)
        await expect(auction.connect(Bob).end()).to.emit(auction, 'End').withArgs(Bob.getAddress())
        const owner = await nft.ownerOf(tokenId)
        expect(owner).to.be.equal(await Bob.getAddress())

    })
    it('it ended successfully when there is at least 1 bidder', async function () {
        const {auction, Bob, seven_days, biderA, biderB, nft, tokenId} = await loadFixture(deployRedoFixture)
        await auction.connect(Bob).start()
        await auction.connect(biderA).bid({value: 1000})
        await auction.connect(biderB).bid({value: 2000})
        const latest = await time.latest()
        await time.setNextBlockTimestamp(latest + seven_days)
        await auction.connect(Bob).end()
        const owner = await nft.ownerOf(tokenId)
        expect(owner).to.be.equal(await biderB.getAddress())
    })
   })
})




