const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");


describe('Redo', function () {
    async function deployRedoFixture() {
        const [owner, nftdeployer, nonOwner, biderA, biderB, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', nftdeployer)
        const name = 'MyERC721'
        const symbol = 'MyERC721'
        const nftId = 0
        const erc721 = await MyERC721.deploy(name, symbol)
        await erc721.mint(owner,nftId)

        const Auction = await ethers.getContractFactory('Redo', owner)
        const auction = await Auction.deploy(erc721.getAddress(), nftId)

        const SEVEN_DAYS = 60 * 60 * 24 * 7

        await erc721.connect(owner).approve(auction.getAddress(), nftId)
        return {auction, erc721, nftId, owner, nonOwner, biderA, biderB, SEVEN_DAYS}
    }

    describe('init', function () {
        it('init', async function () {
            const {auction, erc721, nftId, owner} = await loadFixture(deployRedoFixture)
            const who = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(who).to.be.equal(await owner.getAddress())
            expect(spender).to.be.equal(await auction.getAddress())
        })
    })

    describe('start', function () {
        it('it failed to start when it not owner', async function () {
            const {auction, nonOwner}  = await loadFixture(deployRedoFixture)
            await expect(auction.connect(nonOwner).start()).to.be.revertedWith('not owner')

        })
        it('it started successfully', async function () {
            const {auction, erc721, nftId} = await loadFixture(deployRedoFixture)
            await expect(auction.start()).to.emit(auction, 'Start')
            const newOwner = await erc721.ownerOf(nftId)
            expect(newOwner).to.be.equal(await auction.getAddress())
        })
        it('it failed to start when it is already started', async function () {
            const {auction}  =await loadFixture(deployRedoFixture)
            await auction.start()
            await expect(auction.start()).to.be.revertedWith('started')
        })
    })

    describe('bid', async function () {
        it('it failed to bid when it is not started', async function () {
            const {auction, biderA} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await expect(auction.connect(biderA).bid({value: amount})).to.be.revertedWith('not started')

        })
        it('it failed to bid when it is already ended', async function () {
            const {auction, biderA, SEVEN_DAYS} = await loadFixture(deployRedoFixture)
            await auction.start()
            const amount = 1000
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + SEVEN_DAYS)
            await expect(auction.connect(biderA).bid({value: amount})).to.be.revertedWith('already ended')
        })
        it('it failed to bid when the value to be sent is not the highest', async function () {
            const {auction, biderA, biderB} =await loadFixture(deployRedoFixture)
            const amount1 = 1000
            const amount2 = 500
            await auction.start()

            await auction.connect(biderA).bid({value: amount1})
            await expect(auction.connect(biderB).bid({value: amount2})).to.be.revertedWith('msg.value <= highestBid')
        })
        it('it bided successfully', async function () {
            const {auction, biderA} = await loadFixture(deployRedoFixture)
            const amount = 1000
            await auction.start()
            await expect(auction.connect(biderA).bid({value: amount})).to.emit(auction, 'Bid').withArgs(biderA.getAddress(), amount)
        })
    })

    describe('withdraw', async function () {
        it('it withdrew successfully', async function (){
            const {auction, biderA, biderB} = await loadFixture(deployRedoFixture)
            await auction.start()
            const amount1 = 1000
            const amount2 = 2000
            await auction.connect(biderA).bid({value: amount1})
            await auction.connect(biderB).bid({value: amount2})

            await expect(auction.connect(biderA).withdraw()).to.emit(auction, 'Withdraw').withArgs(biderA.getAddress(), amount1)
        })
    })

    describe('end', async function () {
        it('it failed to end when it is not started', async function () {
            const {auction} = await loadFixture(deployRedoFixture)
            await expect(auction.end()).to.be.revertedWith('not started')
        })
        it('it failed to end when it is not owner', async function () {
            const {auction, nonOwner}  = await loadFixture(deployRedoFixture)
            await expect(auction.connect(nonOwner).end()).to.be.revertedWith('not owner')
        })
        it('it failed to end when it the end time has not reached', async function () {
            const {auction} = await loadFixture(deployRedoFixture)
            await auction.start()
            await expect(auction.end()).to.be.revertedWith('not ended')
        })
        it('it ended successfull in case when there is no bidder', async function () {
            const {auction, SEVEN_DAYS, owner, nftId, erc721} = await loadFixture(deployRedoFixture)
            await auction.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + SEVEN_DAYS)
            await auction.end()

            const newOwner = await erc721.ownerOf(nftId)
            expect(newOwner).to.be.equal(await owner.getAddress())
        })
        it('it ended successfully in case wthen there are at least one bidder', async function () {
            const {auction, biderA, biderB, nftId, erc721, SEVEN_DAYS} = await loadFixture(deployRedoFixture)
            await auction.start()
            const latest = await time.latest()
            const amount1 = 1000
            const amount2 = 2000
            await auction.connect(biderA).bid({value: amount1})
            await auction.connect(biderB).bid({value: amount2})
            await time.setNextBlockTimestamp(latest + SEVEN_DAYS)
            await auction.end()
            const newOwner = await erc721.ownerOf(nftId)
            expect(newOwner).to.be.equal(await biderB.getAddress())
        })
    })
})




