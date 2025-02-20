const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('HotelRoom', function () {
    async function deployHotelRoomFixture() {
        const [hotelOwner, userA, ...others] = await ethers.getSigners()
        const price = 1000
        const HotelRoom = await ethers.getContractFactory('HotelRoom')
        const hotelRoom = await HotelRoom.deploy(price)
        return {hotelRoom, hotelOwner, price, userA}
    }
    
    describe('Book room', function () {
        // this is a case on how to test fallback/receive function
        it('It should book room successfully', async function () {
            const {hotelRoom, hotelOwner, price, userA} = await loadFixture(deployHotelRoomFixture)
            const amount = 1500
            const tx = {
                to: hotelRoom.getAddress(),
                value: amount
            }
            await expect(userA.sendTransaction(tx)).to.emit(hotelRoom, 'Occupy').withArgs(userA.address, price)
        })
        it('It should fail to book the room when the room is already booked', async function () {
            const {hotelRoom, userA} = await loadFixture(deployHotelRoomFixture)
            const amount = 1500
            const tx = {
                to: hotelRoom.getAddress(),
                value: amount
            }
            await userA.sendTransaction(tx)

            await expect(userA.sendTransaction(tx)).to.be.revertedWith('Not vacant')

        })
        it('It should fail to book the roon when the eth is not enough', async function () {
            const {hotelRoom, userA} = await loadFixture(deployHotelRoomFixture)
            const amount = 900
            const tx = {
                to: hotelRoom.getAddress(),
                value: amount
            }
            await expect(userA.sendTransaction(tx)).to.be.revertedWith('Not enough eth')
        })
    })

    describe('Release the room', function () {
        it('It should fail to release the room when it is not onwer', async function () {
            const {hotelRoom, userA, hotelOwner} = await loadFixture(deployHotelRoomFixture)
            await expect(hotelRoom.connect(userA).release()).to.be.revertedWith('only owner')
        })
        it('It should fail to release the room when the room is vacant', async function () {
            const {hotelRoom, userA} = await loadFixture(deployHotelRoomFixture)
            await expect(hotelRoom.release()).to.be.revertedWith('Not Occupied')
        })
        it('It should release the room successfully when the room is booked', async function () {
            const {hotelRoom, userA} = await loadFixture(deployHotelRoomFixture)
            const amount = 1500
            const tx = {
                to: hotelRoom.getAddress(),
                value: amount
            }
            await userA.sendTransaction(tx)

            await expect(hotelRoom.release()).to.emit(hotelRoom, 'Release')

        })
    })
})