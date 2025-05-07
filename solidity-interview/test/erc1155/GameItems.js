const {expect} = require("chai")
const { ethers, hardhatArguments } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('GameItems', function () {
    async function deployGameItemsFixture() {
        const [owner, nonOwner, Bob, ...others] = await ethers.getSigners()
        const GameItems = await ethers.getContractFactory('GameItems')
        const gameItems = await GameItems.deploy(owner)
        const INIT_SWORD = 1000, SWORD_TOKEN = 1
        const INIT_POTION= 2000, POTION_TOKEN = 2
        const INIT_SHIELD = 3000, SHIELD_TOKEN = 3
        return {gameItems, owner, nonOwner, Bob, INIT_SWORD, SWORD_TOKEN, INIT_POTION, POTION_TOKEN, INIT_SHIELD, SHIELD_TOKEN}
    }
    describe('init', function () {
        it('init', async function () {
            const {gameItems, owner, INIT_SWORD, SWORD_TOKEN, INIT_POTION, POTION_TOKEN, INIT_SHIELD, SHIELD_TOKEN} = await loadFixture(deployGameItemsFixture)
            const balance_sword = await gameItems.balanceOf(owner, SWORD_TOKEN)
            const balance_potion = await gameItems.balanceOf(owner, POTION_TOKEN)
            const balance_shield = await gameItems.balanceOf(owner, SHIELD_TOKEN)

            expect(balance_sword).to.be.equal(INIT_SWORD)
            expect(balance_potion).to.be.equal(INIT_POTION)
            expect(balance_shield).to.be.equal(INIT_SHIELD)
        })
    })

    describe('mintBatch', function () {
        it('it mintBatched successfully', async function () {
            const {gameItems, Bob, SWORD_TOKEN, SHIELD_TOKEN} = await loadFixture(deployGameItemsFixture)
            const ids = [SWORD_TOKEN, SHIELD_TOKEN]
            const values = [100, 200]
            await gameItems.mintBatch(Bob.getAddress(), ids, values, '0x123456')

            const balance_sword = await gameItems.balanceOf(Bob.getAddress(), SWORD_TOKEN)
            const balance_shield = await gameItems.balanceOf(Bob.getAddress(), SHIELD_TOKEN)
            expect(balance_sword).to.be.equal(values[0])
            expect(balance_shield).to.be.equal(values[1])
        })
    })
})