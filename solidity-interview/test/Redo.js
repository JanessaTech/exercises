const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Redo', function () {
    async function deployAutionFixture() {
        const [deployer, Bob, nonBob, bidderA, bidderB, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', deployer)
        const name = 'MyERC721'
        const symbol = 'MyERC721'
        const nftId = 0
        const seven_days = 60 * 60 * 24 * 7
        const erc721 = await MyERC721.deploy(name, symbol)
        await erc721.mint(Bob.getAddress(), nftId)
        const Auction = await ethers.getContractFactory('Redo', Bob)
        const auction = await Auction.deploy(erc721.getAddress(), nftId)
        await erc721.connect(Bob).approve(auction.getAddress(), nftId)
        return {auction, erc721, nftId, Bob, nonBob, bidderA, bidderB, seven_days}
    }

    describe('init', function () {
        it('init', async function (){
            const {auction, erc721, nftId, Bob} = await loadFixture(deployAutionFixture)
            const owner = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await auction.getAddress())
        })
    })

    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {auction, nonBob} = await loadFixture(deployAutionFixture)
            await expect(auction.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfull', async function () {
            const {auction, erc721, nftId} = await loadFixture(deployAutionFixture)
            await expect(auction.start()).to.emit(auction, 'Start')
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await auction.getAddress())
        })
        it('it failed to start when it is started already', async function () {
            const {auction} = await loadFixture(deployAutionFixture)
            await auction.start()
            await expect(auction.start()).to.be.revertedWith('started')
        })
    })

    describe('bid', function () {
        it('it failed to bid when it is not started', async function () {
            const {auction, bidderA} = await loadFixture(deployAutionFixture)
            const amount = 1000
            await expect(auction.connect(bidderA).bid({value: amount})).to.be.revertedWith('not started')
        })
        it('it failed to bid when it is ended', async function () {
            const {auction, seven_days, bidderA}  = await loadFixture(deployAutionFixture)
            await auction.start()
            const latest = await time.latest()
            await time.setNextBlockTimestamp(latest + seven_days)
            const amount = 1000
            await expect(auction.connect(bidderA).bid({value: amount})).to.be.revertedWith('ended')

        })
        it('it failed to bid when it is not highest', async function () {
            const {auction, bidderA, bidderB} = await loadFixture(deployAutionFixture)
            await auction.start()
            const amount1 = 1000
            const amount2 = 500
            await auction.connect(bidderA).bid({value: amount1})
            await expect(auction.connect(bidderB).bid({value: amount2})).to.be.revertedWith('msg.value < highestBid')
        })
        it('it bidded successfully', async function () {
            const {auction, bidderA, bidderB} = await loadFixture(deployAutionFixture)
            await auction.start()
            const amount1 = 1000
            const amount2 = 2000
            await auction.connect(bidderA).bid({value: amount1})
            await expect(auction.connect(bidderB).bid({value: amount2})).to.emit(auction, 'Bid')
        })
    })

    describe('withdraw', function () {
        it('it withdrawn successfully', async function () {
            const {auction, bidderA, bidderB} = await loadFixture(deployAutionFixture)
            await auction.start()
            const amount1 = 1000
            const amount2 = 2000
            await auction.connect(bidderA).bid({value: amount1})
            await auction.connect(bidderB).bid({value: amount2})

            await expect(auction.connect(bidderA).withdraw()).to.emit(auction, 'Withdraw').withArgs(bidderA.getAddress(), amount1)

        })
    })
})




