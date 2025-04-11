const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { extendConfig, extendEnvironment } = require("hardhat/config");



describe('Redo', function () {
    async function deployRedoFixture() {
        const [deployer, Bob, nonBob, bidder1, bidder2, ...other] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', deployer)
        const name = 'MyERC721'
        const symbol = 'MyERC721'
        const nftId = 0
        const erc721 = await MyERC721.deploy(name, symbol)
        await erc721.mint(Bob.getAddress(), nftId)

        const Auction = await ethers.getContractFactory('Redo', Bob)
        const auction = await Auction.deploy(erc721.getAddress(), nftId)

        await erc721.connect(Bob).approve(auction.getAddress(), nftId)
        return {auction, erc721, nftId, Bob, nonBob, bidder1, bidder2}
    }

    describe('init', function () {
        it('init', async function () {
            const {auction, erc721, nftId, Bob} = await loadFixture(deployRedoFixture)
            const owner = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await auction.getAddress())
        })
    })
    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {auction, nonBob} = await loadFixture(deployRedoFixture)
            await expect(auction.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfully', async function () {
            const {auction, erc721, nftId} = await loadFixture(deployRedoFixture)
            await expect(auction.start()).to.emit(auction, 'Start')
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await auction.getAddress())
        })
        it('it failed to start when it is already started', async function () {
            const {auction} = await loadFixture(deployRedoFixture)
            await auction.start()
            await expect(auction.start()).to.be.revertedWith('started')
        })
    })
})




