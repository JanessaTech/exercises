const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('DutchAuction', function () {
    async function deployDutchAuctionFixture() {
        const [nftDeployer, nftOwner, userA, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', nftDeployer)
        const name = 'TestMyERC721'
        const symbol = 'MYNFT'
        const nftId = 1
        const nft = await MyERC721.deploy(name, symbol)
        await nft.mint(nftOwner, nftId)

        const startingPrice = 10_000_000
        const disCountRate = 10
        const SEVEN_DAY_IN_SECS = 60 * 60 * 24 * 7
        const ONE_DAY_IN_SECS = 60 * 60 * 24 * 1
        const DutchAuction = await ethers.getContractFactory('DutchAuction', nftOwner)
        const dutchAuction = await DutchAuction.deploy(nft, nftId, startingPrice, disCountRate, SEVEN_DAY_IN_SECS)

        await nft.connect(nftOwner).approve(dutchAuction.getAddress(), nftId)

        return {dutchAuction, 
                nft, nftId, 
                startingPrice, disCountRate, 
                SEVEN_DAY_IN_SECS, ONE_DAY_IN_SECS, 
                userA}
    }

    describe('init', function () {
        it('init', async function () {
            const {dutchAuction, nft, nftId} = await loadFixture(deployDutchAuctionFixture)
            await dutchAuction.start()
            const owner = await nft.ownerOf(nftId)
            expect(owner).to.be.equal(await dutchAuction.getAddress())
        })
    })

    describe('getPrice', function () {
        it('It should get the correct price', async function () {
            const {dutchAuction, ONE_DAY_IN_SECS, startingPrice, disCountRate} = await loadFixture(deployDutchAuctionFixture)
            await dutchAuction.start()
            const latest = await time.latest()
            await time.increaseTo(latest + ONE_DAY_IN_SECS)
            const price = await dutchAuction.getPrice()

            const expected = startingPrice - ONE_DAY_IN_SECS * disCountRate
            expect(expected).to.be.equal(price)
        })
    })

    describe('buy', async function () {
        it('It should fail to buy when the auction is expired', async function () {
            const {dutchAuction, userA, SEVEN_DAY_IN_SECS, ONE_DAY_IN_SECS} = await loadFixture(deployDutchAuctionFixture)
            await dutchAuction.start()
            const amount = 1000
            const latest = await time.latest()
            await time.increaseTo(latest + SEVEN_DAY_IN_SECS + ONE_DAY_IN_SECS)
            await expect(dutchAuction.connect(userA).buy({value: amount})).to.be.revertedWith('expired')

        })
        it('It should fail to buy when the ETH is not greater than the nft price', async function () {
            const {dutchAuction, userA, ONE_DAY_IN_SECS} = await loadFixture(deployDutchAuctionFixture)
            await dutchAuction.start()
            const amount = 1000
            const latest = await time.latest()
            await time.increaseTo(latest + ONE_DAY_IN_SECS)
            await expect(dutchAuction.connect(userA).buy({value: amount})).to.be.revertedWith('msg.value <= price')
        })
        it('It bought the nft successfully', async function () {
            const {dutchAuction, userA, ONE_DAY_IN_SECS, nft, nftId} = await loadFixture(deployDutchAuctionFixture)
            await dutchAuction.start()
            const amount = 9_200_000
            const latest = await time.latest()
            await time.increaseTo(latest + ONE_DAY_IN_SECS)
            await expect(dutchAuction.connect(userA).buy({value: amount})).not.to.be.reverted

            const owner = await nft.ownerOf(nftId)
            expect(owner).to.be.equal(userA.address)
        })
    })

})