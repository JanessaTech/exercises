const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('EtherGame', function () {
    async function deployEtherGameFixture() {
        const [acc1, acc2, acc3, ...others] = await ethers.getSigners()
        const EtherGame = await ethers.getContractFactory('EtherGame')
        const etherGame = await EtherGame.deploy()
        return {etherGame, acc1, acc2, acc3}
    }

    describe('deposit & withdraw', function () {
        it('gameOver', async function () {
            const {etherGame} = await loadFixture(deployEtherGameFixture)
            const amount = 1200
            await expect(etherGame.deposit({value: amount})).to.be.revertedWith('game is over')
        })
        it('Found winner', async function () {
            const {etherGame, acc1, acc2, acc3,} = await loadFixture(deployEtherGameFixture)
            await etherGame.connect(acc1).deposit({value: 200})
            await etherGame.connect(acc2).deposit({value: 500})
            await expect(etherGame.connect(acc3).deposit({value: 300})).to.emit(etherGame, 'FoundWinner')
        })
        it('withdraw successfully',async function () {
            const {etherGame, acc1, acc2, acc3} = await loadFixture(deployEtherGameFixture)
            await etherGame.connect(acc1).deposit({value: 200})
            await etherGame.connect(acc2).deposit({value: 500})
            await etherGame.connect(acc3).deposit({value: 300})

            await expect(etherGame.connect(acc3).withdraw()).to.emit(etherGame, 'Withdraw').withArgs(acc3.address, 1000)
        })
        it('It fails to withdraw when it is not winner to try doing so',async function () {
            const {etherGame, acc1, acc2, acc3} = await loadFixture(deployEtherGameFixture)
            await etherGame.connect(acc1).deposit({value: 200})
            await etherGame.connect(acc2).deposit({value: 500})
            await etherGame.connect(acc3).deposit({value: 300})

            await expect(etherGame.connect(acc1).withdraw()).to.be.revertedWith('Not winner')
        })
    })
})