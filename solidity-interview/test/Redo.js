const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, nonBob, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721')
        const erc721 = await MyERC721.deploy('MyERC721', 'MyERC721')
        const nftId = 1
        await erc721.mint(Bob.getAddress(), nftId)
        const Redo = await ethers.getContractFactory('Redo', Bob)
        const redo = await Redo.deploy(erc721.getAddress(), nftId)
        await erc721.connect(Bob).approve(await redo.getAddress(), nftId)
        return {redo, erc721, nftId, Bob, nonBob}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo, erc721, nftId, Bob} = await loadFixture(deployRedoFixture)
            const nftOwner = await erc721.ownerOf(nftId)
            const spender = await erc721.getApproved(nftId)
            expect(nftOwner).to.be.equal(await Bob.getAddress())
            expect(spender).to.be.equal(await redo.getAddress())
        })
    })
    describe('start', function () {
        it('it failed to start when it is not owner', async function () {
            const {redo, nonBob} = await loadFixture(deployRedoFixture)
            await expect(redo.connect(nonBob).start()).to.be.revertedWith('not owner')
        })
        it('it started successfully', async function () {
            const {redo, erc721, nftId, Bob} = await loadFixture(deployRedoFixture)
            await expect(redo.start()).to.emit(redo, 'Start')
            const owner = await erc721.ownerOf(nftId)
            expect(owner).to.be.equal(await redo.getAddress())
        })
        it('it failed to start when it is already started', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
            await redo.start()
            await expect(redo.start()).to.be.revertedWith('started')
        })
    })
})




