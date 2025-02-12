const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Redo", function () {
    async function RedoFixture() {
        const Redo = await ethers.getContractFactory('Redo')
        const redo = await Redo.deploy()
        const address1 = '0x0000000000000000000000000000000000000001'
        const address2 = '0x0000000000000000000000000000000000000002'
        const address3 = '0x0000000000000000000000000000000000000003'
        return {redo, address1, address2, address3}
    }

    describe('remove', function () {
        it('It should remove ok', async function() {
            const {redo, address1, address2, address3} = await loadFixture(RedoFixture)
            await redo.set(address1, 100)
            await redo.set(address2, 200)
            await redo.set(address3, 300)
            await redo.remove(address1)
            const addr = await redo.getKeyByIndex(1)
            expect(addr).to.equal(address2)
        })
    })


})