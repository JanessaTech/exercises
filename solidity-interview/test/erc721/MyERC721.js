const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('MyERC721', function () {
    async function deployMyERC721Fixture() {
        const [account1, account2, account3, account4, ...others] = await ethers.getSigners()
        const MyERC721 = await ethers.getContractFactory('MyERC721', account1)
        const name = 'testERC721'
        const symbol = 'test'
        const erc721 = await MyERC721.deploy(name, symbol)
        return {erc721, name, symbol, account1, account2, account3, account4}
    }

    describe('Get basic info', function () {
        it('Get basic info', async function () {
            const {erc721, name, symbol} = await loadFixture(deployMyERC721Fixture)
            const _name = await erc721.name()
            const _symbol = await erc721.symbol()

            expect(name).to.be.equal(_name)
            expect(symbol).to.be.equal(_symbol)
        })
    })

    describe('mint', function () {
        it('It should mint successfully', async function () {
            const {erc721, account2} = await loadFixture(deployMyERC721Fixture)
            await erc721.mint(account2.address, 1)

            const owner = await erc721.ownerOf(1)
            const balance = await erc721.balanceOf(account2.address)

            expect(owner).to.be.equal(account2.address)
            expect(balance).to.be.equal(1)
        })
    })

    describe('transferFrom', function () {
        it('It should transferFrom succesfully when it is owner', async function () {
            const {erc721, account2, account3}  = await loadFixture(deployMyERC721Fixture)
            const tokenId = 1
            await erc721.mint(account2.address, tokenId)
            const beforeOwner = await erc721.ownerOf(tokenId)
            await erc721.connect(account2).transferFrom(account2.address, account3.address, tokenId)
            const afterOwner= await erc721.ownerOf(tokenId)

            expect(beforeOwner).to.be.equal(account2.address)
            expect(afterOwner).to.be.equal(account3.address)
        })
        it('It should transferFrom succesfully when it is spender', async function () {
            const {erc721, account2, account3, account4} = await loadFixture(deployMyERC721Fixture)
            const tokenId = 1
            await erc721.mint(account2.address, tokenId)
            await erc721.connect(account2).approve(account4.address, tokenId)
            const ownerBefore = await erc721.ownerOf(tokenId)
            await erc721.connect(account4).transferFrom(account2.address, account3.address, tokenId)
            const ownerAfter = await erc721.ownerOf(tokenId)

            expect(ownerBefore).to.be.equal(account2.address)
            expect(ownerAfter).to.be.equal(account3.address)
        })
    })
})