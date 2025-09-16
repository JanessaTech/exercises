const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, nonBob, userA, userB, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const nft = await MyERC721.deploy('MyERC721', 'MyERC721')
        const tokenId = 1
        await nft.mint(Bob.getAddress(), tokenId)
        const Auction = await ethers.getContractFactory('Redo', Bob)
        const aution = await Auction.deploy(await nft.getAddress(), tokenId)
        await nft.connect(Bob).approve(await aution.getAddress(), tokenId)
        const seven_days = 60 * 60 * 24 * 7
        return {nft, tokenId, aution, Bob, nonBob, userA, userB, seven_days}
    }
    describe('init', function () {
        it('it inited successfully', async function () {
            const {aution, nft, tokenId, Bob} = await loadFixture(deployRedoFixture)
            const owner = await nft.ownerOf(tokenId)
            const spender = await nft.getApproved(tokenId)
            expect(owner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await aution.getAddress())
        })
    })
    describe('start', function () {
        it('it failed to start when it is not Bob', async function () {
            const {aution, nonBob} = await loadFixture(deployRedoFixture)
            await expect(aution.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it is started successfully', async function () {
            const {aution, nft, tokenId} = await loadFixture(deployRedoFixture)
            await expect(aution.start()).to.emit(aution, 'Start')
            const owner = await nft.ownerOf(tokenId)
            expect(owner).to.be.equal(await aution.getAddress())
        })
        it('it failed to start when it is started', async function () {
            const {aution} = await loadFixture(deployRedoFixture)
            await aution.start()
            await expect(aution.start()).to.be.revertedWith('started')
        })
    })
    describe('bid', function () {
        it('it failed to bid when it is not started', async function () {
            const {aution, userA} = await loadFixture(deployRedoFixture)
            await expect(aution.connect(userA).bid({value: 1000})).to.be.revertedWith('not started')

        })
        it('it failed to bid when it is ended', async function () {
            const {aution, seven_days, userA} = await loadFixture(deployRedoFixture)
            await aution.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await expect(aution.connect(userA).bid({value: 1000})).to.be.revertedWith('ended')
        })
        it('it failed to bid when msg.value <= highestBid', async function () {
            const {aution, userA, userB} = await loadFixture(deployRedoFixture)
            await aution.start()
            await aution.connect(userA).bid({value: 1000})
            await expect(aution.connect(userB).bid({value: 500})).to.be.revertedWith('msg.value <= highestBid')
        })
        it('it bidded successfully', async function () {
            const {aution, userA, userB} = await loadFixture(deployRedoFixture)
            await aution.start()
            await expect(aution.connect(userA).bid({value: 1000})).not.to.be.reverted
            await expect(aution.connect(userB).bid({value: 2000})).not.to.be.reverted
        })
    })
    describe('withdraw', function () {
        it('it withdraw successfully', async function () {
            const {aution, userA, userB} = await loadFixture(deployRedoFixture)
            await aution.start()
            await aution.connect(userA).bid({value: 1000})
            await aution.connect(userB).bid({value: 2000})
            await expect(aution.connect(userA).withdraw()).to.emit(aution, 'Withdraw').withArgs(userA.getAddress(), 1000)

        })
    })
    describe('end', function () {
        it('it failed to end when it is not owner', async function () {
            const {aution, nonBob} = await loadFixture(deployRedoFixture)
            await expect(aution.connect(nonBob).end()).to.be.revertedWith('not owner')
        })
        it('it failed to end when it is not started', async function () {
            const {aution} = await loadFixture(deployRedoFixture)
            await expect(aution.end()).to.be.revertedWith('not started')
        })
        it('it failed to end when it is not end', async function () {
            const {aution} = await loadFixture(deployRedoFixture)
            await aution.start()
            await expect(aution.end()).to.be.revertedWith('not ended')
        })
        it('it ended successfully when there is no bider at all', async function () {
            const {aution, Bob, seven_days, nft, tokenId} = await loadFixture(deployRedoFixture)
            await aution.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await aution.end()
            const owner = await nft.ownerOf(tokenId)
            expect(owner).to.be.equal(await Bob.getAddress())

        })
        it('it ended successfully when there is at least 1 bidder', async function () {
            const {aution, userA, userB, seven_days, nft, tokenId} = await loadFixture(deployRedoFixture)
            await aution.start()
            await aution.connect(userA).bid({value: 1000})
            await aution.connect(userB).bid({value: 2000})
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await aution.end()
            const owner = await nft.ownerOf(tokenId)
            expect(owner).to.be.equal(await userB.getAddress())
        })
    })
})




