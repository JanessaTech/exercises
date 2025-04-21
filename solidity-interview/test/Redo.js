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
        const erc721 = await MyERC721.deploy(name, symbol)
        await erc721.mint(Bob.getAddress(), nftId)
        const Auction = await ethers.getContractFactory('Redo', Bob)
        const aution = await Auction.deploy(erc721.getAddress(), nftId)
        await erc721.connect(Bob).approve(aution.getAddress(), nftId)
        return {aution, erc721, nftId, Bob, nonBob, bidderA, bidderB}
    }

    describe('init', function () {
        it('init', async function (){
            const {aution, erc721, nftId, Bob} = await loadFixture(deployAutionFixture)
            const owner = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(owner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await aution.getAddress())
        })
    })

    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {aution, nonBob} = await loadFixture(deployAutionFixture)
            await expect(aution.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfull', async function () {
            const {aution, erc721, nftId} = await loadFixture(deployAutionFixture)
            await expect(aution.start()).to.emit(aution, 'Start')
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await aution.getAddress())
        })
        it('it failed to start when it is started already', async function () {
            const {aution} = await loadFixture(deployAutionFixture)
            await aution.start()
            await expect(aution.start()).to.be.revertedWith('started')
        })
    })
})




