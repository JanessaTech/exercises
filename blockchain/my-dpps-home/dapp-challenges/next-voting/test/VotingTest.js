const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Voting', function () {
    async function deplyVotingFixture() {
        const Voting = await ethers.getContractFactory('Voting')
        const names = ['Alic', 'Bob', 'Jane']
        const voting = await Voting.deploy(names)
        return {voting}
    }
    describe('init', function () {
        it('init', async function () {
            const {voting} = await loadFixture(deplyVotingFixture)
        })
    })
})