const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, nonBob, user1, user2, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const erc721 = await MyERC721.deploy('MyERC721', 'MyERC721')
        const nftId = 1
        await erc721.mint(Bob.getAddress(), nftId)
        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), nftId)
        await erc721.connect(Bob).approve(await redo.getAddress(), nftId)
        const seven_days = 60 * 60 * 24 * 7
        return {redo, erc721, nftId, Bob, nonBob,  user1, user2, seven_days}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo, erc721, nftId, Bob} = await loadFixture(deployRedoFixture)
            const nftOwner = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(nftOwner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await redo.getAddress())
        })
    })
    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {redo, nonBob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfully', async function () {
            const {redo, erc721, nftId, Bob} = await loadFixture(deployRedoFixture)
            await expect(redo.start()).to.emit(redo, 'Start')
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await redo.getAddress())
        })
        it('it failed to start when it is already started', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.start()
            await expect(redo.start()).to.be.revertedWith('started')
        })
    })
    describe('bid', function () {
        it('it failed to bid when it is not started', async function () {
            const {redo, user1} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            await expect(redo.connect(user1).bid({value: amount1})).to.be.revertedWith('not started')
        })
        it('it failed to bid when it is ended', async function () {
            const {redo, seven_days, user1} = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            const amount1 = 1000
            await expect(redo.connect(user1).bid({value: amount1})).to.be.revertedWith('ended')
        })
        it('it bidded successfully', async function () {
            const {redo, user1,user2} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await redo.start()
            await expect(redo.connect(user1).bid({value: amount1})).to.emit(redo, 'Bid').withArgs(user1.getAddress(), amount1)
            await expect(redo.connect(user2).bid({value: amount2})).to.emit(redo, 'Bid').withArgs(user2.getAddress(), amount2)
        })
        it('it failed to bid when msg.value <= highestBid', async function () {
            const {redo, user1, user2} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 500
            await redo.start()
            await expect(redo.connect(user1).bid({value: amount1})).to.emit(redo, 'Bid').withArgs(user1.getAddress(), amount1)
            await expect(redo.connect(user2).bid({value: amount2})).to.be.revertedWith('msg.value <= highestBid')
        })
    })

    describe('withdraw', function () {
        it('withdraw', async function () {
            const {redo, user1, user2} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await redo.start()
            await redo.connect(user1).bid({value: amount1})
            await redo.connect(user2).bid({value: amount2})

            await expect(redo.connect(user1).withdraw()).to.emit(redo, 'Withraw').withArgs(user1.getAddress(), amount1)

        })
    })
})




