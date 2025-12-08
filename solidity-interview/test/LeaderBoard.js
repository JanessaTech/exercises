const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time, takeSnapshot} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean, any } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment, extendProvider } = require("hardhat/config");

describe('LeaderBoard', function () {
    async function deployFixture() {
        const [user1, user2, user3, user4, user5, ...others] = await ethers.getSigners()
        const LeaderBoard = await ethers.getContractFactory('LeaderBoard')
        const leaderBoard = await LeaderBoard.deploy()
        return {leaderBoard, user1, user2, user3, user4, user5}
    }
    describe('updateScore', function () {
        it('updateScore', async function () {
            const {leaderBoard, user1, user2, user3, user4, user5} = await loadFixture(deployFixture)
            await leaderBoard.connect(user1).updateScore(1)
            await leaderBoard.connect(user2).updateScore(5)
            await leaderBoard.connect(user3).updateScore(4)
            await leaderBoard.connect(user4).updateScore(7)
            await leaderBoard.connect(user5).updateScore(6)
            const top3 = await leaderBoard.getTop3()
            expect(top3[0][0]).to.be.equal(await user4.getAddress())
            expect(top3[1][0]).to.be.equal(await user5.getAddress())
            expect(top3[2][0]).to.be.equal(await user2.getAddress())
        })
    })
})