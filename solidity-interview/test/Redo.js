const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");


describe('Redo', function () {
    async function deployRedoFixture() {
        const [deployer, Bob, nonBob, biderA, biderB, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', deployer)
        const name = 'MyERC721'
        const symbol = 'MyERC721'
        const nftId = 0
        const SEVEN_DAYS = 60 * 60 * 24 * 7
        const ONE_DAYS = 60 * 60 * 24 * 1
        const erc721 = await MyERC721.deploy(name, symbol)
        await erc721.mint(Bob.getAddress(), nftId)
        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), nftId)
        await erc721.connect(Bob).approve(redo.getAddress(), nftId)
        return {redo, erc721, nftId, Bob, nonBob, biderA, biderB, SEVEN_DAYS, ONE_DAYS}
    }

    describe('init', function () {
        it('init', async function () {
            const {redo, nftId, erc721, Bob} = await loadFixture(deployRedoFixture)
            const who = await erc721.ownerOf(nftId)
            const splender = await erc721.getApproved(nftId)
            expect(who).to.be.equal(await Bob.getAddress())
            expect(splender).to.be.equal(await redo.getAddress())
        })
    })
    describe('start', function () {
        it('it started successfully', async function () {
            const {redo, erc721, nftId} = await loadFixture(deployRedoFixture)
            await redo.start()
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await redo.getAddress())
        })
        it('it failed to start when it is not owner', async function () {
            const {redo, nonBob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it failed to start when it is started already', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.start()
            await expect(redo.start()).to.be.revertedWith('started')
        })
    })

    describe('bid', function () {
        it('it failed to bid when it is not started', async function () {
            const {redo, biderA} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(redo.connect(biderA).bid({value: amount})).to.be.revertedWith('not started')
        })
        it('it failed to bid when it is ended', async function () {
            const {redo, biderA, SEVEN_DAYS} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + SEVEN_DAYS)
            await expect(redo.connect(biderA).bid({value: amount})).to.be.revertedWith('ended')

        })
        it('it failed to bid when the value is not the highest', async function () {
            const {redo, biderA, biderB} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 500
            await redo.start()
            await redo.connect(biderA).bid({value: amount1})
            await expect(redo.connect(biderB).bid({value: amount2})).to.be.revertedWith('not the highest value')
        })
        it('it bidded successfully', async function () {
            const {redo, biderA, biderB} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await redo.start()
            await redo.connect(biderA).bid({value: amount1})
            await expect(redo.connect(biderB).bid({value: amount2})).to.emit(redo, 'Bid').withArgs(biderB.getAddress())
        })
    })
    describe('withdraw', function () {
        it('withdraw', async function () {
            const {redo, biderA, biderB} = await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 2000
            await redo.start()
            await redo.connect(biderA).bid({value: amount1})
            await redo.connect(biderB).bid({value: amount2})
            await expect(redo.connect(biderA).withdraw()).to.emit(redo, 'Withdraw').withArgs(biderA.getAddress(), amount1)
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
        it('it failed to end when it is not ended',async function () {
            const {redo, ONE_DAYS} = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + ONE_DAYS)
            await expect(redo.end()).to.be.revertedWith('not ended')

        })
        it('it bidded successfully when there is not bidder at all', async function () {
            const {redo, SEVEN_DAYS, nftId, erc721, Bob} = await loadFixture(deployRedoFixture)
            await redo.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + SEVEN_DAYS)
            await redo.end()
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())
        })
        it('it bidded successfully when there are at least 2 bidders', async function () {
            const {redo, biderA, biderB, erc721, nftId, SEVEN_DAYS} = await loadFixture(deployRedoFixture)
            await redo.start()
            const amount1 = 1000
            const amount2 = 2000
            await redo.connect(biderA).bid({value: amount1})
            await redo.connect(biderB).bid({value: amount2})
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + SEVEN_DAYS)
            await redo.end()

            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await biderB.getAddress())
        })

    })
})




