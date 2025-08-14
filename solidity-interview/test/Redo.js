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
        const tokenId  = 1
        await erc721.mint(Bob.getAddress(), tokenId)

        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), tokenId)
        await erc721.connect(Bob).approve(redo.getAddress(), tokenId)
        const seven_days = 60 * 60 * 24 * 7

        return {redo, erc721, tokenId, Bob, nonBob, user1, user2, seven_days}
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
        it('it failed to start when it is not owner', async function () {
            const {redo, nonBob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfully', async function () {
            const {redo, Bob, erc721, tokenId} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(Bob).start()).to.emit(redo, 'Start').withArgs(await Bob.getAddress())
            const owner = await erc721.ownerOf(tokenId)
            expect(owner).to.be.equal(await redo.getAddress())
        })
        it('it failed to start when it is already started', async function () {
            const {redo, Bob} = await loadFixture(deployRedoFixture)
            await redo.connect(Bob).start()
            await expect(redo.connect(Bob).start()).to.be.revertedWith('started')
        })
    })
    describe('bid', function () {
        it('it failed to bid when it not started', async function () {
            const {redo, user1} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(user1).bid({value: 1000})).to.be.revertedWith('not started')
        })
        it('it failed to bid when it is ended', async function () {
            const {redo, user1, seven_days} = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest  = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await expect(redo.connect(user1).bid({value: 1000})).to.be.revertedWith('ended')

        })
        it('it failed to bid when msg.value <= highestBid', async function () {
            const {redo, user1, user2} = await loadFixture(deployRedoFixture)
            await redo.start()
            await redo.connect(user1).bid({value: 1000})
            await expect(redo.connect(user2).bid({value: 500})).to.be.revertedWith('msg.value <= highestBid')
        })
        it('it bidded successfully', async function () {
            const {redo, user1, user2} = await loadFixture(deployRedoFixture)
            await redo.start()
            await redo.connect(user1).bid({value: 1000})
            await expect(redo.connect(user2).bid({value: 2000})).to.emit(redo, 'Bid').withArgs(user2.getAddress(), 2000)
        })
    })

    describe('withdraw', function () {
        it('it withdraw successfully', async function () {
            const {redo, user1, user2} = await loadFixture(deployRedoFixture)
            await redo.start()
            await redo.connect(user1).bid({value: 1000})
            await redo.connect(user2).bid({value: 2000})
            await expect(redo.connect(user1).withdraw()).to.emit(redo, 'Withdraw').withArgs(user1.getAddress(), 1000)
        })
    })
    describe('end', function () {
        it('it failed to end when it is not owner', async function () {
            const {redo, nonBob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(nonBob).end()).to.be.revertedWith('not owner')
        })
        it('it failed to end when it is not started', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await expect(redo.end()).to.be.revertedWith('not started')
        })
        it('it failed to end when it is not ended', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.start()
            await expect(redo.end()).to.be.revertedWith('not end')
        })
        it('it ended successfull when no bidder at all', async function () {
            const {redo, seven_days, Bob, erc721, tokenId} = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await expect(redo.end()).to.emit(redo, 'End').withArgs(Bob.getAddress())
            const owner  = await erc721.ownerOf(tokenId)
            expect(owner).to.be.equal(await Bob.getAddress())
        })
        it('it ended successfully when there was at least 1 bidder', async function () {
            const {redo, seven_days, Bob, user1, user2, erc721, tokenId} = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest = await time.latest()
            await redo.connect(user1).bid({value: 100})
            await redo.connect(user2).bid({value: 200})
            await time.setNextBlockTimestamp(latest + seven_days)
            await expect(redo.end()).to.emit(redo, 'End').withArgs(Bob.getAddress())
            const owner = await erc721.ownerOf(tokenId)
            expect(owner).to.be.equal(await user2.getAddress())

        })
    })
})




