const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo  = await Redo.deploy()
        const uri = 'aaaa'
        return {redo, Bob, uri}
    }
    describe('mint', function () {
        it('mint', async function () {
            const {redo, Bob, uri} = await loadFixture(deployRedoFixture)
            await redo.safeMint(Bob.getAddress(), uri)
            const balance = await redo.balanceOf(Bob.getAddress())
            const url = await redo.tokenURI(0)
            expect(balance).to.be.equal(1)
            console.log(url)
        })
    })
    
})




