const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [deployer, Bob, nonBob, bidder1, bidder2, ...other] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', deployer)
        const name = 'MyERC721'
        const symbol = 'MyERC721'
        const nftId = 0
        const erc721 = await MyERC721.deploy(name, symbol)
        await erc721.mint(Bob.getAddress(), nftId)

        const seven_days = 60 * 60 * 24 * 7

        const Auction = await ethers.getContractFactory('Redo', Bob)
        const auction = await Auction.deploy(erc721.getAddress(), nftId)

        await erc721.connect(Bob).approve(auction.getAddress(), nftId)
        return {auction, erc721, nftId, Bob, nonBob, bidder1, bidder2, seven_days}
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
    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {auction, nonBob} = await loadFixture(deployRedoFixture)
            await expect(auction.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfully', async function () {
            const {auction, erc721, nftId} = await loadFixture(deployRedoFixture)
            await expect(auction.start()).to.emit(auction, 'Start')
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await auction.getAddress())
        })
        it('it failed to start when it is already started', async function () {
            const {auction} = await loadFixture(deployRedoFixture)
            await auction.start()
            await expect(auction.start()).to.be.revertedWith('started')
        })
    })
    describe('bid', function () {
        it('it failed to bid when it is not started', async function () {
            const {auction, bidder1} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(auction.connect(bidder1).bid({value: amount})).to.be.revertedWith('not started')
        })
        it('it failed to bid when it is ended', async function () {
            const {auction, seven_days} = await loadFixture(deployRedoFixture)
            await auction.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            const amount = 1000
            await expect(auction.bid({value : amount})).to.be.revertedWith('ended')
        })
        it('it bidded succesfully', async function () {
            const {auction, bidder1} = await loadFixture(deployRedoFixture)
            await auction.start()
            const amount = 1000
            await expect(auction.connect(bidder1).bid({value: amount})).to.emit(auction, 'Bid').withArgs(bidder1.getAddress(), amount)

        })
        it('it failed to bid when it is not the highest', async function () {
            const {auction, bidder1, bidder2} = await loadFixture(deployRedoFixture)
            await auction.start()
            const amount1 = 1000
            const amount2 = 500
            await auction.connect(bidder1).bid({value: amount1})
            await expect(auction.connect(bidder2).bid({value: amount2})).to.be.revertedWith('msg.value <= highestBid')
        })
    })
    describe('withdraw', function () {
        it('withdraw', async function () {
            const {auction, bidder1, bidder2} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await auction.start()

            await auction.connect(bidder1).bid({value: amount1})
            await auction.connect(bidder2).bid({value: amount2})

            await expect(auction.connect(bidder1).withdraw()).to.emit(auction, 'Withdraw').withArgs(bidder1.getAddress(), amount1)
        })
    })
    describe('end', function () {
        it('it failed to end when it is not owner', async function () {
            const {auction, nonBob} = await loadFixture(deployRedoFixture)
            await expect(auction.connect(nonBob).end()).to.be.revertedWith('not owner')
        })
        it('it failed to end when it is not started', async function () {
            const {auction} = await loadFixture(deployRedoFixture)
            await expect(auction.end()).to.be.revertedWith('not started')
        })
        it('it failed to end when the end time is not reached', async function () {
            const {auction} = await loadFixture(deployRedoFixture)
            await auction.start()
            await expect(auction.end()).to.be.revertedWith('not ended')
        })
        it('it ended successfully when no one bidded', async function () {
            const {auction, seven_days, erc721, nftId, Bob} = await loadFixture(deployRedoFixture)
            await auction.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await auction.end()

            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())

        })
        it('it ended successfully when at least one bidder', async function () {
            const {auction, bidder1, bidder2, erc721, nftId, seven_days} = await loadFixture(deployRedoFixture)
            await auction.start()
            const latest = await time.latest()
            const amount1 = 1000
            const amount2 = 2000
            await auction.connect(bidder1).bid({value: amount1})
            await auction.connect(bidder2).bid({value: amount2})
            await time.setNextBlockTimestamp(latest + seven_days)
            await auction.end()
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await bidder2.getAddress())
        })
    })

})




