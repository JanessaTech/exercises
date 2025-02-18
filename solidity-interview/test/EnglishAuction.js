const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('EnglishAuction', function () {
    async function deployEnglishAuctionFixture() {
        const [nftDeployer, nftOwner, nonNftOwner, bidderA, bidderB, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', nftDeployer)
        const name = 'testERC721'
        const symbol = 'test'
        const nft = await MyERC721.deploy(name, symbol)
        const nftId = 1 
        await nft.mint(nftOwner, nftId)

        const SEVEN_DAY_IN_SECS = 60 * 60 * 24 * 7

        const EnglishAuction = await ethers.getContractFactory('EnglishAuction', nftOwner)
        const englishAuction = await EnglishAuction.deploy(nft, nftId)
        return {englishAuction, nftOwner, nonNftOwner, bidderA, bidderB, SEVEN_DAY_IN_SECS}
    }

    describe('init', function () {
        it('It should init successfully', async function () {
            const {englishAuction} = await loadFixture(deployEnglishAuctionFixture)
        })
    })

    describe('start', function () {
        it('it fails to start when it is not owner', async function () {
            const {englishAuction, nonNftOwner} = await loadFixture(deployEnglishAuctionFixture)
            await expect(englishAuction.connect(nonNftOwner).start()).to.be.revertedWith('not owner')
        })
        it('It fails to start when it is already started', async function () {
            const {englishAuction} = await loadFixture(deployEnglishAuctionFixture)
            await englishAuction.start()

            await expect(englishAuction.start()).to.be.revertedWith('started')
        })
        it('It started successfully', async function () {
            const {englishAuction} = await loadFixture(deployEnglishAuctionFixture)
            await expect(englishAuction.start()).to.emit(englishAuction, 'Start')
        })
    })

    describe('bid', function () {
        it('It fails to bid when it is not started yet', async function ()  {
            const { englishAuction, bidderA} = await loadFixture(deployEnglishAuctionFixture)
            await expect(englishAuction.connect(bidderA).bid()).to.be.revertedWith('not start')
        })
        it('It bided successfully', async function () {
            const {englishAuction, bidderA} = await loadFixture(deployEnglishAuctionFixture)
            await englishAuction.start()
            const amount = 1000
            await expect(englishAuction.connect(bidderA).bid({value: amount})).to.emit(englishAuction, 'Bid').withArgs(bidderA.address, amount)
        })
        it('It fails to bid when the value of eth is not greater than the highest bid', async function () {
            const {englishAuction, bidderA, bidderB} = await loadFixture(deployEnglishAuctionFixture)
            await englishAuction.start()
            const amount1 = 1000
            const amount2 = 500
            await englishAuction.connect(bidderA).bid({value: amount1})

            await expect(englishAuction.connect(bidderB).bid({value: amount2})).to.be.revertedWith('value <= highestBid')
        })
        it('It fails to bid when it is ended', async function () {

        })
        
    })

    describe('withDraw', function () {
        it('It withdrawed successfully', async function () {
            const {englishAuction, bidderA, bidderB} = await loadFixture(deployEnglishAuctionFixture)
            const amount1 = 1000
            const amount2 = 2000
            await englishAuction.start()
            await englishAuction.connect(bidderA).bid({value: amount1})
            await englishAuction.connect(bidderB).bid({value: amount2})

            await expect(englishAuction.connect(bidderA).withDraw()).to.emit(englishAuction, 'Withdraw').withArgs(bidderA.address, amount1)
        })
    })

    describe('end', function () {
        it('It fails to end when it is not started yet', async function () {
            const {englishAuction} = await loadFixture(deployEnglishAuctionFixture)
            await expect(englishAuction.end()).to.be.revertedWith('not started')
        })
        it('It fails to end when it is not ended', async function () {
            const {englishAuction} = await loadFixture(deployEnglishAuctionFixture)
            await englishAuction.start()

            await expect(englishAuction.end()).to.be.revertedWith('not ended')

        })
        it('It ended successfully', async function () {
            const {englishAuction, SEVEN_DAY_IN_SECS, nftOwner} = await loadFixture(deployEnglishAuctionFixture)
            await englishAuction.start()
            const latest = await time.latest()
            await time.increaseTo(latest + SEVEN_DAY_IN_SECS)

            await expect(englishAuction.end()).to.emit(englishAuction, 'End').withArgs(nftOwner.address)
        })
    })
})