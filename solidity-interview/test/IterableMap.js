const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe('IterableMap', function() {
    async function deployIterableMapFixture() {
        const IterableMap = await ethers.getContractFactory("IterableMap")
        const iterableMap = await IterableMap.deploy()
        const address1 = '0x0000000000000000000000000000000000000001'
        const address2 = '0x0000000000000000000000000000000000000002'
        const address3 = '0x0000000000000000000000000000000000000003'
        return {iterableMap, address1, address2, address3}
    }

    describe("name", function() {
        it("It should return the correct name", async function () {
            const {iterableMap} = await loadFixture(deployIterableMapFixture)
            const name = await iterableMap.name()
            expect(name).to.equal(name)
        })
    })

    describe("get", function() {
        it("It should get the correct ans", async function () {
            const {iterableMap, address1} = await loadFixture(deployIterableMapFixture)
            await iterableMap.set(address1, 100)
            const value = await iterableMap.get(address1)
            expect(value).to.equal(100)
        })
    })

    describe('size', function () {
        it("It should return the correct size", async function () {
            const {iterableMap, address1, address2, address3} = await loadFixture(deployIterableMapFixture)
            await iterableMap.set(address1, 100)
            await iterableMap.set(address2, 200)
            await iterableMap.set(address3, 300)
            const size = await iterableMap.size()
            expect(size).to.equal(3)
        })
    })

    describe('getKeyAtIndex', function () {
        it("It should get the correct key by index", async function () {
            const {iterableMap, address1, address2} = await loadFixture(deployIterableMapFixture)
            await iterableMap.set(address1, 100)
            await iterableMap.set(address2, 200)
            const key = await iterableMap.getKeyAtIndex(1)
            expect(key).to.equal(address2)
        })
    })

    describe('set', function () {
        it('It should set a new item correctly', async function () {
            const {iterableMap, address1} = await loadFixture(deployIterableMapFixture)
            await iterableMap.set(address1, 100)
            const value = await iterableMap.get(address1)
            const size = await iterableMap.size()
            expect(value).to.equal(100)
            expect(size).to.equal(1)
        })
        it('It should update value correctly', async function () {
            const {iterableMap, address1} = await loadFixture(deployIterableMapFixture)
            await iterableMap.set(address1, 100)
            await iterableMap.set(address1, 1000)
            const value = await iterableMap.get(address1)
            expect(value).to.equal(1000)
        })
    })

    describe('remove', function () {
        it('It should remove the item in map', async function () {
            const {iterableMap, address1, address2} = await loadFixture(deployIterableMapFixture)
            await iterableMap.set(address1, 100)
            await iterableMap.set(address2, 200)
            await iterableMap.remove(address1)

            const addr  = await iterableMap.getKeyAtIndex(0)
            const size = await iterableMap.size()

            expect(addr).to.equal(address2)
            expect(size).to.equal(1)
        }) 
    })
})