const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin , Bob, nonBob, Alice, Lucy, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const name = 'testERC721'
        const symbol = 'test'
        const erc721 = await MyERC721.deploy(name, symbol)
        const tokenId = 1
        await erc721.mint(Bob.getAddress(), tokenId)
        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), tokenId)
        await erc721.connect(Bob).approve(redo.getAddress(), tokenId)
        const seven_days = 60 * 60 * 24 * 7
        return {redo, erc721, tokenId, Bob, nonBob, Alice, Lucy, seven_days}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo, erc721, Bob, tokenId} = await loadFixture(deployRedoFixture)
            const owner = await erc721.ownerOf(tokenId)
            const spender = await erc721.getApproved(tokenId)
            expect(owner).to.be.equal(Bob.address)
            expect(spender).to.be.equal(await redo.getAddress())
        })
    })
    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {redo, nonBob}  = await loadFixture(deployRedoFixture)
            await expect(redo.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it failed to start when it is started', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.start()
            await expect(redo.start()).to.be.revertedWith('started')
        })
        it('it started successfully', async function () {
            const {redo, erc721, tokenId} = await loadFixture(deployRedoFixture)
            await redo.start()
            const owner = await erc721.ownerOf(tokenId)
            expect(owner).to.be.equal(await redo.getAddress())
        })
    })

    describe('bid', function () {
        it('it failed to bid when it not started', async function () {
            const {redo, Alice} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(Alice).bid({value: amount})).to.be.revertedWith('not started')
        })
        it('it failed to bid when it is ended', async function () {
            const {redo, Alice, seven_days} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await expect(redo.connect(Alice).bid({value: amount})).to.be.revertedWith('ended')

        })
        it('it failed to bid when value is not highest', async function () {
            const {redo, Alice, Lucy} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 500
            await redo.start()
            await redo.connect(Alice).bid({value: amount1})
            await expect(redo.connect(Lucy).bid({value: amount2})).to.be.revertedWith('msg.value <= highestBid')
        })
        it('it bidded successfully', async function () {
            const {redo, Alice, Lucy} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await redo.start()
            await redo.connect(Alice).bid({value: amount1})
            await expect(redo.connect(Lucy).bid({value: amount2})).not.to.be.reverted
        })
    })

    describe('withdraw', function () {
        it('withdraw successfully', async function () {
            const {redo, Alice, Lucy} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await redo.start()
            await redo.connect(Alice).bid({value: amount1})
            await redo.connect(Lucy).bid({value: amount2})
            await expect(redo.connect(Alice).withdraw()).to.emit(redo, 'Withdraw').withArgs(Alice.getAddress(), amount1)
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
            await expect(redo.end()).to.be.revertedWith('not ended')
        })
        it('it ended when there are at least 2 bidders', async function () {
            const {redo, Alice, Lucy, seven_days, erc721, tokenId} = await loadFixture(deployRedoFixture)
            await redo.start()
            await redo.connect(Alice).bid({value: 1000})
            await redo.connect(Lucy).bid({value: 2000})
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await redo.end()
            const owner = await erc721.ownerOf(tokenId)
            expect(owner).to.equal(await Lucy.getAddress())
        })
        it('it ended successfully when there is no bidder at all', async function () {
            const {redo, seven_days, erc721, tokenId, Bob} = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await redo.end()
            const owner = await erc721.ownerOf(tokenId)
            expect(owner).to.be.equal(await Bob.getAddress()) 
        })
    })
    
})




