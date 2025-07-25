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
        return {redo, bob, userA, userB, nonbob, erc721, tokenId}

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

        })
        it('it failed to bid when it is ended', async function () {

        })
        it('it failed to bid when it is not the highest value', async function () {

        })
        it('it bidded successfully', async function () {

        })
    })

    describe('withdraw', function () {

    })
    describe('end', function () {

    })
    
})




