const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('ERC721Meta', function () {
    async function deployERC721MetaFixtrue() {
        const [admin, Bob, ...others] = await ethers.getSigners()
        const ERC721Meta = await ethers.getContractFactory('ERC721Meta')
        const erc721Meta = await ERC721Meta.deploy()
        const tokenURI = 'QmNva58tgCtpLvDX8bwvREZNY7tzfGtGeRiqnMuMHuQKVY'
        return {erc721Meta, tokenURI, Bob}
    }

    describe('safeMint', function () {
        it('it minted successfull', async function () {
            const {erc721Meta, tokenURI, Bob} = await loadFixture(deployERC721MetaFixtrue)
            await erc721Meta.safeMint(Bob.getAddress(), tokenURI)
            const balance = await erc721Meta.balanceOf(Bob.getAddress())
            const url = await erc721Meta.tokenURI(0)
            expect(balance).to.be.equal(1)
            console.log(url)  //http://test.com/QmNva58tgCtpLvDX8bwvREZNY7tzfGtGeRiqnMuMHuQKVY
        })
    })
})