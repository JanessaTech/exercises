const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('MyERC1155', function () {
    async function deployMyERC1155Fixture() {
        const [account1, account2, account3, ...others] = await ethers.getSigners()
        const MyERC1155  = await ethers.getContractFactory('MyERC1155')
        const erc1155 = await MyERC1155.deploy()
        return {erc1155, account1, account2, account3}
    }
    describe('mint', function () {
        it('It should mint successfuly', async function () {
            const {erc1155, account1, account2} = await loadFixture(deployMyERC1155Fixture)
            const tokenId = 1
            const value = 1
            const data = '0x'
            await erc1155.mint(account2.address, tokenId, value, data)
            const balance = await erc1155.balanceOf(account2.address, tokenId)

            expect(balance).to.be.equal(1)
        })
    })
    describe('batchMint', function () {
        it('batchMint', async function () {
            const {erc1155, account2} = await loadFixture(deployMyERC1155Fixture)
            const to = account2.address
            const ids =[1, 2, 3]
            const values = [11, 22, 33]
            const data = '0x1111'
            await erc1155.batchMint(to, ids, values, data)

            const balance1 = await erc1155.balanceOf(account2.address, 1)
            const balance2 = await erc1155.balanceOf(account2.address, 2)
            const balance3  = await erc1155.balanceOf(account2.address, 3)

            expect(balance1).to.be.equal(11)
            expect(balance2).to.be.equal(22)
            expect(balance3).to.be.equal(33)
        })
    })

    describe('safeTransferFrom', function () {
        it('It should call safeTransferFrom successfully', async function () {
            const {erc1155, account2, account3} = await loadFixture(deployMyERC1155Fixture)
            const tokenId = 1
            const value = 1
            const data = '0x'
            await erc1155.mint(account2.address, tokenId, value, data)
            const beforeBalance = await erc1155.balanceOf(account3.address, tokenId)
            await erc1155.connect(account2).safeTransferFrom(account2.address, account3.address, tokenId, value, data)
            const afterBalance = await erc1155.balanceOf(account3.address, tokenId)

            expect(beforeBalance).to.be.equal(0)
            expect(afterBalance).to.be.equal(1)
        })
    })
    describe('safeBatchTransferFrom', function () {
        it('It should call safeBatchTransferFrom successfully', async function () {
            const {erc1155, account1, account2, account3} = await loadFixture(deployMyERC1155Fixture)
            const ids =[1, 2, 3]
            const values = [11n, 22n, 33n]
            const data = '0x1111'
            await erc1155.batchMint(account2.address, ids, values, data)
            const beforeBalances = await erc1155.balanceOfBatch(Array(3).fill(account2.address), ids)
            await erc1155.connect(account2).safeBatchTransferFrom(account2.address, account3.address, ids, values, data)
            const afterBalances = await erc1155.balanceOfBatch(Array(3).fill(account3.address), ids)

            expect(beforeBalances).to.include.members(values)
            expect(afterBalances).to.include.members(values)
        })
    })

})