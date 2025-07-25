const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, bob, userA, userB, nonbob, ...others] = await ethers.getSigners();
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const erc721 = await MyERC721.deploy('MyERC721', 'MyERC721')
        const tokenId = 1
        await erc721.mint(bob.getAddress(), tokenId)
        const Redo = await ethers.getContractFactory('Redo', bob)
        const redo = await Redo.deploy(erc721.getAddress(), tokenId)
        await erc721.connect(bob).approve(redo.getAddress(), tokenId)
        const seven_days = 60 * 60 * 24  * 7
        const one_day = 60 * 60 * 24  * 1
        return {redo, bob, userA, userB, nonbob, erc721, tokenId, seven_days, one_day}

    }
    describe('init', function () {
        it('init', async function () {
            const {redo, bob, erc721, tokenId} = await loadFixture(deployRedoFixture)
            const owner = await erc721.ownerOf(tokenId)
            const spender = await erc721.getApproved(tokenId)
            expect(owner).to.be.equal(await bob.getAddress())
            expect(spender).to.be.equal(await redo.getAddress())
        }) 
    })
    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {redo, nonbob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(nonbob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfully', async function () {
            const {redo, bob, erc721, tokenId} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(bob).start()).to.emit(redo, 'Start').withArgs(bob.getAddress())
            const owner = await erc721.ownerOf(tokenId)
            expect(owner).to.be.equal(await redo.getAddress())
        })
        it('it failed to start when it is started already', async function () {
            const {redo, bob} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            await expect(redo.connect(bob).start()).to.be.revertedWith('started')
        })
    })

    describe('bid', function () {
        it('it failed to bid when it is not started', async function () {
            const {redo, userA} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(userA).bid({value: 1000})).to.be.revertedWith('not started')

        })
        it('it failed to bid when it is ended', async function () {
            const {redo, userA, bob, seven_days} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await expect(redo.connect(userA).bid({value: 1000})).to.be.revertedWith('ended')
        })
        it('it failed to bid when it is not the highest value', async function () {
            const {redo, userA, userB, bob} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            await redo.connect(userA).bid({value: 1000})
            await expect(redo.connect(userB).bid({value: 500})).to.be.revertedWith('msg.value <= hightestBid')
        })
        it('it bidded successfully', async function () {
            const {redo, bob, userA, userB} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            await redo.connect(userA).bid({value: 1000})
            await expect(redo.connect(userB).bid({value: 2000})).to.emit(redo, 'Bid').withArgs(userB.getAddress(), 2000)
        })
    })

    describe('withdraw', function () {
        it('it failed to withdraw when no eth', async function () {
            const {redo, bob, userA} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            await expect(redo.connect(userA).withdraw()).to.be.revertedWith('no eth')

        })
        it('it withdrew successfully', async function () {
            const {redo, bob, userA, userB} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            await redo.connect(userA).bid({value: 1000})
            await redo.connect(userB).bid({value: 2000})
            await expect(redo.connect(userA).withdraw()).to.emit(redo, 'Withdraw').withArgs(userA.getAddress(), 1000)
        })
    })
    describe('end', function () {
        it('it failed to end when it is not owner', async function() {
            const {redo, nonbob} = await loadFixture(deployRedoFixture)
            
            await expect(redo.connect(nonbob).end()).to.be.revertedWith('not owner')

        })
        it('it failed to end when it is not started', async function() {
            const {redo, bob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(bob).end()).to.be.revertedWith('not started')
        })
        it('it failed to end when it is not ended', async function() {
            const {redo, bob, one_day} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            const latest = await  time.latest()
            await time.setNextBlockTimestamp(latest + one_day)
            await expect(redo.connect(bob).end()).to.be.revertedWith('not ended')

        })
        it('it ended successfully when there is at least 1 bidder', async function() {
            const {redo, bob, seven_days, userA, userB, erc721, tokenId} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            const latest = await time.latest()
            await redo.connect(userA).bid({value: 1000})
            await redo.connect(userB).bid({value: 2000})
            await time.setNextBlockTimestamp(latest + seven_days)
            await expect(redo.connect(bob).end()).to.emit(redo,'End').withArgs(bob.getAddress())
            const owner = await erc721.ownerOf(tokenId)
            expect(owner).to.be.equal(await userB.getAddress())
        })
        it('it ended successfully when there is no bidder at all', async function() {
            const {redo, bob, seven_days, userA, userB, erc721, tokenId} = await loadFixture(deployRedoFixture)
            await redo.connect(bob).start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            await redo.connect(bob).end()
            const owner = await erc721.ownerOf(tokenId)
            expect(owner).to.be.equal(await bob.getAddress())
        })
    })
    
})




