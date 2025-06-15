const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, nonBob, userA, userB, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const name = 'MyERC721'
        const symbol = 'MyERC721'
        const erc721 = await MyERC721.deploy(name, symbol)
        const nftId = 1
        erc721.mint(Bob.getAddress(), nftId)

        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), nftId);
        await erc721.connect(Bob).approve(redo.getAddress(), nftId)
        const seven_days = 60 * 60 * 24 * 7
        return {redo, Bob, nonBob, erc721, nftId, userA, userB, seven_days}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo, erc721, Bob, nftId} = await loadFixture(deployRedoFixture)
            const owner = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await redo.getAddress())
        })
    })
    describe('start', function() {
        it('it failed to start when it is not owner', async function () {
            const {redo, Bob, nonBob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfully', async function () {
            const {redo, Bob, erc721, nftId} = await loadFixture(deployRedoFixture)
            await redo.start()
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await redo.getAddress())
        })
        it('it failed to start whhen it is already started', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.start()
            await expect(redo.start()).to.be.revertedWith('started')
        })
    })
    describe('bid', function () {
        it('it failed to start when it is not started', async function () {
            const {redo, userA} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            await expect(redo.connect(userA).bid({value: amount1})).to.be.revertedWith('not started')

        })
        it('it failed to start when it is ended', async function () {
            const {redo, userA, seven_days} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await expect(redo.connect(userA).bid({value: amount1})).to.be.revertedWith('ended')

        })
        it('it failed to bid when msg.value <= highestBid', async function () {
            const {redo, userA, userB}  = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 700
            await redo.start()
            await redo.connect(userA).bid({value: amount1})
            await expect(redo.connect(userB).bid({value: amount2})).to.be.revertedWith('msg.value <= highestBid')
        })
        it('it bidded successfully', async function () {
            const {redo, userA, userB}  = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await redo.start()
            await redo.connect(userA).bid({value: amount1})
            await redo.connect(userB).bid({value: amount2})
        })
    })
    describe('withdraw', function () {
        it('it withdrawn successffully', async function () {
            const {redo, userA, userB} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await redo.start()
            await redo.connect(userA).bid({value: amount1})
            await redo.connect(userB).bid({value: amount2})
            await expect(redo.connect(userA).withdraw()).to.emit(redo, 'Withdraw').withArgs(userA.getAddress(), amount1)
        })
    })
    describe('end', async function ( ){
        it('it failed to end when it is not started', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await expect(redo.end()).to.be.revertedWith('not started')
        })
        it('it failed to end when it is not owner', async function () {
            const {redo, nonBob} = await loadFixture(deployRedoFixture)
            await redo.start()
            await expect(redo.connect(nonBob).end()).to.be.revertedWith('not owner')
        })
        it('it failed to end when it is not ended', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.start()
            await expect(redo.end()).to.be.revertedWith('not ended')
        }
        )
        it('it ended successfully when there is no bidder at all', async function () {
            const {redo, seven_days, erc721, nftId, Bob}  = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await redo.end()
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())
        })
        it('it ended successfully when there is at least 1 bidder', async function () {
            const {redo, seven_days, userA, userB, erc721, nftId} = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest = await time.latest()
            const amount1 = 1000
            const amount2 = 2000
            await redo.connect(userA).bid({value: amount1})
            await redo.connect(userB).bid({value: amount2})
            await time.setNextBlockTimestamp(latest + seven_days)
            await redo.end()
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await userB.getAddress())

        })
    })
})




