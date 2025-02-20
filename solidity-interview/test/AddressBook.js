const {expect} = require("chai")
const { ethers } = require("hardhat");
const {loadFixture, time} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe('AddressBook', function () {
    async function deployAddressBookFixture() {
        const [account1, account2, account3, ...others] = await ethers.getSigners()
        const AddressBook = await ethers.getContractFactory('AddressBook')
        const addressBook = await AddressBook.deploy()
        return {addressBook, account1, account2, account3}
    }

    describe('add', function () {
        it('it should add a new pair of address and alias successfully', async function () {
            const {addressBook, account2} = await loadFixture(deployAddressBookFixture)
            await addressBook.add(account2.address, 'account2')

            const alias = await addressBook.getAlias(account2.address)
            expect(alias).to.be.equal('account2')
        })
        
    })
    
    describe('remove', function () {
        it('Remove second address when there are more than 2 addresses for an user', async function () {
            const {addressBook, account1, account2, account3}  = await loadFixture(deployAddressBookFixture)
            await addressBook.add(account1.address, 'account1')
            await addressBook.add(account2.address, 'account2')
            await addressBook.add(account3.address, 'account3')

            await addressBook.remove(account2.address)

            const alias1 = await addressBook.getAlias(account1.address)
            const alias2 = await addressBook.getAlias(account2.address)
            const alias3 = await addressBook.getAlias(account3.address)

            expect(alias1).to.be.equal('account1')
            expect(alias2).to.be.equal('')
            expect(alias3).to.be.equal('account3')
        })
    })
})