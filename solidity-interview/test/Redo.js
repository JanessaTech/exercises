const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");
const { extendEnvironment } = require("hardhat/config");

describe('Redo', function () {
    async function deployRedoFixture() {
        const [admin, Bob, nonBob, userA, userB, ...others] = await ethers.getSigners()
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy(admin.getAddress())
        return {redo}
    }
    describe('init', function () {
        it('init', async function () {
           const {redo} = await loadFixture(deployRedoFixture)
        })
    })
    
})




