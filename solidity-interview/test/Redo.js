const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('Redo', function () {
    async function deployRedoFixture() {
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        return {redo}
    }
    describe('init', function () {
        it('init', async function () {
            const {redo} = await loadFixture(deployRedoFixture)
        })
    })
})




